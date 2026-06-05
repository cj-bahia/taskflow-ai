// =============================================================
// TaskRepository.ts
// Implementação concreta do repositório de tasks usando Prisma
// Camada: infra - única camada que conhece o banco de dados
// =============================================================

import { prisma } from "../database/prismaClient";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import { Priority, Status, Task } from "../../domain/entities/Task";


export class TaskRepository implements ITaskRepository {

  //Cria uma nova task no banco e retorna ela com os campos gerados
  async create(data: {
    title: string,
    status: Status,
    priority: Priority,
    userId: string,
    description?: string
  }): Promise<Task> {
    const task = await prisma.task.create({
      data: {
            title: data.title,
            status: data.status,
            priority: data.priority,
            userId: data.userId,
            description: data.description
      }
    })
    
    //Prisma retorna null para campos vazios, mas nossa entidade usa undefined
    // '??' undefined converte null -> undefined
    return {
      ...task,
      description: task.description ?? undefined
    }
  }

  // Busca todas as tasks do banco
  async findAll(): Promise<Task[]> {
    const tasks = await prisma.task.findMany()

    // .map() percorre o array e converte cada task, tratando o null do description
    return tasks.map(task => ({
      ...task,
      description: task.description ?? undefined
    }))
  }

  // Busca uma task pelo id - retorna null se não encontrar
  async findById(id: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: {id}
    })

    // Se não encontrou nada, retorna null imediatamente
    if (!task) return null

    return {
      ...task,
      description: task.description ?? undefined
    }
  }

  // Atualiza os campos informados de uma task - Partial<Task> permite passar só o que mudou
  async update(id: string, data: Partial<Task>): Promise<Task> {
    const task = await prisma.task.update({ where: {id}, data }) // data passa os campos que chegaram, o Prisma ignora os ausentes
    
    return {
      ...task,
      description: task.description ?? undefined
    }
  }

  // Deleta uma task pelo id - não retorna nada (void)
  async delete(id: string): Promise<void>{
    await prisma.task.delete({ where: {id}})
  }
}