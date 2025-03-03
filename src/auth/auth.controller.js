import { hash, verify } from "argon2"
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
    try {
        const data = req.body;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword

        data.role = "CLIENT_ROLE";

        const user = await User.create(data);

        return res.status(201).json({
            message: "Usuario fue creado exitosamente",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "Ocurrio un error, usuario no fue creado",
            error: err.message
        });
    }
}

export const login = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const user = await User.findOne({
            $or:[{email: email}, {username: username}]
        })

        if(!user){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }
        console.log(user._id)
        const token = await generateJWT(user._id)

        return res.status(200).json({
            message: "Login ha sido realizado exitosamente",
            userDetails: {
                token: token
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "Ocurrio un error, Login ha falla",
            error: err.message
        })
    }
}

const createAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: "ADMIN_ROLE" });

        if (adminExists) {
            console.log("El admin ya existe, no se puede crear otro");
            return;
        }

        const hashedPassword = await hash("Admin123@");

        const admin = new User({
            name: "Admin",
            surname: "Nimda",
            username: "Admin1",
            email: "Admin@gmail.com",
            password: hashedPassword,
            nit: "87654321",
            role: "ADMIN_ROLE"
        });

        await admin.save();
        console.log("Admin creado correctamente.");
    } catch (error) {
        console.error("Error al verificar o crear el admin:", error.message);
    }
};

export default createAdmin;