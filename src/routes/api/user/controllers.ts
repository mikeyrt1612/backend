import { RequestHandler } from 'express'

import Users from '@models/users'

export const getController: RequestHandler = async ({ user: { id } }, res) => {
  try {
    const doc = await Users
      .findById(id)
      .select('name profileImage')
      .exec()
    res.status(200).json(doc)
  } catch (err) {
    res.status(500).json(err)
  }
}
