import Product from './products.model.js';

export const addProduct = async (req, res) => {
    try {
        const data = req.body;

        const product = await Product.create(data);

        return res.status(201).json({
            message: "Producto fue creado exitosamente",
            product
        });
    } catch (err) {
        return res.status(500).json({
            message: "Ocurrio un error, producto no fue creado",
            error: err.message
        });
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ 
                success: false,
                message: "Producto no encontrado." ,
                error: err.message
            });
        }

        return res.status(200).json({
            message: "Detalles del producto obtenidos exitosamente.",
            product: {
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
                status: product.status,
            },
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al obtener los detalles del producto.",
            error: err.message,
        });
    }
}

export const getProducts = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: err.message
        });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado",
                error: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Producto eliminado",
            product
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el producto",
            error: err.message
        });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const product = await Product.findByIdAndUpdate(id, data, { new: true })

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Producto actualizado",
            product
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el producto",
            error: err.message
        });
    }
}