import { IQuestionArgs, IQuestionInput, IQuizContextValue } from "../interfaces/quiz"


export const resolvers = {
    Query: {
        questions: async (
            _: undefined, 
            args: IQuestionArgs, 
            { dataSource }: IQuizContextValue
        ) => {
            return await dataSource.quizDS.getQuestions(args);
        },
        question: async (
            _: undefined, 
            { id }: { id: string }, 
            { dataSource }: IQuizContextValue
        ) => {
            return await dataSource.quizDS.getOneQuestion(id);
        }
    },
    Mutation: {
        createQuestion: async (
            _: undefined, 
            { input }: { input: IQuestionInput }, 
            { dataSource }: IQuizContextValue
        ) => {
            return await dataSource.quizDS.createQuestion(input);
        },
        deleteQuestion: async (
            _: undefined, 
            { id }: { id: string},
            { dataSource }: IQuizContextValue  
        ) => {
            return await dataSource.quizDS.deleteQuestion(id);
        },
        updateQuestion: async (
            _: undefined, 
            { id, input }: { id: string, input: IQuestionInput },
            { dataSource }: IQuizContextValue
        ) => {
            return await dataSource.quizDS.updateQuestion(id, input);
        }
    }
}
