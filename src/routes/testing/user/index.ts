import { Router } from 'express'
import * as ctrl from './controllers'

const router = Router()

router.post('/', ctrl.addOneController)
router.delete('/:username', ctrl.deleteOneController)

export default router
