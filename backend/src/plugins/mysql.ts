import { FastifyInstance } from "fastify"
import fastifyPlugin from "fastify-plugin"
import fastifyMysql, { MySQLPromiseConnection } from "@fastify/mysql"

declare module "fastify" {
    interface FastifyInstance {
        mysql: MySQLPromiseConnection
    }
}

async function mysqlPlugin(server: FastifyInstance) {
    try {
        await server.register(fastifyMysql, {
            promise: true,
            uri: "mysql://root@localhost/sistemaarmazenamento"
        })
        console.log("Conectado ao banco de dados")
    } catch(err) {
        console.log(err)
    }
}

export default fastifyPlugin(mysqlPlugin)
