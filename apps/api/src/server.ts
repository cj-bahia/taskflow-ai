import express, { Request, Response } from 'express'; // Importando express

const app = express(); // Criando uma instância do express
const PORT = process.env.PORT || 3000; // Definindo a porta que o servidor vai usar

app.use(express.json()); // Habilitando o uso de JSON no corpo das requisições

app.get('/health', (req: Request, res: Response) => { // Definindo uma rota para o endpoint /health
  res.status(200).json({ // Respondendo com um status 200 e um JSON
    status:'ok',
    message: 'TaskFlow AI API is running',
    timestamp: new Date().toISOString()
  });
})

app.listen(PORT, () => { // Iniciando o servidor
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
})

export default app;