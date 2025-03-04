import { body, param } from "express-validator";
import { emailExists, usernameExists, nitExists, userExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("username").notEmpty().withMessage("El username es requerido"),
    body("nit").notEmpty().withMessage("El NIT es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("nit").custom(nitExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    handleErrors
];

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isLength({ min: 4 }).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
];

export const getUserByIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("_id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("_id").custom(userExists),
    validarCampos,
    handleErrors
];

export const deleteUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("_id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("_id").custom(userExists),
    validarCampos,
    handleErrors
];

export const updatePasswordValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("_id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("_id").custom(userExists),
    body("newPassword").isLength({ min: 8 }).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
];

export const updateUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("_id", "No es un ID válido").isMongoId(),
    param("_id").custom(userExists),
    validarCampos,
    handleErrors
];