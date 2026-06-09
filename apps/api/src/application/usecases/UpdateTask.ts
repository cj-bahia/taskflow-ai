import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class UpdateTask {

  // Recebe o repositório pelo construtor - inversão de dependência
  constructor(private repository: ITaskRepository) {}

  async execute(id: string, data: Partial<Task>){
    return await this.repository.update(id, data);
  } 
}