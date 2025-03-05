import { Router } from "express";
import { addCategory, deleteCategory, getCategoryById, updatecategory } from "./category.controller.js";
import { addCategoryValidator, deleteCategoryValidator, getCategoryByIdValidator, updateCategoryValidator } from "../middlewares/category-validator.js";

const router = Router();

router.post("/addCategory", addCategoryValidator, addCategory);

router.get("/findCategory/:id", getCategoryByIdValidator, getCategoryById);

router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory);

router.put("/updateCategory/:id", updateCategoryValidator, updatecategory);

export default router;