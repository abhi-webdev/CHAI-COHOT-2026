


import ApiError from "../../../common/utils/api-error.js";
import Team from "../models/team.model.js"
import Player from "../models/player.model.js"

// create , get player, update, delete
const createPlayer = async({name, role}) => {
    const player = await Player.create({name, role});
    return player;
}

const getAllPlayers = async() => {
    const players = await Player.find().populate("teamId", "name");
    return players;
}

const updatePlayer = async ({id, name, role}) => {
    const player = await Player.findByIdAndUpdate(id, {
        name: name,
        role: role,
    }, {new: true, runValidators: true})

    if(!player) {
        throw ApiError.notFound("Player not found");
    }
}


const deletePlayer = async (id) => {
    const player = await Player.findByIdAndDelete(id);

    return player;
}

const tansferPlayer = async (playerId, newTeamId) => {
    const team = await Team.findById(newTeamId);

    if(!team) {
        throw ApiError.notFound("Team not found")
    }

    const player = await Player.findById(playerId, 
        {teamId: newTeamId},
        {new: true, runValidators: true}
    ).populate("teamId", "name")

    if(!player) {
        throw ApiError.notFound("Team not found")
    }

    return player;
}

const getPlayerByTeam = async (id) => {
    const teamId = await Team.findById(id);

    if (!teamId) {
        throw ApiError.notFound("Team id not found");
    }

    const player = await Player.find({teamId: id}).populate("teamId", "name");
    return player;
}


const updatePlayerRole = async (playerId, newRole) => {
    const player = await Player.findById(playerId);

    if (!player) {
        throw ApiError.notFound("Player id not found");
    }

    const updatedPlayerRole = await Player.findByIdAndUpdate(playerId, 
        {role: newRole},
        {new: true, runValidators: true}
    ).populate("playerId", "role")

    return updatePlayerRole

}

export {getPlayerByTeam, tansferPlayer, updatePlayerRole}