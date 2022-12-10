import { PrismaClient } from "@prisma/client";

//exportanto conexao para usar em outros arquivos
 export const prisma = new PrismaClient({
    log: ['query'],
})