import { User } from "../models/user.model.js";
import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectMember.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose from "mongoose";
import { AvailableUserRole, UserRolesEnum } from "../utils/constant.js";

const getProject = asyncHandler(async(req, res) => {
    //test
    const projects = await ProjectMember.aggregate([
        {
            $match : {
                user: new mongoose.Types.ObjectId(req.user._id)
            }
        }, 
        {
            $lookup : {
                form : "projects",
                localField : "projects",
                foreignField : "_id",
                as : "projects",
                pipeline : [
                    {
                        $lookup: {
                            form : "projectsmembers",
                            localField : "_id",
                            foreignField : "projects",
                            as : "projectsmembers",
                        }
                    },
                    {
                        $addFields : {
                            member : {
                                $size : "$pro"
                            }
                        }
                    }
                ]
            }
        },
        {
            $unwind : "$project"
        },
        {
            $project : {
                project : {
                    _id: 1,
                    name : 1,
                    description : 1,
                    members : 1,
                    createdAt : 1,
                    createdBy : 1,
                },
                role : 1,
                _id: 0
            }
        }
    ])

    return res.status(200).json(
        new ApiResponse(200, projects, "Projects fetched succcessfully")
    )
})

const getProjectById = asyncHandler(async(req, res) => {
    //test
    const {projectId} = req.params
    const project = await Project.findById(projectId)

    if(!project) {
        throw new ApiError(404, "Project not found");
    }

    return res.status(200).json(
        new ApiResponse(200, project, "Project featched successfully")
    )
})

const createProject = asyncHandler(async(req, res) => {
    //test
    const {name, description} = req.body

    const project = await Project.create({
        name,
        description,
        createdBy : new mongoose.Types.ObjectId(req.user._id)
    })

    await ProjectMember.create({
        user : new mongoose.Types.ObjectId(req.user._id),
        project : new mongoose.Types.ObjectId(project._id),
        role : UserRolesEnum.ADMIN
    })

    return res.status(200).json(
        new ApiResponse(200, 
            project, 
            "Project created sucessfully"
        )
    )
})

const updateProject = asyncHandler(async(req, res) => {
    //test
    const {name, description} = req.body
    const {projectId} = req.params;
    const project = await Project.findByIdAndUpdate(
        projectId,
        {
            name,
            description
        },
        {new : true}
    )

    if(!project) {
        throw new ApiError(404, "Project not found")
    }
    return res.status(200).json(
        new ApiResponse(200, 
            project, 
            "Project updated sucessfully"
        )
    )
})

const deleteProject = asyncHandler(async(req, res) => {
    //test
    const {projectId} = req.params
    const project = await Project.findByIdAndDelete(projectId)

    if(!project){
        throw new ApiError(404, "Project not found")
    }

    return res.status(200).json(
        new ApiResponse(200, 
            project, 
            "Project deleted sucessfully"
        )
    )
})

const addMembersToProject = asyncHandler(async(req, res) => {
    //test
    const {email, role} = req.body;
    const {projectId} = req.params;

    const user = await User.findOne({email});

    if(!user) {
        throw new ApiError(404, "User does not exist")
    }

    await ProjectMember.findByIdAndUpdate(
        {
            user : await mongoose.Types.ObjectId(user._id),
            project : await mongoose.Types.ObjectId(projectId),
        },
        {
            user : await mongoose.Types.ObjectId(user._id),
            project : await mongoose.Types.ObjectId(projectId),
            role : role
        },
        {
            new : true,
            upsert : true
        }
    )

    return res.status(201).json(new ApiResponse(200, {} , "Project member added successfully"))
})

const getProjectMembers = asyncHandler(async(req, res) => {
    //test
    const {projectId} = req.params
    const project = await project.findById()
    if(!project) {
        throw new ApiError(404, "project not found")
    }

    const projectMembers = await projectMembers.aggregate([
        {
            $match : {
                project : new mongoose.Types.ObjectId(projectId)
            }
        },
        {
            $lookup: {
                from : "users",
                localField : "user",
                foreignField : "_id",
                as: "user",
                pipeline: [
                    {
                        
                        $project : {
                            _id : 1,
                            username : 1, 
                            fullname : 1,
                            avatar : 1
                        }
                    }
                ]
            }
        },
        {
            $addFields : {
                user : {
                    $arrayElemAt : ["$user", 0]
                }
            }
        },
        {
            $project : {
                project : 1,
                user : 1,
                role : 1,
                createdAt : 1,
                updatedAt : 1,
                _id : 0
            }
        }
    ])

    return res.status(201).json(new ApiResponse(200, projectMembers , "Project member feateched")) 
})

const updateMemberRole = asyncHandler(async(req, res) => {
    //test
    const {projectId, userId} = req.params;
    const {newRole} = req.params;

    if(!AvailableUserRole.includes(newRole)){
        throw new ApiError(400, "Invalid role")
    }

    let projectMember = await ProjectMember.findOne({
        project : new mongoose.Types.ObjectId(projectId),
        user : new mongoose.Types.ObjectId(userId),
    })

    if(!projectMember){
         throw new ApiError(400, "Project member not found");
    }

    await projectMember.findByIdAndUpdate(projectMember._id, 
        {
            role : newRole
        },
        {new : true}
    )

    if(!projectMember){
         throw new ApiError(400, "Project member not found");
    }

    return res.status(201).json(new ApiResponse(200, projectMember , "Project member role updated successfully")) 
})

const deleteMember = asyncHandler(async(req, res) => {
    //test
    const {projectId, userId} = req.params;

    let projectMember = await ProjectMember.findOne({
        project : new mongoose.Types.ObjectId(projectId),
        user : new mongoose.Types.ObjectId(userId),
    })

    if(!projectMember){
         throw new ApiError(400, "Project member not found");
    }

    await projectMember.findByIdAndDelete(projectMember._id)

    if(!projectMember){
         throw new ApiError(400, "Project member not found");
    }

    return res.status(201).json(new ApiResponse(200, projectMember , "Project member deleted successfully")) 
})



export {
    getProject,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    addMembersToProject,
    updateMemberRole,
    deleteMember,
    getProjectMembers
}

