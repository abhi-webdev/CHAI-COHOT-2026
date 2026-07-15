import mongoose  from "mongoose";

const teamSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Owner name is required"],
        trim : true,
        min : 2,
        max : 20
    },
    ownerId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: [true, "Owner id is required"]
    }
    
}, {timestamps : true})

export default mongoose.model("Team", teamSchema);