import { FastifyInstance } from "fastify"
import fastifyStatic from "@fastify/static"
import fastifyPlugin from "fastify-plugin"
import path from "path"

async function staticPlugin(server: FastifyInstance) {
    try {
        await server.register(fastifyStatic, {
            root: path.join(__dirname, '../', 'uploads'),
            prefix: '/uploads/'
        })
    } catch (err) {
        console.log(err)
    }
}

export default fastifyPlugin(staticPlugin)
