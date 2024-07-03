import userModel from '../models/user.js';
import { sendEmailChangePassword } from "../utils/nodemailer.js";
import jwt from 'jsonwebtoken';
import { validatePassword, createHash } from '../utils/bcrypt.js';

export const login = async (req, res) => {
    try {
        if (!req.user) {
            req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: Usuario o contraseña no validos`)

            return res.status(401).send("Usuario o contraseña no validos")
        }

        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }

        req.logger.info("Sesión iniciada correctamente")
        
        res.status(200).send("Usuario logueado correctamente")
    } catch (error) {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: ${error.message}`)

        res.status(500).send("Error al loguear usuario")
    }
}

export const register = async (req, res) => {
    try {
        if (!req.user) {
            req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: Usuario ya existente`)
        
            return res.status(400).send("Usuario ya existente en la aplicacion")
        }
        req.logger.info("Usuario registrado correctamente")

        // res.status(200).send("Usuario creado correctamente")
        res.status(200).json({ payload: req.user })
    } catch (error) {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: ${error.message}`)

        res.status(500).send("Error al registrar usuario")
    }
}

export const logout = async (req, res) => {
    const user = await userModel.findOne({email: req.session.user.email})
    user.last_connection = new Date ()
    await user.save()
    req.session.destroy(function (e) {
        if (e) {
            req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: ${error.message}`)
            
            return res.status(500).send("Error al cerrar sesión")
        } else {
            req.logger.info("Sesión finalizada correctamente")

            res.status(200).redirect("/")
        }
    })
}

export const sessionGithub = async (req, res) => {
    console.log(req)
    req.session.user = {
        email: req.user.email,
        first_name: req.user.name
    }
    res.redirect('/')
}

export const current = (req, res) => {
    req.logger.info("Información del usuario logueado")
    res.status(200).send("Usuario logueado")
}

export const testJWT = async (req, res) => {
    req.logger.info(`Desde testJWT: ${req.user}`)
    
    if (req.user.rol == "User" || req.user.rol == "UserPremium") {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: Usuario no autorizado`)

        res.status(403).send("Usuario no autorizado")
    } else
        req.logger.info("Usuario autorizado")

        res.status(200).send(req.user)
}

export const changePassword = async (req, res) => {
    const { token } = req.params
    const { newPassword } = req.body
    try {
        const validateToken = jwt.verify(token.substr(6,), 'coderhouse')
        const user = await userModel.findOne({ email: validateToken.userEmail })
        if (user) {
            if (!validatePassword(newPassword, user.password)) {
                const hashPassword = createHash(newPassword)
                user.password = hashPassword
                const resultado = await userModel.findByIdAndUpdate(user._id, user)
                console.log(resultado)
                res.status(200).send('Contraseña modificada correctamente')
            } else {
                //contraseñas iguales
                res.status(200).send('La nueva contraseña no puede ser identica a la anterior')
            }
        } else {
            //usuario no existe
            res.status(404).send('Usuario no encontrado')
        }
    } catch (e) {
        console.log(e)
        if(e?.message == 'jwt expired') {
            res.status(400).send('Expiró el tiempo máximo para recuperar la contraseña. Se enviará un nuevo correo para cambiarla')
        }
        res.status(500).send(e)
    }
}

export const sendEmailPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await userModel.find({ email: email }) 
        if(user) {
            const token = jwt.sign({ userEmail: email }, "coderhouse", { expiresIn: '2m' })
            const resetLink = `http://localhost:8080/api/session/reset-password?token=${token}`
            sendEmailChangePassword(email, resetLink)
            res.status(200).send('Email enviado correctamente')
        } else {
            res.status(404).send('Usuario no encontrado')   
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
        
