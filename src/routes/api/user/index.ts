import { Router } from 'express'
import * as ctrl from './controllers'

const router = Router()

router.get('/', ctrl.getController)

export default router
