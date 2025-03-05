import { Router } from "express";
import { addCategory, deleteCategory, getCategories, updatecategory } from "./category.controller.js";
import { addCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "../middlewares/category.validator.js";

const router = Router();

router.post("/addCategory", addCategoryValidator, addCategory);

router.get("/", getCategoryValidator, getCategories);

router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory);

router.put("/updateCategory/:id", updateCategoryValidator, updatecategory);

export default router;