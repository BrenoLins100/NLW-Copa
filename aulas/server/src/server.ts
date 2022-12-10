import Fastify from 'fastify';
import cors from "@fastify/cors" 
import jwt from "@fastify/jwt";


import { poolRoutes } from './routes/pool';
import { authRoutes } from './routes/auth';
import { gameRoutes } from './routes/game';
import { guessRoutes } from './routes/guess';
import { userRoutes } from './routes/user';

//singleton -> fazer com que uma informação seja reaproveitada



async function bootstrap(){
    const fastify = Fastify({
        //soltar logs para monitorar os problemas
        logger:true
    }); 

    await fastify.register(cors,{
        origin: true,
    })

    //em produção isso precisa ser uma variavel ambiente
    await fastify.register(jwt,{
       secret: 'nlwcopa'
    })

    //Rota para a contagem de bolões, em inglês é algo como pools

    //http://localhost:3333/pools/count

    //importando rotas
    await fastify.register(poolRoutes)
    await fastify.register(authRoutes)
    await fastify.register(gameRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(userRoutes )

    



    await fastify.listen ({port: 3333, host: '0.0.0.0'})
}

bootstrap()

