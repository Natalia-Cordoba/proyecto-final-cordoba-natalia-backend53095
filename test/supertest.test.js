import chai from 'chai';
import mongoose from 'mongoose'
import supertest from 'supertest'
import varenv from '../src/dotenv.js';
import { __dirname } from '../src/path.js'
import { getProduct } from '../src/controllers/productsController.js';

const expect = chai.expect

await mongoose.connect(varenv.mongo_url)

const requester = supertest('http://localhost:8080')

// // // test para rutas de session 
// describe('Rutas de sesiones de usuarios (Register, Login y Current)', function () {
//     let user = {}
//     let cookie = {}

//     it('Ruta: api/session/register con el metodo POST', async () => {
//         const newUser = {
//             first_name: "Penelope",
//             last_name: "Palacios",
//             email: "penelope@example.com",
//             password: "penelope1234",
//             age: 22 
//         }

//         const { body, statusCode } = await requester.post('/api/session/register').send(newUser)
//         user = body?.payload 
//         user.password = newUser.password

//         expect(statusCode).to.be.equal(200)

//     })

//     it('Ruta: api/session/login con el metodo POST', async () => {
//         console.log(user)

//         const result = await requester.post('/api/session/login').send(user)
//         const cookieResult = result.headers['set-cookie'][0]

//         cookie = {
//             name: cookieResult.split("=")[0],
//             value: cookieResult.split("=")[1].split(";")[0]
//         }

//         expect(cookie.name).to.be.ok.and.equal('connect.sid')
//         expect(cookie.value).to.be.ok

//     })

//     it('Ruta: api/session/logout con el metodo GET', async () => {

//         const logout = await requester.get('/api/session/logout').redirects(1)

//         expect(logout.status).to.be.equal(200);
//     })

// })



//test para rutas de productos
describe('Test CRUD de Productos en la ruta api/products', function () {

    it('Ruta: api/products metodo GET', async () => {
        const { ok, _body} = await requester.get('/api/products')
        expect(ok).to.be.ok
    })

    it('Ruta: api/products/:pid metodo GET', async () => {
        const productId = '664bee280fe61b058f21e6fd'

        const buscarProd = await requester.get(`/api/products/${productId}`)

        expect(buscarProd.status).to.equal(200)
        expect(buscarProd.body).to.be.an('object')
    })

    it('Ruta: api/products metodo POST', async () => {

        const newProduct = {
            title: "La asistenta, de Freida McFadden",
            description: "novela de misterio",
            price: 32500,
            stock: 145,
            code: "LA_FMF",
            category: "misterio",
        }

        const crearProd = await requester
            .post('/api/products').send(newProduct)
            .send(newProduct);

        
        expect(crearProd).to.be.equal(201)
        expect(crearProd.body).to.be.an('object')

    })


    // it('Ruta: api/products metodo PUT', async () => {
    //     const id = '664beeab0fe61b058f21e705'
    //     const updateProduct = {
    //         price: 25000
    //     }
    //     const { statusCode } = await requester.put(`/api/products/${id}`).send(updateProduct)
    //     expect(statusCode).to.be.equal(200)
    // })


    // it('Ruta: api/products metodo DELETE', async () => {
    //     const id = '664bef510fe61b058f21e70b'

    //     const { statusCode } = await requester.delete(`/api/products/${id}`)
    //     expect(statusCode).to.be.equal(200)
    // })

})
