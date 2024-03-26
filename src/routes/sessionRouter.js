import { Router } from "express";
import userModel from "../models/user.js";

const sessionRouter = Router()

sessionRouter.get('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userModel.findOne({ email: email }).lean()
        if (user && password == user.password) {
            req.session.email = email
            if (user.rol == "Admin") {
                req.session.admin = true       
                res.status(200).send("Usuario Admin logueado correctamente")         
            } else {
                res.status(200).send("Usuario logueado correctamente")
            }
        } else {
            res.status(401).send("Usuario o contraseña no válidos")         
        }
    } catch (error) {
        res.status(500).send("Error al logear usuario: ", error)
    }
})

sessionRouter.post('/register', async (req,res) => {
    try {
        const { first_name, last_name, age, password, email, } = req.body
        const findUser = await userModel.findOne({ email: email })
        if (findUser) {
            res.status(400).send("Ya existe un usuario con ese email")
        } else {
            await userModel.create({ first_name, last_name, age, password, email })
            res.status(201).send("Usuario creado correctamente")
        }

    } catch (error) {
        res.status(500).send("Error al crear users: ", error)
    }
})

sessionRouter.get('/logout', (req, res) => {
    req.session.destroy(function(e) {
        if (e) {
            console.log(e)
        } else {
            res.status(200).redirect("/")
        }
    })
})

export default sessionRouter;