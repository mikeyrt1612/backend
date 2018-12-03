import { RequestHandler } from 'express'

import Users from '@models/users'
import Todos from '@models/todos'

export const addOneController: RequestHandler = async ({ body: { username } }, res) => {
  try {
    const testUserFriend = new Users({
      username: `${username}_friend`,
      password: 'password',
      name: {
        first: 'Han',
        last: 'Solo',
      },
      profileImage: 'https://i.imgur.com/X3MfY8T.png',
    })
    const { _id } = await testUserFriend.save()

    const testUser = new Users({
      username,
      password: 'password',
      name: {
        first: 'Luke',
        last: 'Skywalker',
      },
      profileImage: 'https://i.imgur.com/gwy9tVn.png',
      friends: [_id],
    })
    await testUser.save()

    res.sendStatus(200)
  } catch (err) {
    res.status(500).json(err)
  }
}

export const deleteOneController: RequestHandler = async ({ params: { username } }, res) => {
  try {
    const testUser = await Users
      .findOneAndRemove({ username })
      .select('todos')
      .exec()

    if (testUser) {
      const { todos } = testUser
      await Promise.all(todos.map(id => Todos.findByIdAndRemove(id).exec()))
    }

    const testUserFriend = await Users
      .findOneAndRemove({ username: `${username}_friend` })
      .select('todos')
      .exec()

    if (testUserFriend) {
      const { todos } = testUserFriend
      await Promise.all(todos.map(id => Todos.findByIdAndRemove(id).exec()))
    }
    res.sendStatus(200)
  } catch (err) {
    res.status(500).json(err)
  }
}
