import mongoose from 'mongoose'

export interface ITodoSchema extends mongoose.Document {
  message: string,
}

const todoSchema = new mongoose.Schema({
  message: String,
})

export default mongoose.model<ITodoSchema>('Todo', todoSchema)
