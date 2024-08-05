import userModel from "../models/user.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        req.logger.info("usuarios consultados correctamente")
        res.json(users)
    } catch (error) {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: ${error.message}`)
        res.status(500).json({ message: error.message })
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

export const deleteInactiveUsers = async () => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const users = await userModel.find({ last_connection: { $lt: thirtyDaysAgo } })

        const result = await userModel.deleteMany({
            last_connection: { $lt: thirtyDaysAgo }
        })

        for (const user of users) {
            await sendEmail(user.email, 'Cuenta Eliminada', 'Tu cuenta ha sido eliminada debido a inactividad.');
        }
        res.status(200).json({ message: `Usuarios eliminados: ${result.deletedCount}` })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUserRole = async (req, res) => {
    try {
        const { uid } = req.params;
        const { role } = req.body;

        if (!['Admin', 'User'].includes(role)) {
            return res.status(400).send('Rol no válido')
        }

        const user = await userModel.findByIdAndUpdate(uid, { rol: role }, { new: true })

        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}