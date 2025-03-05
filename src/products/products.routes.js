import { Router } from "express";
import { addProductValidator, getProductValidator, getProductByIdValidator, updateProductValidator, deleteProductValidator } from "../middlewares/products-validator.js";
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct } from "./products.controller.js";

const router = Router();

router.post("/addProduct", addProductValidator, addProduct);

router.get("/", getProductValidator, getProducts);

router.get("/findProduct/:id", getProductByIdValidator, getProductById);

router.put("/updateProduct/:id", updateProductValidator, updateProduct);

router.delete("/deleteProduct/:id", deleteProductValidator, deleteProduct);

export default router;