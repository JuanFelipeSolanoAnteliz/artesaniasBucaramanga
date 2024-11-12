# .env:
MONGODB_URI= URI valentina
MONGODB_DB_NAME= nombre db
SECRET_KEY=729e97f2f54e6a1edb3cfe3d7b1b96516458312623d8757bb1cbb4245a8a4d1eb5d3111961baeb8227a6ba6971c15f54da447862813a07d391a02de5447814031cca4ab6921f44d57fb7b2d3e9aa3d8e07987071ede00d3ff13b70ad05134c5162cdd27bb7f58cfd0620548ca45946d16af151f3b4c50965ae44f5cf690cdccb

# instalar:
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

# APIs:

primero activar server :

´´´
npm run dev:server
´´´

# APIS PARA USERS:


## get all users:
GET http://localhost:5001/users/getAllUsers (se puede dar click y ver)


## get one user:
GET http://localhost:5001/users/{id} (se puede dar click y ver la info pero especifica una ID antes)
ejemplo:
http://localhost:5001/users/getUser/672cb5e790cb620ef1ae1e88


## create one user(no bcrypt):
POST http://localhost:5001/users/newUser (user body en thunderClient)

esta API crea un usuario nuevo normal, pero no encripta contraseña ojo

body:
´´´
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
´´´



## edit one user(email cant be same than other):
PUT http://localhost:5001/users/updateUser/:id (user body en thunderClient)

el editar puede editar cualquier campo del dato desde uno solo, hasta todo, las unicas condiciones son no se puede modificar el tipo, el email no se puede poner uno existente y se debe poner el _id del usuario, id ejemplo:

http://localhost:5001/users/updateUser/672b784954bc940d9200e06f

y en body:

{
    "_id": {
        "$oid": "5f3e5f4c2c0e4a1d4c8b4575"
    },
    "userName": "carlosmendez",
    "nombre": "Carlos Méndez",
    "correo": "carlos.mendez@example.com",
    "contraseña": "$2a$10$PmfVghukfkgkfbdhfhPhU3rdKhHvghgkj45j.PgghH5yH",
    "fotoPerfil": "https://example.com/foto/carlos.jpg",
    "direccion": "Avenida 45, Armenia",
    "telefono": "3201234567",
    "sexo": "femenino",
    "fechaNacimiento": "1995-05-15",
    "favoritos": [
        {
            "$oid": "64f2c111fc13ae1b23000009"
        }
    ],
    "compras": [],
    "talleresInscritos": [
        {
            "$oid": "64f2c111fc13ae1b23000030"
        }
    ],
    "cupones": []
}

O tambien: 

{
    "sexo": "femenino",
    "fechaNacimiento": "1995-05-15",
    "direccion": "Nueva Calle 456"
}

o incluso:

{
    "correo": "juan.perez@example.com"
}


## search one userName,telefono or correo and log in with token and bcrypt password (complete usefull):

POST http://localhost:5001/users/loginAndAuth

esta API lo que hace es servir de login tomando cualquiera de los 3 datos y la contraseña encriptada, verifica en la db y si todo es correcto, crea el token de acceso a la pagina

ejemplos combinaciones de login manual:

1:
{
  "userName": "juanperez",
  "contraseña": "tuContraseña123"
}

2:
{
  "correo": "juan.perez@example.com",
  "contraseña": "tuContraseña123"
}

3:
{
  "telefono": "123456789",
  "contraseña": "tuContraseña123"
}


## create one user and log in with token and bcrypt password (complete usefull):
POST http://localhost:5001/users/createAndAuth (body on thunder client needed)

esta funcion funciona de forma que crea una cuenta nueva al igual que la logea o verifica, para eso se deben ingresar los siguientes valores obligatorios para funcionar:

condiciones: el email debe ser unico, todo es string y todo debe estar lleno

ejemplo de body:
´´´
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
´´´

resultado de la operacion:

Status: 201 Created
{
  "message": "Successfully created and authenticated",
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmNhZGJhY2Q4ZWMzZTQ3OGIzYzUxMyIsImNvcnJlbyI6Imp1YW4ucGVyZXNAZXhhbXBsZS5jb20iLCJpYXQiOjE3MzA5ODEzMDcsImV4cCI6MTczMDk4NDkwN30.R64yiD9LMKiL_YlHkKkEx9iGEcvVSXYidx_u05bCACA"
}




# authenticate discord
http://localhost:5001/users/auth/discord

redirecciona para autenticar discord, de ahi toma la data la transforma al 
formato de usuarios y sube la data, si se hace otro login igual no crea un
nuevo dato sino que pasa de largo, verificando que existe el dato(por lo 
que se puede editar para rellenar valores que no da discord predeterminadamente)


# authenticate Google
http://localhost:5001/users/auth/google

redirecciona para autenticar google, de ahi toma la data la transforma al 
formato de usuarios y sube la data, si se hace otro login igual no crea un
nuevo dato sino que pasa de largo, verificando que existe el dato(por lo 
que se puede editar para rellenar valores que no da google predeterminadamente)

# authenticate Github
http://localhost:5001/users/auth/github

redirecciona para autenticar github, de ahi toma la data la transforma al 
formato de usuarios y sube la data, si se hace otro login igual no crea un
nuevo dato sino que pasa de largo, verificando que existe el dato(por lo 
que se puede editar para rellenar valores que no da github predeterminadamente)
