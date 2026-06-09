import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class GetTaskById {

  // Recebe o repositório pelo construtor - inversão de dependência
  constructor(private repository: ITaskRepository) {}

  async execute(id: string){
    return await this.repository.findById(id);
  } 
}