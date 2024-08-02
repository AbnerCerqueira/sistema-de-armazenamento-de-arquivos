import { FastifyInstance, RouteOptions } from "fastify";
import { createUser, getUser } from "../controllers/userController";

const cadastro: RouteOptions = {
    method: "POST",
    url: "/cadastro",
    handler: createUser
}

const login: RouteOptions = {
    method: "POST",
    url: "/login",
    handler: getUser
}

export default function routes(server: FastifyInstance, options: any, done: Function) {
    server.route(cadastro)
    server.route(login)
    done()
}