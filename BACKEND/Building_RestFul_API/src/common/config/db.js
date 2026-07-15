
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        if (conn) {
            console.log("MongoDb Connected Successfully ✅");
        }
    } catch (error) {
        console.log("Connection failed ❌", error);
        process.exit(1);
    }
}

export default connectDB;