import { IQuestionInput } from "../interfaces/quiz"
import { QuizDataSource } from "./dataSources/quiz";


export const resolvers = {
    Query: {
        questions: async (
            _: undefined, 
            __: undefined, 
            { dataSource }: { dataSource: { quizDS: QuizDataSource} }) => {
            return await dataSource.quizDS.getQuestions();
        },
        question: async (
            _: undefined, 
            { id }: { id: string }, 
            { dataSource }: { dataSource: { quizDS: QuizDataSource} }
        ) => {
            return await dataSource.quizDS.getOneQuestion(id);
        }
    },
    Mutation: {
        createQuestion: async (
            _: undefined, 
            { input }: { input: IQuestionInput }, 
            { dataSource }: { dataSource: { quizDS: QuizDataSource} }
        ) => {
            return await dataSource.quizDS.createQuestion(input);
        }
    }
}
