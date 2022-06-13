import { DataSource} from 'typeorm';
import { User } from '../models/User';
import dotenv from 'dotenv'

dotenv.config();


const AppDataSource = new DataSource({
    type: "mysql",
    port: 3306,
    host: process.env.HOST,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [User],
    logging: true,
    synchronize: true,
})

export const database = () => {
    AppDataSource.initialize()
    .then(() => {
        return console.log("Data Base has been initialized!")
    })
    .catch((err) => {
        return console.error("Error during Data Base initialization", err)
    })
}

