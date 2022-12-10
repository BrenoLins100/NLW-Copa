import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

//plugins fastify
export async function authRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/me",
    {
      onRequest: [authenticate],
    },
    async (request) => {
      //verifica se existe um jwt no header da requisicao

      //await request.jwtVerify()
      return { user: request.user };
    }
  );

  //criando sessao de login
  fastify.post("/users", async (request) => {
    //validando entrada de dados no backend
    const createUserBody = z.object({
      access_token: z.string(),
    });
    const { access_token } = createUserBody.parse(request.body);

    //comunicando com a API do Google
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userData = await userResponse.json();

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    });

    const userInfo = userInfoSchema.parse(userData);

    //verificando se o usuário ja existe
    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
        },
      });
    }

    const token = fastify.jwt.sign(
      {
        //payload: informacoes que ficam no hash
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        //quem gerou o token:
        sub: user.id,
        expiresIn: "7 days", //estudar refresh token se nao quiser deslogar
      }
    );

    return { token };
  });
}
