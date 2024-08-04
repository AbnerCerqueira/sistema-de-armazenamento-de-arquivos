import { FastifyInstance } from "fastify"
import fastifyPlugin from "fastify-plugin"
import fastifyMysql, { MySQLPromiseConnection } from "@fastify/mysql"
import dotenv from "dotenv"

dotenv.config()

declare module "fastify" {
    interface FastifyInstance {
        mysql: MySQLPromiseConnection
    }
}

async function mysqlPlugin(server: FastifyInstance) {
    try {
        await server.register(fastifyMysql, {
            promise: true,
            uri: `mysql://${process.env.MYSQL_HOST}@localhost/${process.env.MYSQL_DATABASE}`,
            password: process.env.MYSQL_PASSWORD
        })
        console.log("Conectado ao banco de dados")
    } catch(err) {
        console.log(err)
    }
}

export default fastifyPlugin(mysqlPlugin)
