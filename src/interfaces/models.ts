import { Model } from "mongoose"; 

interface ITopic {
    name: string;
}

interface IAnswer {
    body: string;
    isCorrect: boolean;
}

interface IQuestion {
    body: string;
    topics: ITopic[];
    answers: IAnswer[];
}

type TopicModel = Model<ITopic>;
type AnswerModel = Model<IAnswer>;
type QuestionModel = Model<IQuestion>;

export {
    ITopic,
    IAnswer,
    IQuestion,
    TopicModel,
    AnswerModel,
    QuestionModel
}