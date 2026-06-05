// =====================================================================================
// ITaskRepository.ts
// Contrato (interface) que define o que qualquer repositório de tasks deve implementar
// Camada: domain - não conhece Prisma, Express ou qualquer detalhe técnico
// =====================================================================================

import { Task, Status, Priority } from '../entities/Task';

export interface ITaskRepository {

  // Recebe os dados vindos do usuário e retorna a task criada com id e datas gerados
  create(data:{
    title: string;
    status: Status;
    priority: Priority;
    userId: string;
    description?: string // opcional - task pode não ter descrição 
  }): Promise<Task>

  // Retorna todas as tasks
  findAll(): Promise<Task[]>

  // Retorna uma task pelo id, ou null se não existir
  findById(id: string): Promise<Task | null>

  // Atualiza campos de uma task - Partial<Task> permite atualizar só o que mudou
  update(id: string, data: Partial<Task>): Promise<Task>

  // Deleta uma task pelo id - não retorna nada
  delete(id: string): Promise<void>
}