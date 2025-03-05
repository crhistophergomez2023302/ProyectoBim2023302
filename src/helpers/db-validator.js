import Category from "../category/category.model.js"
import User from "../user/user.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya ha sido registrado`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`El username ${username} ya ha sido registrado`)
    }
}

export const userExists = async (uid = "") => {
    const existe = await User.findOne(uid)
    console.log(existe)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const nitExists = async (nit = "") => {
    const existe = await User.findOne({nit})
    if(existe){
        throw new Error(`El NIT ${nit} ya ha sido registrado`)
    }
}

export const isAdminRole = async (uid = "") => {
    const isAdmin = await User.findById(uid)
    if(isAdmin.role === "ADMIN_ROLE"){
        throw new Error("No tiene permisos para actualizar a otro administrador")
    }
}

export const categoryExists = async (name = "") => {
    const existe = await Category.findOne({name})
    if(existe){
        throw new Error(`La categoría ${name} ya ha sido registrada`)
    }
}