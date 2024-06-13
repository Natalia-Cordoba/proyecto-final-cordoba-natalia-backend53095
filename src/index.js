import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import varenv from './dotenv.js'
import messageModel from "./models/messages.js";
import indexRouter from "./routes/indexRouter.js";
import initializePassport from './config/passport/passport.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { engine } from 'express-handlebars';
import { __dirname } from './path.js';
import { Server } from 'socket.io';
import { addLogger } from './utils/logger.js';

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
mongoose.connect(varenv.mongo_url)
.then(() => console.log("DB is connected"))
.catch(error => console.log(error))

const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Documentacion de la aplicacion',
            description: 'Descripcion de la documentacion'
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)

//Middlewares
//Permito a express ejecutar JSON
app.use(express.json())
app.use(session({
    secret: varenv.session_secret,
    resave: true,
    store: MongoStore.create({
        mongoUrl: varenv.mongo_url,
        ttl: 60 * 60
    }),
    saveUninitialized: true
}))
app.use(cookieParser(varenv.cookies_secret))
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

//passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//logger
app.use(addLogger)

//routes
app.use('/', indexRouter)

//routes cookies
app.get('/setCookie', (req, res) => {
    res.cookie('CookieCookie', 'Esto es una cookie', { maxAge: 3000000, signed: true}).send("Cookie creada")
})

app.get('/getCookie', (req, res) => {
    res.send(req.signedCookies)
})

app.get('/deleteCookie', (req, res) => {
    res.clearCookie('CookieCookie').send("Cookie eliminada")
})

//session routes
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

