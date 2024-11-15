# API de Usuarios 📱👤

## Descripción
Esta API permite la gestión de usuarios, incluyendo autenticación, creación, actualización, manejo de imágenes de perfil y la integración con servicios externos como Discord, Google y GitHub.

---

## Configuración Inicial ⚙️

### Requisitos

Instala las dependencias necesarias:

```bash
npm i mongoose
npm i dotenv
npm i jsonwebtoken
npm i passport
npm i passport-discord
npm i express-session
npm i cookie-parser
npm install passport-google-oauth20
npm install passport-github2
npm i socket.io
npm i socket.io-client
npm i cloudinary
npm install cloudinary
npm install multer
```

### Variables de Entorno 🌍

Configura las siguientes variables en tu archivo `.env`:

```dotenv
MONGODB_URI=mongodb+srv://<tu_usuario>:<tu_contraseña>@<tu_cluster>.mongodb.net/<tu_base_de_datos>
MONGODB_DB_NAME=<nombre_de_tu_base_de_datos>
SECRET_KEY=<tu_clave_secreta>

# Credenciales de Discord
DISCORD_CLIENT_ID=<tu_id_cliente_discord>
DISCORD_CLIENT_SECRET=<tu_secreto_cliente_discord>
DISCORD_CALLBACK_URL=http://localhost:5001/users/auth/discord/callback

# Credenciales de Google
GOOGLE_CLIENT_ID=<tu_id_cliente_google>
GOOGLE_CLIENT_SECRET=<tu_secreto_cliente_google>
GOOGLE_CALLBACK_URL=http://localhost:5001/users/auth/google/callback

# Credenciales de GitHub
GITHUB_CLIENT_ID=<tu_id_cliente_github>
GITHUB_CLIENT_SECRET=<tu_secreto_cliente_github>

# Credenciales de Cloudinary
CLOUDINARY_CLOUD_NAME=<tu_nombre_de_cloud>
CLOUDINARY_API_KEY=<tu_api_key>
CLOUDINARY_API_SECRET=<tu_api_secret>
```

---

## Endpoints de la API 🚀

### 1. Obtener todos los usuarios 🧑‍🤝‍🧑

**Método**: `GET`  
**URL**: `http://localhost:5001/users/getAllUsers`

Obtiene una lista de todos los usuarios registrados.

**Respuesta:**

```json
[
  {
    "_id": "123456",
    "userName": "juanperez",
    "nombre": "Juan Pérez",
    "correo": "juan.perez@example.com",
    "telefono": "123456789",
    "fotoPerfil": "url_a_la_foto",
    "direccion": "Calle Falsa 123",
    "sexo": "masculino",
    "fechaNacimiento": "1990-01-01"
  },
  ...
]
```

---

### 2. Obtener un usuario por ID 🆔

**Método**: `GET`  
**URL**: `http://localhost:5001/users/{id}`  
**Ejemplo de URL**: `http://localhost:5001/users/672cb5e790cb620ef1ae1e88`

Obtiene la información de un usuario específico mediante su ID.

**Respuesta:**

```json
{
  "_id": "672cb5e790cb620ef1ae1e88",
  "userName": "juanperez",
  "nombre": "Juan Pérez",
  "correo": "juan.perez@example.com",
  "telefono": "123456789",
  "fotoPerfil": "url_a_la_foto",
  "direccion": "Calle Falsa 123",
  "sexo": "masculino",
  "fechaNacimiento": "1990-01-01"
}
```

---

### 3. Crear un nuevo usuario 👤

**Método**: `POST`  
**URL**: `http://localhost:5001/users/newUser`

Crea un nuevo usuario **sin** cifrar la contraseña. Recibe los datos del usuario en el cuerpo de la solicitud.

**Cuerpo de la solicitud:**

```json
{
  "userName": "juanperez",
  "nombre": "Juan Pérez",
  "correo": "juan.perez@example.com",
  "contraseña": "miContraseñaSegura",
  "fotoPerfil": "url_a_la_foto",
  "direccion": "Calle Falsa 123",
  "telefono": "1234567890",
  "sexo": "masculino",
  "fechaNacimiento": "1990-01-01"
}
```

---

### 4. Actualizar un usuario 🔄

**Método**: `PUT`  
**URL**: `http://localhost:5001/users/updateUser/:id`  
**Ejemplo de URL**: `http://localhost:5001/users/updateUser/672b784954bc940d9200e06f`

