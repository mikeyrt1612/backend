import { RequestHandler } from 'express'

import Users from '@models/users'
import { registerHistory } from '@api/history/register'
import Todos from '@models/todos'

export const getAllController: RequestHandler = async ({ user: { id } }, res) => {
  try {
    const doc = await Users
      .findById(id)
      .populate('todos')
      .select('todos')
      .exec()
    res.status(200).json(doc && doc.todos)
  } catch (err) {
    res.status(500).json(err)
  }
}

export const deleteOneController: RequestHandler = async ({ user, params }, res) => {
  try {
    await Users.findByIdAndUpdate(user.id, { $pullAll: { todos: [params.id] } })
    await Todos.findByIdAndRemove(params.id)

    await registerHistory(user.id, {
      actionType: 'DELETED',
      instigator: user.id,
      todo: params.id,
    })

    res.sendStatus(200)
  } catch (err) {
    res.status(500).json(err)
  }
}

export const addOneController: RequestHandler =
  async ({ user: { id }, body: { message } }, res) => {
    try {
      const newTodo = new Todos({ message })
      const { _id } = await newTodo.save()
      await Users.findByIdAndUpdate(id, { $push: { todos: _id } })

      await registerHistory(id, {
        actionType: 'CREATED',
        instigator: id,
        todo: _id,
      })

      res.sendStatus(200)
    } catch (err) {
      res.status(500).json(err)
    }
  }

export const sendOneController: RequestHandler =
  async ({ user: { id }, body: { todoId, recipientId } }, res) => {
    try {
      await Users.findByIdAndUpdate(id, { $pullAll: { todos: [todoId] } })
      await Users.findByIdAndUpdate(recipientId, { $push: { todos: todoId } })

      await registerHistory(id, {
        actionType: 'SENT',
        instigator: recipientId,
        todo: todoId,
      })
      await registerHistory(recipientId, {
        actionType: 'RECEIVED',
        instigator: id,
        todo: todoId,
      })

      res.sendStatus(200)
    } catch (err) {
      res.status(500).json(err)
    }
  }
