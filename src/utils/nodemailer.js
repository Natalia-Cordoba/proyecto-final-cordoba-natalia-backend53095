import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    // port: 587,
    auth: {
        user: 'michhi.2810@gmail.com',
        password: ''
    },
})

export const sendEmailChangePassword = async (email, linkChangePassword) => {
    const mailOption = {
        from: 'michhi.2810@gmail.com',
        to: email,
        subject: 'Recuperación de contraseña',
        html: 
            `
            <p>Click aquí para cambiar tu contraseña:</p>
            <button> <a href=${linkChangePassword}>Cambiar contraseña</a> </button>
            `
    }
    transporter.sendMail(mailOption, (error, info) => {
        if(error) {
            console.log('Error al enviar el correo de cambio de contraseña', error)
        } else {
            console.log('Correo enviado correctamente', info.response)
        }
    })
}