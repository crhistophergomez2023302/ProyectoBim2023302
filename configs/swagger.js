import { version } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
 
const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Tienda virtual",
            version:"1.0.0",
            description: "API de gestion de ventas",
            contact:{
                name: "Crhistopher Gomez",
                email: "crhistophergomez2007@gmail.com"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/tiendaVirtual/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/user/*.js",
        "./src/category/*.js",
        "./src/products/*.js",
        "./src/shoppingCart/*.js",
        "./src/invoice/*.js"
    ]
}
 
const swaggerDocs = swaggerJSDoc(swaggerOptions)
 
export { swaggerDocs, swaggerUi }
 