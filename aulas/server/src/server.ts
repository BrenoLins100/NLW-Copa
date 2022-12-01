import Fastify from 'fastify';
import {PrismaClient} from '@prisma/client'
import cors from "@fastify/cors"

const prisma = new PrismaClient({
    log: ['query'],
})

async function bootstrap(){
    const fastify = Fastify({
        //soltar logs para monitorar os problemas
        logger:true
    });

    await fastify.register(cors,{
        origin: true,
    })

    //Rota para a contagem de bolões, em inglês é algo como pools

    //http://localhost:3333/pools/count

    fastify.get('/pools/count', async()=>{
        const count = await prisma.pool.count()
        return {count}
    })

    await fastify.listen ({port: 3333, /*host: '0.0.0.0'*/})
}

bootstrap()

