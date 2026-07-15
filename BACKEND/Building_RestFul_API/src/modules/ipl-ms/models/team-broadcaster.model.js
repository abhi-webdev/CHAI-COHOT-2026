import mongoose  from "mongoose";

const teamBroadcasterSchema = new mongoose.Schema({
    teamId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: [true, "Team id is required"]
    },
    broadcasterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sponser",
        required: [true, "Broadcaster is required"]
    }
}, {timestamps : true})

// avoid duplication b/w team and sponser
teamBroadcasterSchema.index({teamId: 1, broadcasterId: 1}, {unique: true})

export default mongoose.model("TeamBroadcaster", teamBroadcasterSchema);