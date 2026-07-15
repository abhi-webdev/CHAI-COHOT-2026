import mongoose  from "mongoose";

const sponsorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Owner name is required"],
        trim : true,
        min : 2,
        max : 20
    },
}, {timestamps : true})

export default mongoose.model("Sponsor", sponsorSchema);