import { Schema, model} from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "Name es requerido"],
        maxLength: [25, "Name no puede excederse de 25 caracteres"]
    },
    surname:{
        type: String,
        required: [true, "Surname es requerido"],
        maxLength: [25, "Surname no puede excederse de 25 caracteres"]
    },
    username:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    nit:{
        type: Number,
        required: [true, "Nit is required"],
        minLeght: [8, "El NIT tiene que ser por lo menos de 8 caracteres"],
        unique: true
    },
    role:{
        type: String,
        enum: ["ADMIN_ROLE", "CLIENT_ROLE"],
        default: "CLIENT_ROLE"
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)