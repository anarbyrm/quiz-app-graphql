import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

const startApolloServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    const { url } = await startStandaloneServer(server);
    console.log(`Server is running... You can access the server on: ${url}`);
}

export default startApolloServer;
