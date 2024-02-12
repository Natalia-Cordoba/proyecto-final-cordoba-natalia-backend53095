import express from 'express';
import productsRouter from './routes/productsRoutes.js';
import cartRouter from './routes/cartRouter.js';

//creo una instancia de express
const app = express()
//defino el puerto
const PORT = 8080

//permito a express ejecutar JSON
app.use(express.json())

app.use ('/api/products', productsRouter)
app.use ('/api/cart', cartRouter)

//ruta de inicio con mensaje
app.get('/', (req, res) => {
    res.send("¡Hola, desde el home!")
})

//inicio el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})