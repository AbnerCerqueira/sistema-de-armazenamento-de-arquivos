import multipart from "@fastify/multipart"
import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

async function multipartPlugin(server: FastifyInstance) {
    try {
        await server.register(multipart)
    } catch(err) {
        console.log(err)
    }
}

export default fastifyPlugin(multipartPlugin)