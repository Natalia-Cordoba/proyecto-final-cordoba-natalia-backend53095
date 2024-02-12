import { Router } from "express";
import { CartManager } from "../config/CartManager.js";

const cartManager = new CartManager('./src/data/cart.json')
const cartRouter = Router()


cartRouter.get('/', async (req, res) => {
    try {
        const carrito = await cartManager.getCart()
        res.status(200).send(carrito)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar el carrito: ${error}`)
    }
})

cartRouter.post('/:pid', async (req, res) => {
    try {
        const productoId = req.params.pid
        const { quantity } = req.body
        const mensaje = await cartManager.addProductByCart(productoId, quantity)
        res.status(200).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear el producto: ${error}`)
    }
})

export default cartRouter;