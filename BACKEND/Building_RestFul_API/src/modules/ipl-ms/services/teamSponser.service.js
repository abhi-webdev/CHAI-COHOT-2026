import ApiError from "../../../common/utils/api-error.js";
import Team from "../models/team.model.js"
import Sponsor from "../models/sponsor.model.js"
import TeamSponsor from "../models/team-sponsor.model.js"


const attachSponsor = async ({teamId, sponsorId}) => {
    const team = await Team.findById(teamId);
    if (!team) {
        throw ApiError.notFound("Team Not Found")
    }

    const sponsor = await Sponsor.findById(sponsorId);
    if (!sponsor) {
        throw ApiError.notFound("Team Not Found")
    }

    const exixting = await TeamSponsor.findOne({teamId, sponsorId})

    if(exixting) {
        throw ApiError.badRequest("Team aleardy sponsored")
    }

    const newSponserdTeam = await TeamSponsor.create({teamId, sponsorId});

    return newSponserdTeam
}

export {attachSponsor}