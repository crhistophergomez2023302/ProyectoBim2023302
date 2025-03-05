import { Router } from "express";
import { addProductValidator, getProductValidator, getProductByIdValidator, updateProductValidator, deleteProductValidator } from "../middlewares/products-validator.js";
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct } from "./products.controller.js";

const router = Router();

/**
 * @swagger
 * /tiendaVirtual/v1/product/addProduct:
 *   post:
 *     summary: Add a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               description:
 *                 type: string
 *                 description: Product description
 *               price:
 *                 type: number
 *                 description: Product price
 *               stock:
 *                 type: number
 *                 description: Product stock
 *               category:
 *                 type: string
 *                 description: Category ID
 *     responses:
 *       200:
 *         description: Product added
 *       400:
 *         description: Bad request
 */
router.post("/addProduct", addProductValidator, addProduct);

/**
 * @swagger
 * /tiendaVirtual/v1/product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of products
 *       400:
 *         description: Bad request
 */
router.get("/", getProductValidator, getProducts);

/**
 * @swagger
 * /tiendaVirtual/v1/product/findProduct/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get("/findProduct/:id", getProductByIdValidator, getProductById);

/**
 * @swagger
 * /tiendaVirtual/v1/product/updateProduct/{id}:
 *   put:
 *     summary: Update product information
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
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
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */
router.put("/updateProduct/:id", updateProductValidator, updateProduct);

/**
 * @swagger
 * /tiendaVirtual/v1/product/deleteProduct/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete("/deleteProduct/:id", deleteProductValidator, deleteProduct);

export default router;