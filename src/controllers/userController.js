import userModel from "../models/user.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        req.logger.info("usuarios consultados correctamente")
        res.status(200).send(users)
    } catch (error) {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: ${error.message}`)
        res.status(500).send("Error al consultar users")
    }
}