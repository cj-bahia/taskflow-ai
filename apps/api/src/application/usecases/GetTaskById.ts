// ===================================================================
// GetTaskById.ts
// Use case: busca uma task pelo id
// Camada: application - orquestra a ação, não sabe detalhes do banco
// ===================================================================

import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class GetTaskById {

  // Recebe o repositório pelo construtor - inversão de dependência
  constructor(private repository: ITaskRepository) {}

  // Executa o caso de uso - recebe o id da task e delega a busca para o repositório
  async execute(id: string){
    return await this.repository.findById(id);
  } 
}