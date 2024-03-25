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
