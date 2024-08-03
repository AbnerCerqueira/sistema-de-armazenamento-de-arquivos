import bcrypt from "bcrypt"
import fs from "fs"
import util from "util"
import { FastifyReply, FastifyRequest } from "fastify";
import { pipeline } from "stream"
import { File, User } from "../types";
import { mysqlCreateDirFile, mysqlCreateUser, mysqlDeleteFile, mysqlGetFileById, mysqlGetFilesByUser, mysqlGetUser } from "../database/dao"
import { MySQLRowDataPacket } from "@fastify/mysql";
import path from "path";

export async function createUser(req: FastifyRequest, reply: FastifyReply) {
    const user = req.body as User
    const { username_user, password_user, confpass } = user

    if (!username_user || !password_user || !confpass) {
        return reply.status(400).send({ message: "Algum campo não foi definido" })
    }

    if (username_user.trim() === "" || password_user.trim() === "" || confpass.trim() === "") {
        return reply.status(400).send({ message: "Preencha os campos vazios" })
    }

    if (password_user !== confpass) {
        return reply.status(400).send({ message: "Senhas não conincidem" })
    }

    try {
        const con = req.server.mysql
        await mysqlCreateUser(con, user)
        return reply.status(201).send({ message: "Cadastro realizado com sucesso" })
    }
    catch (err: any) {
        return err.code === "ER_DUP_ENTRY" ? reply.status(409).send({ message: "Usuário ja existe" }) : err
    }
}

export async function getUser(req: FastifyRequest, reply: FastifyReply) {
    const user = req.body as User
    const { username_user, password_user } = user

    if (!username_user || !password_user) {
        return reply.status(400).send({ message: "Algum campo não foi definido" })
    }

    if (username_user.trim() === "" || password_user.trim() === "") {
        return reply.status(400).send({ message: "Preencha os campos vazios" })
    }

    let result: MySQLRowDataPacket[] = []
    try {
        const con = req.server.mysql
        result = await mysqlGetUser(con, user)
    }
    catch (err: any) {
        return reply.status(500)
    }

    if (!result.length) {
        return reply.status(404).send({ message: "Usuário não encontrado" })
    }

    const isMatch = await bcrypt.compare(password_user, result[0].password_user)

    if (!isMatch) {
        return reply.status(403).send({ message: "Senha inválida" })
    }

    delete result[0].password_user
    const token = req.server.jwt.sign({ ...result[0] }, { expiresIn: '2days' })
    return reply.status(200).send(token)
}

export async function uploadFile(req: FastifyRequest, reply: FastifyReply) {
    const pump = util.promisify(pipeline)
    const files = req.files()


    for await (const file of files) {
        try {
            const con = req.server.mysql
            const filename = file.filename
            const dir_file = `./src/uploads/${file.filename}`
            const { id_user } = req.user as User

            await pump(file.file, fs.createWriteStream(dir_file))
            await mysqlCreateDirFile(con, { filename, dir_file, id_user })
        } catch (err) {
            return reply.status(500).send(err)
        }
    }
    return reply.status(202).send({ message: "Upload sendo realizado" })
}

export async function getFiles(req: FastifyRequest, reply: FastifyReply) {
    try {
        const con = req.server.mysql
        const { id_user } = req.user as User
        const results = await mysqlGetFilesByUser(con, id_user)
        return reply.status(200).send(results)
    } catch (err) {
        return reply.status(500).send(err)
    }
}

export async function downloadFile(req: FastifyRequest, reply: FastifyReply) {
    try {
        const con = req.server.mysql
        const { id_file } = req.params as File
        const [result] = await mysqlGetFileById(con, id_file)
        const filename = result.filename as string
        return reply.status(200).download(filename, filename)
    } catch (err) {
        return reply.status(500).send(err)
    }
}

export async function deleteFile(req: FastifyRequest, reply: FastifyReply) {
    const removeFile = util.promisify(fs.unlink)
    const { id_file } = req.params as File
    if (!id_file) {
        return reply.status(204)
    }
    try {
        const con = req.server.mysql
        const result = await mysqlGetFileById(con, id_file)
        if (result.length) {
            await mysqlDeleteFile(con, id_file)
            await removeFile(path.join(__dirname, '../', 'uploads', result[0].filename))
            return reply.status(200).send({ message: "Arquivo apagado com sucesso" })
        }
    } catch (err) {
        return reply.status(500).send(err)
    }
}
