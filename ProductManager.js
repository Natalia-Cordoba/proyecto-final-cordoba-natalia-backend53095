import { promises as fs } from 'fs'

// La clase ProductManager gestiona los productos 
export class ProductManager {
    constructor(path) {
        this.path = path
    }

    // Método para añadir productos nuevos
    async addProduct(nuevoProducto) {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if (nuevoProducto.code && nuevoProducto.id && nuevoProducto.title && nuevoProducto.description && nuevoProducto.price && nuevoProducto.thumbnail && nuevoProducto.code && nuevoProducto.stock) {
            const indice = productos.findIndex(producto => producto.code === nuevoProducto.code)
            console.log(indice)
            if (indice === -1) {
                productos.push(nuevoProducto)
                console.log(productos)
                await fs.writeFile(this.path, JSON.stringify(productos))
                console.log('El producto fue creado exitosamente')
            } else {
                console.log('Este producto ya existe')
            }
        } else {
            console.log('Todas las propiedades de los productos son obligatorias')
        }
    }

    // Método para mostrar todos los productos añadidos
    async getProducts() {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        console.log(productos)
    }

    // Método para buscar un producto por ID
    async getProductById(id) {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const producto = productos.find(producto => producto.id === id);
        if (producto) {
            console.log(producto);
        }
        else {
            console.log('El producto que buscas no existe');
        }
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
            console.log('El producto fue actualizado exitosamente');
        } else {
            console.log('El producto que quieres actualizar no existe');
        }
    }

    // Método para eliminar un producto
    async deleteProduct(id) {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const indice = productos.findIndex(producto => producto.id === id)
        if (indice != -1) {
            const productosFiltrados = productos.filter(producto => producto.id != id)
            await fs.writeFile(this.path, JSON.stringify(productosFiltrados))
            console.log('El producto fue eliminado exitosamente')
        } else {
            console.log('El producto que quieres eliminar no existe')
        }
    }
}