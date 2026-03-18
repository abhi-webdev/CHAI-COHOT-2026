import { Router } from "express";
import {
  getProject,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addMembersToProject,
  updateMemberRole,
  deleteMember,
  getProjectMembers,
} from "../controllers/project.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  addMemberToProjectValidators,
  createProjectValidators,
} from "../validators/index.js";
import {
  verifyJWT,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constant.js";

const router = Router();

router.use(verifyJWT);
router
  .route("/")
  .get(getProject)
  .post(createProjectValidators(), validate, createProject);
router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRole), getProjectById)
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    createProjectValidators(),
    validate,
    updateProject,
  )
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteProject);

  router
    .route("/projectId/members/:userId")
    .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateMemberRole)
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteMember);
export default router;
