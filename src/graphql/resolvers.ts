import mongoose, { ObjectId } from "mongoose";

import { Answer, Question, Topic } from "../models/quiz"
import { IQuestionInput } from "../interfaces/quiz"


export const resolvers = {
    Query: {
        questions: async () => {
            return await Question.find().populate('answers topics');
        },
        question: async (_: undefined, { id }: { id: ObjectId }) => {
            return await Question.findById(id).populate('answers topics');
        }
    },
    Mutation: {
        createQuestion: async (_: undefined, { input }: { input: IQuestionInput }) => {
            const session = await mongoose.startSession();
            session.startTransaction();

            try {

                const answers = input.answers;
                const topics = input.topics;

                // check for answer number for question created
                // if it is not 4 throw an Error.
                if (answers.length !== 4) {
                    throw new Error("Number of answers for each question should be exactly 4.");
                }
                
                // check if one correct answer exists for the question
                // and it is not more or less.
                const correctAnswers = answers.filter((answer) => answer.isCorrect === true);
                if (correctAnswers.length !== 1) {
                    throw new Error ("Question should have 1 and only correct answer.");
                }
                
                // check if topics are provided
                if (topics.length < 1) {
                    throw new Error("At least one topic should be provided.");
                }

                const options = { session }

                // create answer and topic objects before creating question object
                const createdAnswers = await Answer.create(answers, options);

                const createdTopics = [];
                for (let topic of topics) {
                    const topicName = topic.name.trim().toLowerCase();
                    const existingTopic = await Topic.findOne({ name: topicName });

                    if (existingTopic) {
                        createdTopics.push(existingTopic._id);
                    } else {
                        const [newTopic] = await Topic.create([{ name: topicName }], options)
                        createdTopics.push(newTopic._id);
                    }
                }

                const [question] = await Question.create([{
                    body: input.body,
                    answers: createdAnswers.map((obj) => obj._id),
                    topics: createdTopics
                }], options);

                // if no error occurs commit the transaction
                await session.commitTransaction();
                return await question.populate("answers topics");

            } catch (err) {
                // if there is an error rollback the transaction
                await session.abortTransaction();
                throw err;

            } finally {
                await session.endSession();
            }
        }
    }
}
