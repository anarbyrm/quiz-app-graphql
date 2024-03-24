import * as dotenv from 'dotenv';

import { startApolloServer } from './graphql/server';
import { connectDB } from './utils/db';

dotenv.config();


connectDB(process.env.MONGO_URI)
    .then(() => {
        return startApolloServer(Number(process.env.PORT));
    })
    .then((url) => {
        console.log(`Server is running... You can access the server on: ${url}`);
    })
    .catch((err) => {
        console.log(err);
    });
