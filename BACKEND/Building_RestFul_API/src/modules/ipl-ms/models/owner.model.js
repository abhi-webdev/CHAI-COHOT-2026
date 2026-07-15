import mongoose  from "mongoose";

const ownerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Owner name is required"],
        trim : true,
        min : 2,
        max : 20
    },
    company: {
        type: String,
        required: [true, "Company name is required"],
        trim : true,
        min : 2,
        max : 20
    }
}, {timestamps : true})

export default mongoose.model("Owner", ownerSchema);