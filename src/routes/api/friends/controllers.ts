import { RequestHandler } from 'express'

import Users from '@models/users'

export const getAllController: RequestHandler = async ({ user: { id } }, res) => {
  try {
    const doc = await Users
      .findById(id)
      .populate({ path: 'friends', select: 'name profileImage' })
      .select('friends')
    res.status(200).json(doc && doc.friends)
  } catch (err) {
    res.status(500).json(err)
  }
}
