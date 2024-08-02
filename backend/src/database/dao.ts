import bcrypt from "bcrypt"
import {  MySQLPromiseConnection, MySQLRowDataPacket } from "@fastify/mysql"
import { User } from "../types"

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