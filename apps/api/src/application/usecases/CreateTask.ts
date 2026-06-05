// ===================================================================
// CreateTask.ts
// Use case: cria uma nova task no sistema
// Camada: application - orquestra a ação, não sabe detalhes do banco
// ===================================================================

import { Priority, Status } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class CreateTask {

  // Recebe o repositório pelo construtor - inversão de dependência
  constructor(private repository: ITaskRepository) {}

  // Executa o caso de uso - recebe os dados e delega a criação para o repositório
  async execute(data: {
    title: string;
    status: Status;
    priority: Priority;
    userId: string;
    description?: string
  }){
    return await this.repository.create(data)
  } 
}