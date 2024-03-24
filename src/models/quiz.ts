import * as mongoose from "mongoose";

interface ITopic {
    name: string
}

interface IAnswer {
    body: string
    isCorrect: boolean
}

interface IQuestion {
    body: string;
    topics: ITopic[];
    answers: IAnswer[];
}

const topicSchema = new mongoose.Schema<ITopic>({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

const answerSchema = new mongoose.Schema<IAnswer>({
    body: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    }
})

const questionSchema = new mongoose.Schema<IQuestion>({
    body: {
        type: String,
        required: true,
        unique: true
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


const Topic = mongoose.model<ITopic>("Topic", topicSchema);
const Answer = mongoose.model<IAnswer>("Answer", answerSchema);
const Question = mongoose.model<IQuestion>("Question", questionSchema);


export {
    Topic,
    Answer,
    Question
}

