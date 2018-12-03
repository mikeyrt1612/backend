import { Router } from 'express'
import todosRouter from './todos'
import userRouter from './user'
import friendsRouter from './friends'
import historyRouter from './history'

const apiRouter = Router()

apiRouter.use('/todos', todosRouter)
apiRouter.use('/user', userRouter)
apiRouter.use('/friends', friendsRouter)
apiRouter.use('/history', historyRouter)

export default apiRouter
