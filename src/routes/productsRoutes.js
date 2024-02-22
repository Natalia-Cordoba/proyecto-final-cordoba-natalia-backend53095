import { Router } from "express";
import { ProductManager } from '../config/ProductManager.js';

//creo una instancia de ProductManager, le indico la ruta al archivo json con los productos
const productManager = new ProductManager('./src/data/products.json')
const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const prods = await productManager.getProducts()
        let limite = parseInt(limit)
        if (!limite) {
            limite = prods.length
        }
        const prodsLimit = prods.slice(0, limite)
        res.render('templates/index', {
            mostrarProductos: true,
            productos: prodsLimit,
            css: 'index.css',
        })
    } catch (error) {
        res.status(500).send('templates/error', {
            error: error,
        })
    }
})

productsRouter.get('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid
        const producto = await productManager.getProductById(idProducto)

        if (producto) {
            res.status(200).send(producto);
        } else {
            res.status(400).send("Producto no existe")
        }
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar el producto: ${error}`)
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const producto = req.body
        const mensaje = await productManager.addProduct(producto)
        if (mensaje == "El producto fue creado exitosamente") {
            res.status(200).send(mensaje);
        } else {
            res.status(400).send(mensaje)
        }
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar el producto: ${error}`)
    }
})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid
        const updateProducto = req.body
        const mensaje = await productManager.updateProduct(idProducto, updateProducto)

        if (mensaje == "El producto fue actualizado exitosamente") {
            res.status(200).send(mensaje)
        } else {
            res.status(400).send(mensaje)
        }
    } catch (error) {
        res.status(500).send(`Error interno del servidor al actualizar el producto: ${error}`)
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid
        const mensaje = await productManager.deleteProduct(idProducto)

        if (mensaje == "El producto fue eliminado exitosamente") {
            res.status(200).send(mensaje)
        } else {
            res.status(400).send(mensaje)
        }
    } catch (error) {
        res.status(500).send(`Error interno del servidor al eliminar el producto: ${error}`)
    }
})

export default productsRouter;