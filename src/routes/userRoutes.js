import { Router } from "express";
import userModel from "../models/user.js";

const userRouter = Router()

userRouter.get('/', async (req,res) => {
    try {
        const users = await userModel.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send("Error al consultar users: ", error)
    }
})

userRouter.post('/', async (req,res) => {
    try {
        const { first_name, last_name, age, password, email } = req.body
        const newUser = await userModel.create({ first_name, last_name, age, password, email })
        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).send("Error al crear users: ", error)
    }
})

export default userRouter