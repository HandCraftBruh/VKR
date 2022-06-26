import dotenv from 'dotenv'
import Fastify from "fastify"
import orderRoutes from './modules/order/order.route.js'
import swagger from '@fastify/swagger'

dotenv.config()
const PORT = process.env.PORT

const server = Fastify({ logger: true }) //вызов конструктора сервера

server.get('/health', async (req, resp) => {
    return { health: "OK" }
})

const main = async () => {

    await server.register(swagger,{
        routePrefix: '/docs',
        swagger: {
          info: {
            title: 'Delivery Service',
            description: 'Delivery Service',
            version: '0.1.0'
          },
          host: 'localhost:8080',
          consumes: ['application/json'],
          produces: ['application/json'],
        },
        exposeRoute: true
      }) 
    server.register(orderRoutes, { prefix: '/orders',  }) //Пути 

    try {
        await server.listen({ port: PORT })
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

main()