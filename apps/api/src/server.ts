// =================================================================
// server.ts
// Ponto de entrada da aplicação - cria e configura o servidor HTTP
// =================================================================

import 'dotenv/config'; // deve ser o primeiro import - carrega o .env
import express, { Request, Response } from 'express';

const app = express();                  // instância principal do Express
const PORT = process.env.PORT || 3000;  // porta lida do .env com fallback para 3000

app.use(express.json());                // permite receber JSON no corpo das requisições

// rota de health check - usada para verificar se o servidor está online
// não faz nenhuma lógica de negócio, só confirma que a APÌ está respondendo
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status:'ok',
    message: 'TaskFlow AI API is running',
    timestamp: new Date().toISOString(),
  });
})

// inicia o servidor e fica "ouvindo" requisições na porta definida
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
})

export default app;