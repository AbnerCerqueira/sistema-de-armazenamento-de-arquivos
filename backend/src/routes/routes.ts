import { FastifyInstance, RouteOptions } from "fastify";
import { createUser, getFiles, getUser, uploadFile, downloadFile, deleteFile } from "../controllers/userController";
import { verifyJwt } from "../middlewares/auth";

const cadastro: RouteOptions = {
    method: "POST",
    url: "/api/cadastro",
    handler: createUser
}

const login: RouteOptions = {
    method: "POST",
    url: "/api/login",
    handler: getUser
}

const protect: RouteOptions = {
    method: "GET",
    url: "/api/protected",
    onRequest: verifyJwt,
    handler: verifyJwt
}

const uploadArquivo: RouteOptions = {
    method: "POST",
    url: "/api/upload",
    onRequest: verifyJwt,
    handler: uploadFile
}

const arquivosUsuer: RouteOptions = {
    method: "GET",
    url: "/api/files",
    onRequest: verifyJwt,
    handler: getFiles
}

const downloaddFile: RouteOptions = {
    method: "GET",
    url: "/api/download/:id_file",
    onRequest: verifyJwt,
    handler: downloadFile
}

const deleteeFile: RouteOptions = {
    method: "DELETE",
    url: "/api/delete/:id_file",
    onRequest: verifyJwt,
    handler: deleteFile
}

export default function routes(server: FastifyInstance, options: any, done: Function) {
    server.route(cadastro)
    server.route(login)
    server.route(protect)
    server.route(uploadArquivo)
    server.route(arquivosUsuer)
    server.route(downloaddFile)
    server.route(deleteeFile)
    done()
}