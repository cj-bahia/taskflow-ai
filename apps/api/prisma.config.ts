// ====================================================================
// prisma.config.ts
// Configuração da CLI do Prisma (migrate, studio, generate)
// Este arquivo é lido APENAS pelos comandos do Prisma, não em runtime
// ====================================================================

import "dotenv/config"; //carrega o .env para que process.env funcione
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",     // onde está o schema com os models
  migrations: {
    path: "prisma/migrations",        // onde as migrations serão salvas
  },
  datasource: {
    url: process.env["DATABASE_URL"], // URL de conexão lida do .env
  },
});
