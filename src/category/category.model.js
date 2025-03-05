import { Schema, model } from "mongoose";

const categorySchema = Schema({
    name:{
        type: String,
        required: [true, "Name es requerido"],
        maxLength: [25, "Name no puede excederse de 25 caracteres"]
    },
    description:{
        type: String,
        required: [true, "description es requerido"],
        maxLength: [100, "description no puede excederse de 25 caracteres"]
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

export default model("Category", categorySchema);