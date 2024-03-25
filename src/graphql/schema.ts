export const typeDefs = `#graphql
    type Query {
        questions: [Question]!
        question(id: ID!): Question!
    }

    type Mutation {
        createQuestion(input: QuestionInput!): Question!
        deleteQuestion(id: ID!): Question!
        updateQuestion(id: ID!, input: QuestionInput!): Question!
    }

    input QuestionInput {
        body: String!
        answers: [AnswerInput!]!
        topics: [TopicInput!]!
    }

    input AnswerInput {
        body: String!
        isCorrect: Boolean!
    }

    input TopicInput {
        name: String!
    }

    type Question {
        _id: ID!
        body: String!
        topics: [Topic]!
        answers: [Answer]!
    }

    type Topic {
        _id: ID! 
        name: String!
    }

    type Answer {
        _id: ID!
        body: String!
        isCorrect: Boolean
    }
`