import * as mongoose from "mongoose";

export const connectDB = async (uri: string) => {
    await mongoose.connect(uri);
    console.log('MongoDB is up and running... 🚀🚀🚀');
}
