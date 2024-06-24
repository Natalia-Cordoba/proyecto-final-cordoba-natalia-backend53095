import chai from 'chai';
import mongoose from 'mongoose'
import supertest from 'supertest'
import varenv from '../src/dotenv.js';
import { __dirname } from '../src/path.js'
import jwt from 'jsonwebtoken'

const expect = chai.expect

await mongoose.connect(varenv.mongo_url)

const requester = supertest('http://localhost:8080')

const generateAdminToken = () => {

    const secret = varenv.jwt_secret;
    const payload = {
        user: {
            _id: '6642bea1407375ae2dd000af',
            email: 'felix@example.com',
            rol: 'User'
        }
    }

    return jwt.sign(payload, secret, { expiresIn: '1h' });
}


// test para rutas de carritos
describe('Test de Carritos en la ruta api/cart', function () {

    it('Ruta: api/cart con el metodo POST', async () => {
        const newCart = { products: [] }

        const crearCarrito = await requester.post('/api/cart').send(newCart)
       
        expect(crearCarrito.status).to.be.equal(201)
        expect(crearCarrito.body).to.be.an('object')
    })

    it('Ruta: api/cart/:cid metodo GET', async () => {
        const cartId = '6620002fb34896d6fb42b5c5'

        const buscarCarrito = await requester.get(`/api/cart/${cartId}`)

        expect(buscarCarrito.status).to.be.equal(200)
        expect(buscarCarrito.body).to.be.an('object')
    })

    
})