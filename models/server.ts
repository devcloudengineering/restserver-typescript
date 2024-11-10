import express, {Application} from 'express'
import userRoutes from '../routes/usuario'
import cors from 'cors'
import db from '../db/connection';

class Server {
    private app: Application;
    private port: string
    private apiPath = {
        usuarios: '/api/usuarios',
    }

    constructor(){
        this.app = express()
        this.port = process.env.PORT || '3000'

        // Base de datos
        this.dbConnection()

        // Definir mis middlewares
        this.middlewares()

        // Definir mis rutas
        this.routes()
    }

    routes() {
        this.app.use(this.apiPath.usuarios, userRoutes)
    }


    listen(){
        this.app.listen(this.port, ()=> console.log('Servidor corriendo en el puerto:', this.port))
    }

    async dbConnection ( ) {
        try {
            await db.authenticate
            console.log('Database online')
        } catch (error: any ) {
            throw new Error(error)
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors())
        //Lectura del body
        this.app.use(express.json())
        //Carpeta publica
        this.app.use(express.static('public'))
    }
}

export default Server