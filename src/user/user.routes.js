import { Router } from "express";
import { getUserById, getUsers, deleteUser, updatePassword, updateUser, updateUserRole } from "./user.controller.js";
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator, updateUserRoleValidator } from "../middlewares/user-validator.js";

const router = Router();

/**
 * @swagger
 * /tiendaVirtual/v1/user/findUser/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/findUser/:id", getUserByIdValidator, getUserById);

/**
 * @swagger
 * /tiendaVirtual/v1/user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", getUsers);

/**
 * @swagger
 * /tiendaVirtual/v1/user/deleteUser/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete("/deleteUser/:id", deleteUserValidator, deleteUser);

/**
 * @swagger
 * /tiendaVirtual/v1/user/updatePassword/{id}:
 *   patch:
 *     summary: Update user password
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password
 *     responses:
 *       200:
 *         description: Password updated
 *       404:
 *         description: User not found
 */
router.patch("/updatePassword/:id", updatePasswordValidator, updatePassword);

/**
 * @swagger
 * /tiendaVirtual/v1/user/updateUser/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               nit:
 *                 type: number
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
router.put("/updateUser/:id", updateUserValidator, updateUser);

/**
 * @swagger
 * /tiendaVirtual/v1/user/updateUserRole/{id}:
 *   put:
 *     summary: Update user role
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [ADMIN_ROLE, CLIENT_ROLE]
 *     responses:
 *       200:
 *         description: User role updated
 *       404:
 *         description: User not found
 */
router.put("/updateUserRole/:id", updateUserRoleValidator, updateUserRole);

export default router;