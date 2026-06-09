import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class DeleteTask {

  // Recebe o repositório pelo construtor - inversão de dependência
  constructor(private repository: ITaskRepository) {}

  async execute(id: string){
    return await this.repository.delete(id);
  } 
}