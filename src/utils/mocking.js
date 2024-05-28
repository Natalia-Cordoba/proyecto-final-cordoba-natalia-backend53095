import { faker } from '@faker-js/faker/locale/es';
import productModel from '../models/product.js';

export const createRandomProduct = async (req, res) => {
    try {
        if (req.user.rol == "Admin") {
        const products = []

        for (let i = 0; i < 100; i++) {
            const productRandom = {
                title: `${faker.music.songName()}, de ${faker.person.fullName()}`,
                description: faker.lorem.words({ min: 3, max: 5 }),
                price: faker.commerce.price({ min: 8000, max: 40000 }),
                stock: faker.number.int(150),
                code: faker.commerce.isbn(),
                category: faker.helpers.arrayElement(['Misterio', 'Fantasía', 'Ciencia Ficción', 'Romance', 'Aventura', 'Biografía', 'Historia', 'Autoayuda', 'Thriller']),
                status: faker.datatype.boolean(1.0),
                thumbnail: faker.helpers.arrayElement([faker.image.url()]),
                _id: faker.database.mongodbObjectId()
            }
            products.push(productRandom)
        }

        await productModel.insertMany(products)

        req.logger.info(`Los 100 productos se crearon correctamente: ${products}`)

        res.status(201).send(products)
    } else {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: Usuario no autorizado`)

        res.status(403).send("Usuario no autorizado")
    }
    } catch (error) {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: ${error.message}`)

        res.status(500).send("Error interno del servidor al crear los 100 productos")
    }
}

