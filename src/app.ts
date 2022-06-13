import dotenv from 'dotenv';
import Server from './models/server';
import "reflect-metadata";

// Configuarar dotenv
dotenv.config();


const server = new Server();

server.listen()