import express from 'express';
import { ProductManager } from './config/ProductManager.js';

//creo una instancia de express
const app = express()
//defino el puerto
const PORT = 8000

//creo una instancia de ProductManager, le indico la ruta al archivo json con los productos
const productManager = new ProductManager('./src/data/products.json')

//ruta de inicio con mensaje
app.get('/', (req,res) => {
    res.send("¡Hola, desde el home!")
})

//ruta para obtener una lista de productos, el limite es opcional
app.get('/productos/', async (req,res) => {

    const { limit } = req.query

    const productos = await productManager.getProducts()

    const limite = parseInt(limit)

    if(limite) {
        const productosLimite = productos.slice(0, limit)
        res.send(productosLimite)
    } else if (limit && (isNaN(limite) || limite <= 0)) {
        res.send('Ingrese un número valido y mayor a cero para el límite')
    } else {
        res.send(productos)
    }
})

//ruta para ibtener un producto por id
app.get('/producto/:pid', async (req,res) => {
    const idProducto = req.params.pid

    const producto = await productManager.getProductById(idProducto)

    res.send(producto);
})

//inicio el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})