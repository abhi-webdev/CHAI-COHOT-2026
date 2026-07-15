import Router from "express"
import * as controller from "../controllers/owner.controllers.js"
const ownerRouter = Router()

// create a new owner 
ownerRouter.post("/create-owner", controller.createOwner)

// get all owner
ownerRouter.get("/get-all-owners", controller.getAllOwners)

//  get owner by id
ownerRouter.get("/get-owner-by-id/:id", controller.getOwnerById)

// update owner 
ownerRouter.put("/update-owner/:id", controller.updateOwner)

// delete owner
ownerRouter.delete("/delete-owner/:id", controller.deleteOwner)

export default ownerRouter