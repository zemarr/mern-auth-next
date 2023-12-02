import mongoose from "mongoose"

export const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })
        connection.on('error', (error) => {
            console.log('Connection error. Make sure mongoDB is running' + error);
            process.exit()
        })
    } catch (error) {
        console.log(error);
        console.log('Something went wrong');
    }
}