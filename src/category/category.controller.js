import Category from './category.model.js';
import Product from '../products/products.model.js';

export const addCategory = async (req, res) => {
    try {
        const data = req.body;

        const category = await Category.create(data);

        return res.status(201).json({
            message: "Categoria fue creada exitosamente",
            name: category.name,
            description: category.description
        });
    } catch (err) {
        return res.status(500).json({
            message: "Ocurrio un error, categoria no fue creada",
            error: err.message
        });
    }
}

export const getCategoryById = async (req, res) => {
    try {
            const { id } = req.params;
            const category = await Category.findById(id);
    
            if (!category) {
                return res.status(404).json({ message: "Categoria no encontrada." });
            }
    
            return res.status(200).json({
                message: "Detalles del la categoria obtenidos exitosamente.",
                category: {
                name: category.name,
                description: category.description,
                status: category.status,
                },
            });
        } catch (err) {
            return res.status(500).json({
                message: "Error al obtener los detalles del la category.",
                error: err.message,
            });
        }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true });

        if(!category){
            return res.status(404).json({
                success: false,
                message: "Categoria no encontrada",
                error: err.message
            });
        }

        return res.status(200).json({
            success: true,
            message: "Categoria eliminada",
            category
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la categoria",
            error: err.message
        });
    }
};

export const updatecategory = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updateCategory = await Category.findByIdAndUpdate(id, data, { new: true });

        if (!updateCategory) {
            return res.status(404).json({
                success: false,
                msg: 'Categoria no encontrada',
                error: err.message
            });
        }

        res.status(200).json({
            success: true,
            msg: 'Categoria Actualizada',
            category: updateCategory,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar categoria',
            error: err.message
        });
    }
};

const createcategory = async () => {
    try {
        const categoryExists = await Category.findOne({ name: "Sin categoria" });

        if (categoryExists) {
            console.log("La categoria ya existe");
            return;
        }

        const category = new Category({
            name: "Sin categoria",
            description: "Otra categoria"
        });

        await category.save();
        console.log("Categoria creada correctamente.");
    } catch (error) {
        console.error("Error al verificar o crear la categoria:", error.message);
    }
};

export default createcategory;