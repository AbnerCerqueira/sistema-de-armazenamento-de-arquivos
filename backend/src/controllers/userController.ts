import bcrypt from "bcrypt"
import { FastifyReply, FastifyRequest } from "fastify"
import { User } from "../types"
import { mysqlCreateUser, mysqlGetUser } from "../database/dao"
import { MySQLRowDataPacket } from "@fastify/mysql"

export async function createUser(req: FastifyRequest, reply: FastifyReply) {
    const user = req.body as User
    const { username_user, password_user, confpass } = user

    if (!username_user || !password_user || !confpass) {
        return reply.status(400).send({ message: "Preencha os campos vazios" })
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
        return reply.status(400).send({ message: "Preencha os campos vazios" })
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
    return reply.status(200).send({ token })
}

export async function getToken(req: FastifyRequest, reply: FastifyReply) {
    try {
        return reply.status(200).send(req.user)
    } catch (err) {
        return reply.status(500)
    }
}
