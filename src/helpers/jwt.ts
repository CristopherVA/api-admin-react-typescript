import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const generarJWT = (id: number, name: string,) => {
    return new Promise( (resolve, reject) => {
        const payload = { id, name }

        jwt.sign(payload, process.env.SECRETKEY as any, {
            expiresIn: '2h'
        }, (err, token) => {
            
            if(err){
                reject('No se pudo generar el token')
            }

            resolve(token)
        })
    })
}

export default generarJWT;