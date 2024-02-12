import { promises as fs } from 'fs';

export class CartManager {
    constructor(path) {
        this.products = path
    }

    async getCart() {
        const carrito = JSON.parse(await fs.readFile(this.products, 'utf-8'))
        return carrito
    }

    async addProductByCart(idProducto, quantityParam) {
        const carrito = JSON.parse(await fs.readFile(this.products, 'utf-8'))
        const indiceProducto = carrito.findIndex(producto => producto.id == idProducto)

        if (indiceProducto != -1) {
            carrito[indiceProducto].quantity += quantityParam
        } else {
            const producto = { id: idProducto, quantity: quantityParam}
            carrito.push(producto)
        }
        await fs.writeFile(this.products, JSON.stringify(carrito))
        return "Producto cargado correctamente"
    }
}

