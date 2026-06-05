// ==============================================================
// Task.ts
// Entidade de domínio - representa o que é uma Task no sistema
// Camada: domain -  TypeScript puro, zero dependências externas
// ==============================================================

// Valores possíveis para o status de uma task
export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE'

// Valores possíveis para a prioridade de uma task
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH'

export class Task {
  readonly id: string     // imutável - id nunca muda após criado
  title: string
  status: Status
  priority: Priority
  userId: string          // referência ao usuário dono da task
  createdAt: Date
  updatedAt: Date
  description?: string    // opcional - pode ser undefined
  

  // Construtor recebe todos os campos e os atribui à instância
  // description vai por último por ser opcional
  constructor(
    id: string,
    title: string,
    status: Status,
    priority: Priority,
    userId: string,
    createdAt: Date,
    updatedAt: Date,
    description?: string
  ){
    this.id = id
    this.title = title
    this.status = status
    this.priority = priority
    this.userId = userId
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.description = description
  }
}