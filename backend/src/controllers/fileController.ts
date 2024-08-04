import fs from "fs"
import path from "path"
import util from "util"
import { FastifyRequest, FastifyReply } from "fastify"
import { pipeline } from "stream"
import { mysqlCreateDirFile, mysqlGetFilesByUser, mysqlGetFileById, mysqlDeleteFile } from "../database/dao"
import { User, File } from "../types"

export async function uploadFile(req: FastifyRequest, reply: FastifyReply) {
    const pump = util.promisify(pipeline)
    const file = await req.file({ limits: { fileSize: 1024 * 1024 * 100 * 50 }, throwFileSizeLimit: true }) //5GB MAX
    
    if (file) {
        try {
            const con = req.server.mysql
            const filename = file?.filename
            const dir_file = `./src/uploads/${filename}`
            const { id_user } = req.user as User
            await pump(file.file, fs.createWriteStream(dir_file))
            await mysqlCreateDirFile(con, { filename, dir_file, id_user })
            return reply.status(200).send({ message: "Upado com sucesso" })
        }
        catch (err: any) {
            return err.code === "EISDIR" ? reply.status(204) : reply.status(500).send(err)
        }
    }
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
        const { filename } = result as File
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
