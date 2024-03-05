import { Schema, models, model, Document } from "mongoose";

export interface IQuestion extends Document {
  title: string;
  content: string;
  tags: Schema.Types.ObjectId[];
  views: number;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  answers: Schema.Types.ObjectId[];
  createAt: Date;
}


const QuestionSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    tags: [{type: Schema.Types.ObjectId, ref: 'Tgs' }],
    views: {type: Number, default: 0},
    upvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    downvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    author: [{type: Schema.Types.ObjectId, ref: 'User'}],
    answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
    createAt: {type: Date, default: Date.now},
  },
})

const Question = models.Question || model('Question', QuestionSchema);

export default Question;