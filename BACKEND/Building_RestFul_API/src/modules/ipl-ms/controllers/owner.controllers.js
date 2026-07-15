import * as ownerService from "../services/owner.service.js"
import ApiResponse from "../../../common/utils/api-response.js"
const createOwner = async(req, res) => {
    const owner = await ownerService.createOwner(req.body);
    ApiResponse.ok(res, "Owner created Successfully", owner)
}

const getAllOwners = async(req, res) => {
    const owners =await ownerService.getAllOwners();
    ApiResponse.ok(res, "Owners featched Successfully", owners)
}

const getOwnerById = async(req, res) => {
    const owner =await ownerService.getOwnerById(req.params.id);
    ApiResponse.ok(res, "Owner featched Successfully", owner)
}

const updateOwner = async(req, res) => {
    const updatedOwner =await ownerService.updateOwner(req.params.id, req.body);
    ApiResponse.ok(res, "Owner update Successfully", updateOwner)
}

const deleteOwner = async(req, res) => {
    await ownerService.deleteOwner(req.params.id);
    ApiResponse.ok(res, "Owner deleated Successfully")
}

export {createOwner, getAllOwners, getOwnerById, updateOwner, deleteOwner}

