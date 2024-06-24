import chai from 'chai'
import mongoose from 'mongoose'
import supertest from 'supertest'
import varenv from '../src/dotenv.js'
import { __dirname } from '../src/path.js'
import jwt from 'jsonwebtoken'

const expect = chai.expect

await mongoose.connect(varenv.mongo_url)

const requester = supertest('http://localhost:8080')

const generateAdminToken = () => {

    const secret = varenv.jwt_secret;
    const payload = {
        user: {
            _id: '661ffef55768fc9097bc79c8',
            email: 'adminCoder@coder.com',
            rol: 'Admin'
        }
    }

    return jwt.sign(payload, secret, { expiresIn: '1h' });
}


// test para rutas de productos
describe('Test de Productos en la ruta api/products', function () {

    it('Ruta: api/products metodo GET', async () => {
        const productos = await requester.get('/api/products')
        expect(productos).to.be.ok
    })

    it('Ruta: api/products/:pid metodo GET', async () => {
        const productId = '664bee280fe61b058f21e6fd'

        const buscarProd = await requester.get(`/api/products/${productId}`)

        expect(buscarProd.status).to.be.equal(200)
        expect(buscarProd.body).to.be.an('object')
    })

    it('Ruta: api/products metodo POST', async () => {

        const newProduct = {
            title: "El imperio final, de Brandon Sanderson",
            description: "novela de fantasía",
            price: 40000,
            stock: 179,
            code: "EIF-BS",
            category: "fantasia",
        }

        const token = generateAdminToken();

        const crearProd = await requester
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send(newProduct);

        expect(crearProd.statusCode).to.be.equal(201)
        expect(newProduct).to.be.an('object')
    })


    it('Ruta: api/products metodo PUT', async () => {
        const token = generateAdminToken()

        const id = '664bec7e307ca2c77ecad089'
        const updateProduct = {
            price: 25000
        }
        const { statusCode } = await requester
            .put(`/api/products/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateProduct)

        expect(statusCode).to.be.equal(200)
    })


    it('Ruta: api/products metodo DELETE', async () => {
        const token = generateAdminToken()

        const id = '6678bc750dfd5426147b5a2b'

        const { statusCode } = await requester
            .delete(`/api/products/${id}`)
            .set('Authorization', `Bearer ${token}`)
            
        expect(statusCode).to.be.equal(200)
    })

})
