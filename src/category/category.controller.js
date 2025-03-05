import Category from './category.model.js';

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

export const getCategories = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };

        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            categories
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category= await Category.findByIdAndUpdate(id, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
            category
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        });
    }
};

export const updatecategory = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Usuario Actualizado',
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
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