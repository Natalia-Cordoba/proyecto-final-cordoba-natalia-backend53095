import winston from "winston";

const customLevelOpt = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'magenta', 
        warning: 'yellow',
        info: 'blue',
        http: 'gray',
        debug: 'cyan'
    }
};

winston.addColors(customLevelOpt.colors);

const logger = winston.createLogger({
    levels: customLevelOpt.levels, 
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ all: true }), 
                winston.format.simple()
            )
        }),

        new winston.transports.File({
            level: 'warning',
            filename: './warnings.log',
            format: winston.format.simple()
        }),

        new winston.transports.File({
            level: 'error',
            filename: './errors.log',
            format: winston.format.simple()
        }),

        new winston.transports.File({
            level: 'fatal',
            filename: './errors.log',
            format: winston.format.simple()
        }),

        new winston.transports.Console({
            level: 'http',
            format: winston.format.simple()
        }),

        new winston.transports.Console({
            level: 'debug',
            format: winston.format.simple()
        })
    ]
})

export const addLogger = (req, res, next) => {
    req.logger = logger
    req.logger.info(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    next()
}

//logger test
export const loggerTest = async (req, res) => {
    try {

        logger.fatal('Este es un mensaje de fatal');
        logger.error('Este es un mensaje de error');
        logger.warning('Este es un mensaje de warning');
        logger.info('Este es un mensaje de info');
        logger.http('Este es un mensaje de http');
        logger.debug('Este es un mensaje de debug');
        
        res.send('Logs generados con éxito');
    } catch (error) {
        logger.error(`Error al generar logs: ${error.message}`);
        res.status(500).send('Error interno del servidor');
    }
};