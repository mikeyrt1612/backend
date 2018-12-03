import mongoose from 'mongoose'

export interface IHistoryItem {
  actionType: 'CREATED' | 'DELETED' | 'SENT' | 'RECEIVED',
  instigator: mongoose.Schema.Types.ObjectId,
  todo: mongoose.Schema.Types.ObjectId,
}

export interface IUserSchema extends mongoose.Document {
  name: {
    first: string,
    last: string,
  },
  password: string,
  profileImage: string,
  todos: Array<mongoose.Schema.Types.ObjectId>,
  friends: Array<mongoose.Schema.Types.ObjectId>,
  history: Array<IHistoryItem>,
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      first: {
        type: String,
        required: true,
      },
      last: {
        type: String,
        required: true,
      },
    },
    profileImage: String,
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    history: [{
      actionType: {
        type: String,
        enum: ['CREATED', 'DELETED', 'SENT', 'RECEIVED'],
      },
      instigator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      todo: { type: mongoose.Schema.Types.ObjectId, ref: 'Todo' },
      created: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  {
    id: false, // https://github.com/Automattic/mongoose/issues/1137
    toJSON: {
      virtuals: true,
    },
  },
)

userSchema.virtual('name.full').get(function () {
  // @ts-ignore: Doesn't seem to be support for 'this' in this context...
  return `${this.name.first} ${this.name.last}`
})

export default mongoose.model<IUserSchema>('User', userSchema)
