import bcrypt from "bcrypt"
import {  MySQLPromiseConnection, MySQLRowDataPacket } from "@fastify/mysql"
import { User, File } from "../types"

export async function mysqlCreateUser(con: MySQLPromiseConnection, user: User) {
    const { username_user, password_user } = user

    const sql = "INSERT INTO user SET ?"
    const hashedPassword = await bcrypt.hash(password_user, 10)
    await con.query(sql, { username_user, password_user: hashedPassword })
} 

export async function mysqlGetUser(con: MySQLPromiseConnection, user: User) {
    const { username_user, password_user } = user

    const sql = "SELECT id_user, username_user, password_user FROM user WHERE username_user = ?"
    const [rows] = await con.query<MySQLRowDataPacket[]>(sql, username_user)
    return rows
}

export async function mysqlCreateDirFile(con: MySQLPromiseConnection, file: File) {
    const sql = "INSERT INTO file SET ?"
    await con.query(sql, file)
}

export async function mysqlGetFilesByUser(con: MySQLPromiseConnection, id_user: number) {
    const sql = "SELECT * FROM file WHERE id_user = ?"
    const [rows] = await con.query<MySQLRowDataPacket[]>(sql, id_user)
    return rows
}

export async function mysqlGetFileById(con: MySQLPromiseConnection, id_file: number | undefined) {
    const sql = "SELECT filename FROM file WHERE id_file = ?"
    const [rows] = await con.query<MySQLRowDataPacket[]>(sql, id_file)
    return rows
}

export async function mysqlDeleteFile(con: MySQLPromiseConnection, id_file: number | undefined) {
    const sql = "DELETE FROM file WHERE id_file = ?"
    await con.query(sql, id_file)
}
