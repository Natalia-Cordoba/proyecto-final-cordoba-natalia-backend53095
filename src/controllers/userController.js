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

export const sendDocuments = async (req, res) => {
    try {
        const { uid } = req.params
        const newDocs = req.body
        const user = await userModel.findByIdAndUpdate(uid, {
            $push: {
                documents: {
                    $each: newDocs
                }
            }
        }, {new: true})
        if(!user) {
            res.status(404).send('User no existe')
        } else {
            res.status(200).send(user)

        }
    } catch (error) {
        res.status(500).send(error)
    }
}
