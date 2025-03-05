import { body, param } from 'express-validator';
import { categoryExists} from '../helpers/db-validator.js';
import { validarCampos } from './validate-fields.js';
import { handleErrors } from './handle-errors.js';
import { validateJWT } from './validate-jwt.js';
import { hasRoles } from './validate-roles.js';


export const addCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").isString().withMessage("name is required"),
    body("description").isString().withMessage("description is required"),
    body("name").custom(categoryExists),
    validarCampos,
    handleErrors
]

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(categoryExists),
    validarCampos,
    handleErrors
];

export const getCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
];

export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(categoryExists),
    validarCampos,
    handleErrors
];