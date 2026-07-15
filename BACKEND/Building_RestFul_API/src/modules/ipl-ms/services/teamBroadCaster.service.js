import ApiError from "../../../common/utils/api-error.js";
import Team from "../models/team.model.js"
import Broadcaster from "../models/broadcaster.model.js"
import TeamBroadcaster from "../models/team-broadcaster.model.js"


const attachBroadcaster = async ({teamId, BroadcasterId}) => {
    const team = await Team.findById(teamId);
    if (!team) {
        throw ApiError.notFound("Team Not Found")
    }

    const Broadcaster = await Broadcaster.findById(BroadcasterId);
    if (!Broadcaster) {
        throw ApiError.notFound("Broadcaster Not Found")
    }

    const exixting = await TeamBroadcaster.findOne({teamId, BroadcasterId})

    if(exixting) {
        throw ApiError.badRequest("Team aleardy Broadcasting")
    }

    const BroadcastingTeam = await TeamBroadcaster.create({teamId, BroadcasterId});

    return BroadcastingTeam
}

export {attachBroadcaster}