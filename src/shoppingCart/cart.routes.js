import express from 'express';
import { addProductToCart, updateProductQuantityInCart, removeProductFromCart } from './cart.controller.js';
import { addProductToCartValidator, updateProductQuantityInCartValidator, removeProductFromCartValidator } from "../middlewares/cart-validator.js"

const router = express.Router();

/**
 * @swagger
 * /tiendaVirtual/v1/cart/addCart:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID
 *               product:
 *                 type: string
 *                 description: Product ID
 *               quantity:
 *                 type: number
 *                 description: Quantity of product
 *     responses:
 *       200:
 *         description: Product added to cart
 *       400:
 *         description: Bad request
 */
router.post("/addCart", addProductToCartValidator, addProductToCart);

/**
 * @swagger
 * /tiendaVirtual/v1/cart/updateCart:
 *   patch:
 *     summary: Update product quantity in cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID
 *               product:
 *                 type: string
 *                 description: Product ID
 *               quantity:
 *                 type: number
 *                 description: New quantity of product
 *     responses:
 *       200:
 *         description: Product quantity updated in cart
 *       400:
 *         description: Bad request
 */
router.patch("/updateCart", updateProductQuantityInCartValidator, updateProductQuantityInCart);

/**
 * @swagger
 * /tiendaVirtual/v1/cart/deleteProduct:
 *   delete:
 *     summary: Remove product from cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID
 *               product:
 *                 type: string
 *                 description: Product ID
 *     responses:
 *       200:
 *         description: Product removed from cart
 *       400:
 *         description: Bad request
 */
router.delete("/deleteProduct", removeProductFromCartValidator, removeProductFromCart);

export default router;