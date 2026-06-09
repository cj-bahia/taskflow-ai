// ===================================================================
// DeleteTask.ts
// Use case: deleta uma task no sistema
// Camada: application - orquestra a ação, não sabe detalhes do banco
// ===================================================================

import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class DeleteTask {

  // Recebe o repositório pelo construtor - inversão de dependência
  constructor(private repository: ITaskRepository) {}

  // Executa o caso de uso - recebe o id da task e delega o delete no repositório
  async execute(id: string){
    return await this.repository.delete(id);
  } 
}