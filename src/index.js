import express from 'express';
import mongoose from 'mongoose';
import messageModel from "./models/messages.js";
import indexRouter from "./routes/indexRouter.js";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { engine } from 'express-handlebars';
import { __dirname } from './path.js';
import { Server } from 'socket.io';


//Configuraciones o declaraciones 
const app = express()
//defino el puerto
const PORT = 8080

//server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

const io = new Server(server)

//Conexión con base de datos
mongoose.connect("mongodb+srv://nataliacordoba:coderhouse@cluster0.yd9v8ec.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("DB is connected"))
.catch(error => console.log(error))

//Middlewares
//Permito a express ejecutar JSON
app.use(express.json())
app.use(session({
    secret: "coderSecret",
    resave: true,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://nataliacordoba:coderhouse@cluster0.yd9v8ec.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        ttl: 60 * 60
    }),
    saveUninitialized: true
}))
app.use(cookieParser("clave secreta"))
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/', indexRouter)

// Routes Cookies
app.get('/setCookie', (req, res) => {
    res.cookie('CookieCookie', 'Esto es una cookie', { maxAge: 3000000, signed: true}).send("Cookie creada")
})
app.get('/getCookie', (req, res) => {
    res.send(req.signedCookies)
})
app.get('/deleteCookie', (req, res) => {
    res.clearCookie('CookieCookie').send("Cookie eliminada")
})

//Session Routes
app.get('/session', (req, res) => {
    console.log(req.session)
    if (req.session.counter) {
        req.session.counter++
        res.send(`Sos el usuario N° ${req.session.counter} en ingresar a la página`)
    } else {
        req.session.counter = 1
        res.send("Sos el primer usuario que ingresa a la página")
    }
})

app.post('/login', (req, res) => {
    const { email, password } = req.body
    if (email == "admin@admin.com" && password == "1234") {
        req.session.email = email
        req.session.password = password
    } 
    console.log(req.session)
    res.send("Login")
})

//Websockets
io.on('connection', (socket) => {
    console.log("Conexión con Socket.io")

    socket.on('mensaje', async ( mensaje )=> {
        try {
            await messageModel.create(mensaje)
            const mensajes = await messageModel.find()
            io.emit('mensajeLogs', mensajes)
        } catch (error) {
            io.emit('mensajeLogs', error)
        }
    })
})

