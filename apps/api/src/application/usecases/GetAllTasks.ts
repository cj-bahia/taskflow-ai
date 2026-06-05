// ===================================================================
// GetAllTasks.ts
// Use case: busca todas as tasks do sistema
// Camada: application - orquestra a ação, não sabe detalhes do banco
// ===================================================================

import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class GetAllTasks {

  // Recebe o repositório pelo construtor - inversão de dependência
  // Não instancia o repositório aqui, quem chama decide qual usar
  constructor(private repository: ITaskRepository) {}

  // Executa o caso de uso - delega a busca para o repositório
  async execute(){
    return await this.repository.findAll();
  }
}