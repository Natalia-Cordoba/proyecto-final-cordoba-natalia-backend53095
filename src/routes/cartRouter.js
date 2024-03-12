import cartModel from "../models/cart.js";
import { Router } from "express";

const cartRouter = Router()

cartRouter.post('/', async (req, res) => {
    try {
        const cart = await cartModel.create({ products: [] })
        res.status(201).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear el carrito: ${error}`)
    }
}) 

cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findById(cartId)
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar el carrito: ${error}`)
    }
})

cartRouter.post('/:cid/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        let { quantity } = req.body
        if (!quantity || isNaN(quantity)) {
            quantity = 1;
        }
        const cart = await cartModel.findById(cartId)
        
        const indice = cart.products.findIndex(product => product.id_prod == productId)

        if (indice != -1) {
            cart.products[indice].quantity = quantity
        } else {
            cart.products.push({ id_prod: productId, quantity: quantity })
        }
        const mensaje = await cartModel.findByIdAndUpdate(cartId, cart)
        res.status(200).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al cargar el producto: ${error}`)
    }
})

export default cartRouter;