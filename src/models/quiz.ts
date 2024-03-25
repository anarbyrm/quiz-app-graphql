import * as mongoose from "mongoose";

import {
    ITopic,
    IAnswer,
    IQuestion,
    TopicModel,
    AnswerModel,
    QuestionModel
} from "../interfaces/models";


const topicSchema = new mongoose.Schema<ITopic, TopicModel>({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

const answerSchema = new mongoose.Schema<IAnswer, AnswerModel>({
    body: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    }
})

const questionSchema = new mongoose.Schema<IQuestion, QuestionModel>({
    body: {
        type: String,
        required: true
    },
    topics: [{
        type: mongoose.Types.ObjectId,
        ref: "Topic"
    }],
    answers: [{
        type: mongoose.Types.ObjectId,
        ref: "Answer"
    }]
})


const Topic = mongoose.model<ITopic, TopicModel>("Topic", topicSchema);
const Answer = mongoose.model<IAnswer, AnswerModel>("Answer", answerSchema);
const Question = mongoose.model<IQuestion, QuestionModel>("Question", questionSchema);


export {
    Topic,
    Answer,
    Question
}

