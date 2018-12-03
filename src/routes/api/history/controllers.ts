import { RequestHandler } from 'express'

import Users from '@models/users'

export const getAllController: RequestHandler = async ({ user: { id } }, res) => {
  try {
    const doc = await Users
      .findById(id)
      .populate('history.instigator', 'name')
      .select('history')
      .exec()
    res.status(200).json(doc && doc.history.reverse())
  } catch (err) {
    res.status(500).json(err)
  }
}
