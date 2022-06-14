import { DataSource} from 'typeorm';
import { User } from '../models/User';
import dotenv from 'dotenv'

dotenv.config();


const AppDataSource = new DataSource({
    type: "mysql",
    port: 3306,
    host: process.env.MYSQLHOST,
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    entities: [User],
    logging: true,
    synchronize: true,
    ssl: true,
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

