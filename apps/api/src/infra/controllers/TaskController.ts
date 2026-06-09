// ============================================================
// TaskController.ts
// Camada: infra — recebe requisições HTTP, chama os use cases e responde
// É o ponto de entrada HTTP da aplicação
// ============================================================

import { CreateTask } from "../../application/usecases/CreateTask"
import { DeleteTask } from "../../application/usecases/DeleteTask"
import { GetAllTasks } from "../../application/usecases/GetAllTasks"
import { GetTaskById } from "../../application/usecases/GetTaskById"
import { UpdateTask } from "../../application/usecases/UpdateTask"
import { TaskRepository } from "../repositories/TaskRepository"
import { Request, Response } from "express"

// Repositório instanciado fora da classe — compartilhado entre todos os métodos
// Evita criar uma nova instância a cada requisição
const repository = new TaskRepository()

export class TaskController {

  // POST /tasks — cria uma nova task
  async create(req: Request, res: Response) {
    try {
      // Extrai os dados enviados no corpo da requisição
      const { title, status, priority, userId, description } = req.body
      const useCase = new CreateTask(repository)
      const task = await useCase.execute({ title, status, priority, userId, description })

      // 201 Created — recurso foi criado com sucesso
      return res.status(201).json(task)
    } catch (error) {
      // 500 — erro inesperado no servidor
      console.error('CREATE ERROR:', error) //! Teste temporário
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // GET /tasks — retorna todas as tasks
  async getAll(req: Request, res: Response) {
    try {
      const useCase = new GetAllTasks(repository)
      const task = await useCase.execute()

      res.status(200).json(task)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })    
    }
  }

  // GET /tasks/:id — retorna uma task pelo id
  async getById(req: Request, res: Response) {
    try {
      // O id vem da URL: /tasks/123 → req.params.id = "123"
      const id = req.params.id as string

      const useCase = new GetTaskById(repository)
      const task = await useCase.execute(id)

      // Se o repositório retornou null, a task não existe
      if (!task)
        return res.status(404).json({ error: 'Task not found' })

      res.status(200).json(task)
    } catch (error) {
      // 500 — erro inesperado no servidor
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // PUT /tasks/:id — atualiza os campos informados de uma task
  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string

      // req.body contém só os campos que o cliente quer atualizar
      // Partial<Task> permite passar qualquer subconjunto dos campos
      const useCase = new UpdateTask(repository)
      const task = await useCase.execute(id, req.body)

      res.status(200).json(task)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // DELETE /tasks/:id — deleta uma task pelo id
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string
      const useCase = new DeleteTask(repository)
      await useCase.execute(id) // void — não retorna a task deletada

      // Confirma que a operação foi executada com sucesso
      res.status(200).json({ message: 'Task deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}