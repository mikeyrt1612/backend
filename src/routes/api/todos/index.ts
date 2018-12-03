import { Router } from 'express'
import * as ctrl from './controllers'

const router = Router()

router.get('/', ctrl.getAllController)
router.post('/', ctrl.addOneController)
router.delete('/:id', ctrl.deleteOneController)
router.post('/send', ctrl.sendOneController)

export default router
