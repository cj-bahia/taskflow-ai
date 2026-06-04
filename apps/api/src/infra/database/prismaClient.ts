// =================================================================
// prismaClient.ts
// Cria e exporta a instância do Prisma para uso em todo o projeto
// =================================================================

import { PrismaClient } from '@prisma/client';  // cliente do Prisma
import { PrismaPg } from '@prisma/adapter-pg'   // adapter que conecta o Prisma ao PostgreSQL
import 'dotenv/config';                         // carrega as variáveis do .env

// globalThis é o objeto global do Node.js
// estamos dizendo ao TypeScript que ele pode ter uma propriedade "prisma"
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// adapter é o "tradutor" entre Prisma e o driver nativo do PostgreSQL
// ele recebe a URL de conexão do .env
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })


// '??' significa: se o lado esquerdo for null ou undefined, usa lado direito
// ou seja: se já existe uma instância salva no global, reutiliza ela
// se não existe, cria uma nova passando o adapter
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

// em desenvolvimento, o nodemon reinicia o servidor a cada save.
// sem isso, cada reinicio criaria uma nova conexão com o banco - o que esgotaria o pool
// salvando no globalThis, garantimos que só existe uma instância durante a execução
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}