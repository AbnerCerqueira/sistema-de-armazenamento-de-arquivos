import { FastifyInstance } from "fastify"
import fastifyPlugin from "fastify-plugin"
import jwt from "@fastify/jwt"
import dotenv from "dotenv"

dotenv.config()

async function jwtPlugin(server: FastifyInstance) {
    await server.register(jwt, {
        secret: process.env.SECRET_JWT as string
    })
}

export default fastifyPlugin(jwtPlugin)
