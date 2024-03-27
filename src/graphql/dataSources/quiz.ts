import mongoose from "mongoose";
import { Question, Answer, Topic } from "../../models/quiz";
import { IQuestionArgs, IQuestionInput } from "../../interfaces/quiz";


export class QuizDataSource {
    async getQuestions(args: IQuestionArgs) {

        let questions = Question.find();

        let { query: { search } } = args;

        if (search) {
            questions = questions.find({ body: { $regex: search, $options: 'i' } });
        }

        // pagination
        let { limit = 10, offset = 0 } = args;

        questions.limit(limit).skip(offset);

        return await questions.populate('answers topics');
    }

    async getOneQuestion(id: string) {
        return await Question.findById(id).populate('answers topics');
    }

    async createQuestion(input: IQuestionInput) {
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

    async deleteQuestion(id: string) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {

            const existingQuestion = await Question.findById(id);

            if (!existingQuestion) {
                throw new Error(`Question with id ${id} does not exist.`);
            }

            // delete all answers related to question
            const deletedAnswers = Answer.deleteMany({ _id: { $in: existingQuestion.answers } }).session(session);

            const question = await existingQuestion.populate("answers topics");

            // execute both promises simultaneously
            await Promise.all([ deletedAnswers, question.deleteOne({ session: session }) ]);

            await session.commitTransaction();
            return question;

        } catch (err) {
            session.abortTransaction();
            throw err;

        } finally {
            session.endSession();
        }
    }

    async updateQuestion(id: string, input: IQuestionInput) {
        const existingQuestion = await Question.findById(id);

        if (!existingQuestion) {
            throw new Error(`Question with id ${id} does not exist.`);
        }

        const question = await existingQuestion.updateOne({ body: input.body }).populate("answers topics");

        return question;
    }
}