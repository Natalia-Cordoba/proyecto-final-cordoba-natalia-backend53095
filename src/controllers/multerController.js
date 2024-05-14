import upload from '../config/multer.js'

export const insertImg = (req, res) => {
    try {
        console.log(req.file)
        res.status(200).send("Imagen cargada correctamente")
    } catch (error) {
        res.status(500).send("Error al cargar imagen")
    }
}