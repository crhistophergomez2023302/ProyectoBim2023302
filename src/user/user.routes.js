import { Router } from "express";
import { getUserById, getUsers, deleteUser, updatePassword, updateUser, updateUserRole } from "./user.controller.js";
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator, updateUserRoleValidator } from "../middlewares/user-validator.js";

const router = Router();

router.get("/findUser/:id", getUserByIdValidator, getUserById)

router.get("/", getUsers)

router.delete("/deleteUser/:id", deleteUserValidator, deleteUser)

router.patch("/updatePassword/:id", updatePasswordValidator, updatePassword)

router.put("/updateUser/:id", updateUserValidator, updateUser)

router.put("/updateUserRole/:id", updateUserRoleValidator, updateUserRole);


export default router;