import Users, { IHistoryItem } from '@models/users'

export const registerHistory = (id: string, history: IHistoryItem) =>
  Users.findByIdAndUpdate(id, { $push: { history } })
