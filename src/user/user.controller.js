import { hash, verify } from "argon2";
import User from "./user.model.js";

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        return res.status(200).json({
            message: "Detalles del usuario obtenidos exitosamente.",
            user: {
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            status: user.status,
            },
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al obtener los detalles del usuario.",
            error: err.message,
        });
    }
  };

export const getUsers = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            users
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
            user
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        });
    }
};

export const updatePassword = async (req, res) => {
    try{
        const { id } = req.params
        const { oldPassword } = req.body
        const { newPassword } = req.body
 
        const user = await User.findById(id)
 
        const matchOldAndOldPassword = await verify(user.password, oldPassword)
 
        if(!matchOldAndOldPassword){
            return res.status(400).json({
                success: false,
                message: "La contraseña ingresada no concuerda con la contraseña actual"
            })
        }
 
        if (!user.password == oldPassword){
            return res.status(200).json({
                success: true
            })
        }
       
        const matchOldAndNewPassword = await verify(user.password, newPassword)
 
        if(matchOldAndNewPassword){
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }
 
        const encryptedPassword = await hash(newPassword)
 
        await User.findByIdAndUpdate(id, {password: encryptedPassword}, {new: true})
 
        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        })
 
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (data.password) {
            data.password = await hash(data.password);
        }

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

export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const userToUpdate = await User.findById(id);

        if(userToUpdate.role === 'ADMIN_ROLE' && role !== 'ADMIN_ROLE') {
            return res.status(400).json({
                success: false,
                msg: 'No tiene permisos para actualizar a otro administrador'
            });
        }

        const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Rol del usuario actualizado',
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar el rol del usuario',
            error: err.message
        });
    }
};