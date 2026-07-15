

import Team from "../models/team.model.js";
import ApiError from "../../../common/utils/api-error.js";

// create 

const createTeam = async ({name}) => {
    const team = await Team.create({name});
    return team;
}

// assign owner to team
const assignOwnerToTeam = async ({ teamId, ownerId }) => {
    const team = await Team.findByIdAndUpdate(
        teamId,
        { ownerId },
        { new: true, runValidators: true }
    );

    if (!team) {
        throw ApiError.notFound("Team not found");
    }

    return team;
};

// get All Team

const getAllTeams = async () => {
    const teams = await Team.find()
    return teams;
}



// update Team

const updateTeam = async ({ id, name }) => {
    const team = await Team.findByIdAndUpdate(id, {
        name: name,
    },{new: true, runValidators: true})

    if(!team) {
        throw ApiError.notFound("Team not found");
    }
    return team;
};

// Delete Team


const deleteTeam = async (id) => {
    const team = await Team.findByIdAndDelete(id);
    if(!team) {
        throw ApiError.notFound("Team not found");
    }else {
        return team;
    }
}