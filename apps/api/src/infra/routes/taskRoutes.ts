// ============================================================
// taskRoutes.ts
// Define as rotas HTTP do recurso Task e aponta para o controller
// Camada: infra — conhece o Express e o controller
// ============================================================

import { Router } from "express"
import { TaskController } from "../controllers/TaskController"

// Router é um mini-app do Express que agrupa rotas de um mesmo recurso
// Em vez de definir tudo no server.ts, cada recurso tem seu próprio arquivo de rotas
const router = Router()
const controller = new TaskController()

// .bind(controller) garante que o "this" dentro de cada método
// continue apontando para a instância do controller
// sem o bind, o Express chamaria o método sem contexto e o "this" seria undefined

router.post('/', controller.create.bind(controller))       // POST   /tasks
router.get('/', controller.getAll.bind(controller))        // GET    /tasks
router.get('/:id', controller.getById.bind(controller))    // GET    /tasks/:id
router.put('/:id', controller.update.bind(controller))     // PUT    /tasks/:id
router.delete('/:id', controller.delete.bind(controller))  // DELETE /tasks/:id

// exportado como default para ser importado no server.ts
// registrado com: app.use('/tasks', router)
// o prefixo '/tasks' é adicionado automaticamente a todas as rotas acima
export default router