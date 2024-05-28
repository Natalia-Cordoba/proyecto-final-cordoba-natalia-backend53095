import passport from "passport";

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

        res.status(200).send("Usuario creado correctamente")
    } catch (error) {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: ${error.message}`)

        res.status(500).send("Error al registrar usuario")
    }
}

export const logout = async (req, res) => {
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
    // console.log(req)
    req.logger.info("Información del usuario logueado")
    res.status(200).send("Usuario logueado")
}

export const testJWT = async (req, res) => {
    // console.log("Desde testJWT" + req.user)
    req.logger.info(`Desde testJWT: ${req.user}`)
    
    if (req.user.rol == "User") {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: Usuario no autorizado`)

        res.status(403).send("Usuario no autorizado")
    } else
        req.logger.info("Usuario autorizado")

        res.status(200).send(req.user)
}