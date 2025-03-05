import { body, param } from 'express-validator';
import { validarCampos } from './validate-fields.js';
import { handleErrors } from './handle-errors.js';
import { validateJWT } from './validate-jwt.js';
import { hasRoles } from './validate-roles.js';


export const addProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").isString().notEmpty().withMessage("name is required"),
    body("description").isString().notEmpty().withMessage("description is required"),
    body("price").isNumeric().notEmpty().withMessage("price is required"),
    body("stock").isNumeric().notEmpty().withMessage("stock is required"),
    body("category").isMongoId().withMessage("category isrequired"),
    validarCampos,
    handleErrors
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
];

export const getProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
];

export const getProductByIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
];

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id", "No es un ID válido").isMongoId(),
    validarCampos,
    handleErrors
];