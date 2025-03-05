import { Router } from "express";
import { addCategory, deleteCategory, getCategoryById, updatecategory } from "./category.controller.js";
import { addCategoryValidator, deleteCategoryValidator, getCategoryByIdValidator, updateCategoryValidator } from "../middlewares/category-validator.js";

const router = Router();

/**
 * @swagger
 * /tiendaVirtual/v1/category/addCategory:
 *   post:
 *     summary: Add a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Category name
 *               description:
 *                 type: string
 *                 description: Category description
 *     responses:
 *       200:
 *         description: Category added
 *       400:
 *         description: Bad request
 */
router.post("/addCategory", addCategoryValidator, addCategory);

/**
 * @swagger
 * /tiendaVirtual/v1/category/findCategory/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 */
router.get("/findCategory/:id", getCategoryByIdValidator, getCategoryById);

/**
 * @swagger
 * /tiendaVirtual/v1/category/deleteCategory/{id}:
 *   delete:
 *     summary: Delete category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */
router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory);

/**
 * @swagger
 * /tiendaVirtual/v1/category/updateCategory/{id}:
 *   put:
 *     summary: Update category information
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Category not found
 */
router.put("/updateCategory/:id", updateCategoryValidator, updatecategory);

export default router;