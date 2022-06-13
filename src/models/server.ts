import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import userRouter from '../routes/user';
import authRouter from '../routes/auth';

import { database } from '../config/db';



class Server {
    private app: Application;
    private port: string;
    private apiPath = {
        user: '/api/user',
        auth: '/api/auth'
    }

    constructor() {
        this.app = express(); 
        this.port = process.env.PORT || '3000';

        //CONEXION DE LA BASE DE DATOS
        this.conextionDB();

        // Methodos  
        this.middleware();
        this.router();
    }

    // Conexion de la base de datos
    conextionDB()  {
        return database()
    }

    middleware() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'));
    }

    router() {
        this.app.use(this.apiPath.user, userRouter);
        this.app.use(this.apiPath.auth, authRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server on port', this.port);
        })
    }
}

export default Server;