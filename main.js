import { Product } from "./Product.js";
import { ProductManager } from "./ProductManager.js";

//creo productos
const producto1 = new Product("Harry Potter y el prisionero de Azkaban, J. K. Rowling", "Libro de fantasía/aventura", 25.000, 100, "HP3-JKR")
const producto2 = new Product("Y no quedó ninguno, Agatha Christie", "Libro de misterio", 14.000, 50, "YNQN-AC")
const producto3 = new Product("Orgullo y prejuicio, Jane Austen", "Libro de romance", 20.000, 80, "OYP-JA")
const producto4 = new Product("It, Stephen King", "Libro de terror", 28.000, 100, "I-SK")

//actualizo un producto
const producto1actualizado = new Product("Harry Potter y el prisionero de Azkaban, J. K. Rowling", "Libro de fantasía/aventura", 30.000, 100, "HP3-JKR")

//creo un producto que ya existe para comprobar que no me deje hacerlo
const producto5 = new Product("It, Stephen King", "Libro de terror", 28.000, 100, "I-SK")

//creo un producto sin todos los datos para comprobar que no me deje hacerlo
const producto6 = new Product("Misery, Stephen King", "Libro de terror", "M-SK")

//agrego los productos creados al ProductManager
const productManager = new ProductManager('./products.json')

//creo los productos con el metodo .addProduct
// productManager.addProduct(producto1)
// productManager.addProduct(producto2)
// productManager.addProduct(producto3)
// productManager.addProduct(producto4)
productManager.addProduct(producto5)
productManager.addProduct(producto6)

// consulto mis productos con el metodo .getProducts (va a haber productos actualizados y eliminados)
productManager.getProducts()

// busco un producto por id con el metodo .getProductById
productManager.getProductById('aa71e4c86e1cb7ade753')

//actualizo el precio de un producto con el metodo updatProduct
productManager.updateProduct('3d5f409919ae32211532', producto1actualizado)

//elimino un producto con el metodo .deleteProduct
productManager.deleteProduct('77cda1a7d6ed798e4530')




