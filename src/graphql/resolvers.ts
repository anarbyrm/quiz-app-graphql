import { ObjectId } from "mongoose";
import { Answer, Question } from "../models/quiz"


export const resolvers = {
    Query: {
        questions: async () => {
            return await Question.find().populate('answers topics');
        },
        question: async (_: undefined, { id }: { id: ObjectId }) => {
            return await Question.findById(id).populate('answers topics');
        }
    }
}
