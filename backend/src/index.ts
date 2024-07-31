import fastify from 'fastify'

const server = fastify({ logger: true })

server.get('/', (req, reply) => {
    return reply.send('teste')
})

async function start() {
    try {
        await server.listen({ port: 8080 })
        console.log('Iniciando servidor na porta 8080')
    } catch(err) {
        console.log(err)
    }
}
    
start()