Actualiza la información de un usuario. Los campos pueden ser modificados, pero hay restricciones:
- No puedes cambiar el tipo de usuario.
- El correo debe ser único (no se puede asignar un correo que ya esté registrado).

**Cuerpo de la solicitud (ejemplo):**

```json
{
  "sexo": "femenino",
  "fechaNacimiento": "1995-05-15",
  "direccion": "Nueva Calle 456"
}
```

---

### 5. Autenticación de usuario (Login) 🔑

**Método**: `POST`  
**URL**: `http://localhost:5001/users/loginAndAuth`

Inicia sesión con cualquiera de los siguientes parámetros: `userName`, `correo` o `telefono`, junto con la contraseña encriptada. Si los datos son correctos, se devuelve un token JWT.

**Cuerpo de la solicitud (ejemplo 1):**

```json
{
  "userName": "juanperez",
  "contraseña": "tuContraseña123"
}
```

**Cuerpo de la solicitud (ejemplo 2):**

```json
{
  "correo": "juan.perez@example.com",
  "contraseña": "tuContraseña123"
}
```

**Respuesta:**

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 6. Crear un usuario y autenticarlo al mismo tiempo 🛠️

**Método**: `POST`  
**URL**: `http://localhost:5001/users/createAndAuth`

Crea un nuevo usuario y lo autentica al mismo tiempo. El correo o teléfono debe ser único y todos los campos deben ser proporcionados.

**Cuerpo de la solicitud (ejemplo con correo):**

```json
{
  "userName": "juanperez",
  "nombre": "Juan Pérez",
  "correo": "juan.perez@example.com",
  "contraseña": "miContraseñaSegura",
  "fotoPerfil": "http://ejemplo.com/miFoto.jpg",
  "direccion": "Calle Falsa 123",
  "telefono": "123456789",
  "sexo": "masculino",
  "fechaNacimiento": "1990-01-01"
}
```

**Cuerpo de la solicitud (ejemplo con teléfono):**

```json
{
  "userName": "sofiahernandez",
  "nombre": "Sofía Hernández",
  "contraseña": "mypassword456",
  "fotoPerfil": "http://ejemplo.com/sofia.jpg",
  "direccion": "Avenida 45, Bucaramanga",
  "telefono": "3209876543",
  "sexo": "femenino",
  "fechaNacimiento": "1988-12-25"
}
```

---

### 7. Autenticación con servicios externos 🔐

#### Autenticación con Discord 🎮

**Método**: `GET`  
**URL**: `http://localhost:5001/users/auth/discord`

Redirige al usuario a Discord para iniciar sesión. Si el usuario ya existe en la base de datos, no se crea un nuevo registro, pero se actualizan los datos disponibles.

#### Autenticación con Google 🌍

**Método**: `GET`  
**URL**: `http://localhost:5001/users/auth/google`

Redirige al usuario a Google para iniciar sesión. Si el usuario ya existe en la base de datos, no se crea un nuevo registro, pero se actualizan los datos disponibles.

#### Autenticación con GitHub 🐙

**Método**: `GET`  
**URL**: `http://localhost:5001/users/auth/github`

Redirige al usuario a GitHub para iniciar sesión. Si el usuario ya existe en la base de datos, no se crea un nuevo registro, pero se actualizan los datos disponibles.

---

### 8. Cambiar imagen de perfil 📸

**Método**: `PUT`  
**URL**: `http://localhost:5001/users/profile-image/{idUsuario}`  
**Ejemplo de URL**: `http://localhost:5001/users/profile-image/6730348ef39c6117a094b829`

Permite a un usuario actualizar su imagen de perfil. El usuario debe enviar la nueva imagen mediante un archivo en formato `Form-data`.

**Ejemplo de solicitud:**

```http
PUT http://localhost:5001/users/profile-image/6730348ef39c6117a094b829
```

**Respuesta:**

```json
{
  "message": "Imagen de perfil actualizada",
  "newImageUrl": "https://res.cloudinary.com/d

sh2beqdt/image/upload/v1579983928/mi-foto-perfil.jpg"
}
```

---

## Notas adicionales 📝

- Asegúrate de tener la base de datos MongoDB configurada correctamente antes de usar estos endpoints.
- Los tokens JWT generados en el proceso de login deben ser enviados en el encabezado de las solicitudes que requieran autenticación (`Authorization: Bearer <token>`).
  