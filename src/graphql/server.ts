import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { QuizDataSource } from "./dataSources/quiz";


export const startApolloServer = async (port: number) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port },
        context: async () => {
            const quizDS = new QuizDataSource();
            return { dataSource: { quizDS } }
        }
    });

    return url;
}

