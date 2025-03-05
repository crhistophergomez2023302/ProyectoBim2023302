# ProyectoBim2023302

Base URL
La URL base de la API es:

/tiendaVirtual/v1
Autenticación
POST /auth/register
Registra un nuevo usuario.

Request Body:


{
  "name": "string",
  "surname": "string",
  "username": "string",
  "email": "string",
  "password": "string",
  "nit": "number"
}
Responses:

200 OK: Usuario registrado exitosamente.
400 Bad Request: Error en los datos proporcionados.
POST /auth/login
Inicia sesión con un usuario existente.

Request Body:

{
  "email": "string",
  "password": "string"
}
Responses:

200 OK: Inicio de sesión exitoso.
400 Bad Request: Error en los datos de inicio de sesión.
Usuarios
GET /user/findUser/{id}
Obtiene información de un usuario por su ID.

Parameters:

id (string): ID del usuario.
Responses:

200 OK: Usuario encontrado.
404 Not Found: Usuario no encontrado.
GET /user
Obtiene todos los usuarios.

Responses:

200 OK: Lista de usuarios.
DELETE /user/deleteUser/{id}
Elimina un usuario por su ID.

Parameters:

id (string): ID del usuario.
Responses:

200 OK: Usuario eliminado exitosamente.
404 Not Found: Usuario no encontrado.
PATCH /user/updatePassword/{id}
Actualiza la contraseña de un usuario.

Parameters:

id (string): ID del usuario.
Request Body:

{
  "password": "string"
}
Responses:

200 OK: Contraseña actualizada exitosamente.
404 Not Found: Usuario no encontrado.
PUT /user/updateUser/{id}
Actualiza la información de un usuario.

Parameters:

id (string): ID del usuario.
Request Body:

{
  "name": "string",
  "surname": "string",
  "username": "string",
  "email": "string",
  "nit": "number",
  "role": "string"
}
Responses:

200 OK: Información del usuario actualizada.
404 Not Found: Usuario no encontrado.
PUT /user/updateUserRole/{id}
Actualiza el rol de un usuario.

Parameters:

id (string): ID del usuario.
Request Body:

{
  "role": "string"  // Puede ser "ADMIN_ROLE" o "CLIENT_ROLE"
}
Responses:

200 OK: Rol del usuario actualizado.
404 Not Found: Usuario no encontrado.
Productos
POST /product/addProduct
Agrega un nuevo producto.

Request Body:

{
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "category": "string"
}
Responses:

200 OK: Producto agregado exitosamente.
400 Bad Request: Error en los datos proporcionados.
GET /product
Obtiene todos los productos.

Responses:

200 OK: Lista de productos.
GET /product/findProduct/{id}
Obtiene un producto por su ID.

Parameters:

id (string): ID del producto.
Responses:

200 OK: Producto encontrado.
404 Not Found: Producto no encontrado.
PUT /product/updateProduct/{id}
Actualiza la información de un producto.

Parameters:

id (string): ID del producto.
Request Body:

{
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "category": "string"
}
Responses:

200 OK: Producto actualizado.
404 Not Found: Producto no encontrado.
DELETE /product/deleteProduct/{id}
Elimina un producto por su ID.

Parameters:

id (string): ID del producto.
Responses:

200 OK: Producto eliminado exitosamente.
404 Not Found: Producto no encontrado.
Categorías
POST /category/addCategory
Agrega una nueva categoría.

Request Body:

{
  "name": "string",
  "description": "string"
}
Responses:

200 OK: Categoría agregada exitosamente.
400 Bad Request: Error en los datos proporcionados.
GET /category/findCategory/{id}
Obtiene una categoría por su ID.

Parameters:

id (string): ID de la categoría.
Responses:

200 OK: Categoría encontrada.
404 Not Found: Categoría no encontrada.
DELETE /category/deleteCategory/{id}
Elimina una categoría por su ID.

Parameters:

id (string): ID de la categoría.
Responses:

200 OK: Categoría eliminada exitosamente.
404 Not Found: Categoría no encontrada.
PUT /category/updateCategory/{id}
Actualiza la información de una categoría.

Parameters:

id (string): ID de la categoría.
Request Body:

{
  "name": "string",
  "description": "string"
}
Responses:

200 OK: Categoría actualizada.
404 Not Found: Categoría no encontrada.
Carrito de Compras
POST /cart/addCart
Agrega un producto al carrito de un usuario.

Request Body:

{
  "user": "string",
  "product": "string",
  "quantity": "number"
}
Responses:

200 OK: Producto agregado al carrito.
400 Bad Request: Error en los datos proporcionados.
PATCH /cart/updateCart
Actualiza la cantidad de un producto en el carrito.

Request Body:

{
  "user": "string",
  "product": "string",
  "quantity": "number"
}
Responses:

200 OK: Cantidad del producto actualizada en el carrito.
400 Bad Request: Error en los datos proporcionados.
DELETE /cart/deleteProduct
Elimina un producto del carrito.

Request Body:

{
  "user": "string",
  "product": "string"
}
Responses:

200 OK: Producto eliminado del carrito.
400 Bad Request: Error en los datos proporcionados.
Swagger Documentation
Puedes acceder a la documentación interactiva de la API a través de la siguiente ruta:

/api-docs
