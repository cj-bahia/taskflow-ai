// ===================================================================
// UpdateTask.ts
// Use case: atualiza uma task no sistema
// Camada: application - orquestra a ação, não sabe detalhes do banco
// ===================================================================

import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class UpdateTask {

  // Recebe o repositório pelo construtor - inversão de dependência
  constructor(private repository: ITaskRepository) {}
  
  // Executa o caso de uso - recebe os dados para alteração e delega a edição para o repositório
  async execute(id: string, data: Partial<Task>){
    return await this.repository.update(id, data);
  } 
}