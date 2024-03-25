export const typeDefs = `#graphql
    type Query {
        questions: [Question]!
        question(id: ID!): Question!
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