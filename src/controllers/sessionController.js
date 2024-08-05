import userModel from '../models/user.js';
import { sendEmailChangePassword } from "../utils/nodemailer.js";
import jwt from 'jsonwebtoken';
import varenv from '../dotenv.js';
import { validatePassword, createHash } from '../utils/bcrypt.js';

export const login = async (req, res) => {
    
    try {
        if (!req.user) {
            req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: Usuario o contraseña no validos`)
            return res.status(401).send("Usuario o contraseña no validos")
        }

        const user = await userModel.findOne({ email: req.user.email }).populate('cart_id');
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }
        const cartId = user.cart_id ? user.cart_id._id.toString() : null

        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name,
            cart_id: cartId
        }

        const token = jwt.sign({ email: req.user.email }, varenv.jwt_secret, { expiresIn: '1h' })

        req.logger.info("Sesión iniciada correctamente")
        
        res.status(200).json({ token, cartId })
    } catch (error) {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: ${error.message}`)

        res.status(500).json({ message: 'Error al iniciar sesión' })
    }
}

export const register = async (req, res) => {
    try {
        if (!req.user) {
            req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: Usuario ya existente`)
        
            return res.status(400).send("Usuario ya existente en la aplicacion")
        }
        req.logger.info("Usuario registrado correctamente")

        res.status(200).json({ payload: req.user })

    } catch (error) {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: ${error.message}`)
        res.status(500).json({ message: "Error al registrar usuario" })
    }
}

export const logout = async (req, res) => {
    try {      
        const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del header
        if (!token) {
            return res.status(401).send("No se puede cerrar sesión sin token");
        }
        
        // Verificar el token
        const decoded = jwt.verify(token, varenv.jwt_secret); 

        const user = await userModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        user.last_connection = new Date();
        await user.save();

        res.status(200).send("Sesión cerrada");
    } catch (error) {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: ${error.message}`);
        res.status(500).send("Error al cerrar sesión");
    }
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
        
