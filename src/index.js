import express from 'express';
import mongoose from 'mongoose';
import messageModel from "./models/messages.js";
import indexRouter from "./routes/indexRouter.js";
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
mongoose.connect("mongodb+srv://nataliacordoba:<password>@cluster0.yd9v8ec.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("DB is connected"))
.catch(error => console.log(error))

//Middlewares
//Permito a express ejecutar JSON
app.use(express.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/', indexRouter)

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

