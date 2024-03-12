import productModel from "../models/product.js";
import { Router } from "express";

const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const prods = await productModel.find().lean()
        let limite = parseInt(limit)
        if (!limite) {
            limite = prods.length
        }
        const prodsLimit = prods.slice(0, limite)
        res.status(200).render('templates/index', {
            mostrarProductos: true,
            productos: prodsLimit,
            css: 'index.css',
        })
    } catch (error) {
        res.status(500).render('templates/error', {
            error: error,
        })
    }
})

productsRouter.get('/:pid', async (req, res) => {
    try {
        const idProduct = req.params.pid
        const product = await productModel.findById(idProduct)
        if (prod) {
            res.status(200).send(prod);
        } else {
            res.status(404).send("Producto no existe")
        }
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar el producto: ${error}`)
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const product= req.body
        const prod = await productModel.create(product)
        res.status(201).send(prod);
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar el producto: ${error}`)
    }
})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const idProduct = req.params.pid
        const updateProduct = req.body
        const prod = await productModel.findByIdAndUpdate(idProduct, updateProduct)
        res.status(200).send(prod)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al actualizar el producto: ${error}`)
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const idProduct = req.params.pid
        const prod = await productModel.findByIdAndDelete(idProduct)
        res.status(200).send(prod)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al eliminar el producto: ${error}`)
    }
})

export default productsRouter;