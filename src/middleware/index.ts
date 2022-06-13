import { Response, Request } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config()

export const validarJwt = (req: Request, res: Response, next: any) => {

    const xtoken = req.header('x-token');

    if (!xtoken) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const data = jwt.verify(xtoken, process.env.SECRETKEY as any)

        console.log(data)

        next();
        

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
}
