import fastify from 'fastify'
import multipartPlugin from './plugins/multipart'
import staticPlugin from "./plugins/static"
import mysqlPlugin from "./plugins/mysql"
import jwtPlugin from "./plugins/jwt"
import routes from './routes/routes'

const server = fastify({ logger: true })

server.register(mysqlPlugin)
server.register(jwtPlugin)
server.register(multipartPlugin)
server.register(staticPlugin)
server.register(routes)

async function start() {
    try {
        await server.listen({ port: 8080 })
        console.log('Iniciando servidor na porta 8080')
    } catch(err) {
        console.log(err)
    }
}
    
start()