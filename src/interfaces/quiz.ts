import { QuizDataSource } from "../graphql/dataSources/quiz";

export interface IQuestionInput {
    body: string;
    answers: IAnswerInput[]; 
    topics: ITopicInput[];
}

export interface IAnswerInput {
    body: string;
    isCorrect: boolean;
}

export interface ITopicInput {
    name: string;
}

export interface IQuizContextValue {
    dataSource: {
        quizDS: QuizDataSource
    }
}

interface Params {
    search?: string;
}

export interface IQuestionArgs {
    limit?: number;
    offset?: number;
    query?: Params;
}