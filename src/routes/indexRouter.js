import productsRouter from './productsRoutes.js';
import cartRouter from './cartRouter.js';
import chatRouter from './chatRouter.js';
import userRouter from './userRoutes.js';
import upload from '../config/multer.js';
import express from 'express';
import { __dirname } from '../path.js';

const indexRouter = express.Router()

//Routes
indexRouter.use('/public', express.static(__dirname + '/public'))
indexRouter.use ('/api/products', productsRouter, express.static(__dirname + '/public'))
indexRouter.use ('/api/cart', cartRouter)
indexRouter.use ('/api/chat', chatRouter, express.static(__dirname + '/public'))
indexRouter.use ('/api/users', userRouter)

indexRouter.post('/upload',upload.single('product'), (req, res,) => {
    try {
        console.log(req.file)
        res.status(200).send("Imagen cargada correctamente")
    } catch (error) {
        res.status(500).send("Error al cargar la imagen")
    }
})

export default indexRouter;