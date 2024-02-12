import { promises as fs } from 'fs';
import crypto from 'crypto';

// La clase ProductManager gestiona los productos 
export class ProductManager {
    constructor(path) {
        this.path = path
    }

    // Método para añadir productos nuevos
    async addProduct(nuevoProducto) {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if (nuevoProducto.title && nuevoProducto.description && nuevoProducto.price && nuevoProducto.stock && nuevoProducto.code && nuevoProducto.category) {
            const indice = productos.findIndex(producto => producto.code === nuevoProducto.code)
            if (indice === -1) {
                nuevoProducto.status = true
                if (!nuevoProducto.thumbnail)
                    nuevoProducto.thumbnail = []
                nuevoProducto.id = crypto.randomBytes(10).toString('hex')
                productos.push(nuevoProducto)
                await fs.writeFile(this.path, JSON.stringify(productos))
                return 'El producto fue creado exitosamente';
            } else {
                return 'Este producto ya existe';
            }
        } else {
            return 'Todas las propiedades de los productos son obligatorias'
        }
    }

    // Método para mostrar todos los productos añadidos
    async getProducts() {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return productos
    }

    // Método para buscar un producto por ID
    async getProductById(id) {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const producto = productos.find(producto => producto.id === id);
            return producto;
    }

    // Método para actualizar un producto
    async updateProduct(id, nuevoProducto) {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const indice = productos.findIndex(producto => producto.id === id);
        if (indice != -1) {
            productos[indice].title = nuevoProducto.title
            productos[indice].description = nuevoProducto.description
            productos[indice].price = nuevoProducto.price
            productos[indice].thumbnail = nuevoProducto.thumbnail
            productos[indice].code = nuevoProducto.code
            productos[indice].stock = nuevoProducto.stock
            await fs.writeFile(this.path, JSON.stringify(productos));
            return 'El producto fue actualizado exitosamente';
        } else {
            return 'El producto que quieres actualizar no existe';
        }
    }

    // Método para eliminar un producto
    async deleteProduct(id) {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const indice = productos.findIndex(producto => producto.id === id)
        if (indice != -1) {
            const productosFiltrados = productos.filter(producto => producto.id != id)
            await fs.writeFile(this.path, JSON.stringify(productosFiltrados))
            return 'El producto fue eliminado exitosamente';
        } else {
            return 'El producto que quieres eliminar no existe';
        }
    }
}