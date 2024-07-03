
export const insertImg = (req, res) => {
    try {
        req.logger.info(`Imagen o documento cargado correctamente: ${req.file}`)

        res.status(200).send("Imagen o documento cargado correctamente")
    } catch (error) {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: ${error.message}`)
        res.status(500).send("Error al cargar imagen o documento")
    }
}