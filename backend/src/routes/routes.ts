import { FastifyInstance, RouteOptions } from "fastify";
import { createUser, getFiles, getUser, uploadFile, downloadFile, deleteFile, getToken } from "../controllers/userController";
import { verifyJwt } from "../middlewares/auth";

const cadastroRoute: RouteOptions = {
    method: "POST",
    url: "/api/cadastro",
    handler: createUser
}

const loginRoute: RouteOptions = {
    method: "POST",
    url: "/api/login",
    handler: getUser
}

const protectedRoute: RouteOptions = {
    method: "GET",
    url: "/api/protected",
    onRequest: verifyJwt,
    handler: getToken
}

const uploadFileRoute: RouteOptions = {
    method: "POST",
    url: "/api/upload",
    onRequest: verifyJwt,
    handler: uploadFile
}

const filesUserRoute: RouteOptions = {
    method: "GET",
    url: "/api/files",
    onRequest: verifyJwt,
    handler: getFiles
}

const downloadFileRoute: RouteOptions = {
    method: "GET",
    url: "/api/download/:id_file",
    onRequest: verifyJwt,
    handler: downloadFile
}

const deleteFileRoute: RouteOptions = {
    method: "DELETE",
    url: "/api/delete/:id_file",
    onRequest: verifyJwt,
    handler: deleteFile
}

export default function routes(server: FastifyInstance, options: any, done: Function) {
    server.route(cadastroRoute)
    server.route(loginRoute)
    server.route(protectedRoute)
    server.route(uploadFileRoute)
    server.route(filesUserRoute)
    server.route(downloadFileRoute)
    server.route(deleteFileRoute)
    done()
}
