import { hash, verify } from "argon2";
import User from "./user.model.js";

export const getUserById = async (req, res) => {
    try {
        const { usuario } = req;
        const { uid } = req.params;

        if(!usuario || usuario.role !== "ADMIN_ROLE"){
            return res.status(401).json({
                success: false,
                message: "Acceso denegado. se requiere que el rol sea admin"
            })
        }

        const user = await User.findById(uid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message
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
        const { uid } = req.params;

        if(uid.role === "ADMIN_ROLE") {
            return res.status(400).json({
                success: false,
                message: "No puedes eliminar a un administrador"
            });

        }

        const user = await User.findByIdAndUpdate(uid, { status: false }, { new: true });

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
        const { uid } = req.params
        const { oldPassword } = req.body
        const { newPassword } = req.body
 
        const user = await User.findById(uid)
 
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
 
        await User.findByIdAndUpdate(uid, {password: encryptedPassword}, {new: true})
 
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
        const { uid } = req.params;
        const data = req.body;

        if(uid.role === "ADMIN_ROLE" && data.role !== "ADMIN_ROLE") {
            return res.status(400).json({
                success: false,
                message: "No puedes cambiar el rol de un administrador"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(uid, data, { new: true });

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