import express from 'express';
import productsRouter from './routes/productsRoutes.js';
import cartRouter from './routes/cartRouter.js';
import chatRouter from './routes/chatRouter.js';
import upload from './config/multer.js';
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

//Middlewares
//Permito a express ejecutar JSON
app.use(express.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

const mensajes = []
io.on('connection', (socket) => {
    console.log("Conexión con Socket.io")

    socket.on('mensaje', info => {
        console.log(info)
        mensajes.push(info)
        io.emit('mensajeLogs', mensajes)
    })
})

//Routes
app.use('/public', express.static(__dirname + '/public'))
app.use ('/api/products', productsRouter, express.static(__dirname + '/public'))
app.use ('/api/cart', cartRouter)
app.use ('/api/chat', chatRouter, express.static(__dirname + '/public'))
app.post('/upload',upload.single('product'), (req, res,) => {
    try {
        console.log(req.file)
        console.log(req.body)

        res.status(200).send("Imagen cargada correctamente")
    } catch (error) {
        res.status(500).send("Error al cargar la imagen")
    }
})

