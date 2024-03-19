import cartModel from "../models/cart.js";
import { Router } from "express";

const cartRouter = Router()

//crear un carrito nuevo
cartRouter.post('/', async (req, res) => {
    try {
        const cart = await cartModel.create({ products: [] })
        res.status(201).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear el carrito: ${error}`)
    }
}) 

//obtener un carrito por Id
cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findOne({ _id: cartId })
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar el carrito: ${error}`)
    }
})

//agregar un producto al carrito o actualizar la cantidad de un producto
cartRouter.post('/:cid/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        let { quantity } = req.body
        
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


//eliminar un producto del carrito
cartRouter.delete('/:cid/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await cartModel.findById(cartId);
        cart.products = cart.products.filter(product => product.id_prod.toString() !== productId);
        await cart.save();
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send(`Error interno del servidor al eliminar el producto del carrito: ${error}`);
    }
});

//actualizar el carrito
cartRouter.put('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const { products } = req.body;
        const cart = await cartModel.findByIdAndUpdate(cartId, { products }, { new: true });
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send(`Error interno del servidor al actualizar el carrito: ${error}`);
    }
});

//actualizar cantidad de un producto
cartRouter.put('/:cid/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const { quantity } = req.body;
        const cart = await cartModel.findById(cartId);
        const index = cart.products.findIndex(product => product.id_prod.toString() === productId);
        if (index !== -1) {
            cart.products[index].quantity = quantity;
            await cart.save();
            res.status(200).send(cart);
        } else {
            res.status(404).send('Producto no encontrado en el carrito');
        }
    } catch (error) {
        res.status(500).send(`Error interno del servidor al actualizar la cantidad del producto: ${error}`);
    }
});

// Eliminar todos los productos del carrito
cartRouter.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartModel.findByIdAndUpdate(cartId, { products: [] }, { new: true });
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send(`Error interno del servidor al eliminar todos los productos del carrito: ${error}`);
    }
});

export default cartRouter;