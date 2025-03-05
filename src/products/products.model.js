import { Schema, model } from "mongoose";

const productSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name can't exceed 25 characters"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength: [100, "Description can't exceed 100 characters"]
    },
    price:{
        type: Number,
        required: [true, "Price is required"]
    },
    stock:{
        type: Number,
        required: [true, "Stock is required"]
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"]
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timestamps: true
})

export default model("Product", productSchema);