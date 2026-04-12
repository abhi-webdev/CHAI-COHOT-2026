import dotenv from "dotenv"
import app from "./src/app.js";
import connectDB from "./src/common/config/db.js";
dotenv.config()

const port = process.env.PORT || 4000;

const start = async () => {
    // connect db
    await connectDB()
    app.listen(port, () => {
        console.log(`server is running on port http://localhost:${port} in ${process.env.NODE_ENV} mode`);
    })
}

start().catch((err) => {
    console.log("Error in server file");
    process.exit(1)
})


