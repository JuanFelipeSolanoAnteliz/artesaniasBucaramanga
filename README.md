MONGODB_URI= URI valentina
MONGODB_DB_NAME= nombre db

instalar:
npm i mongoose
npm i dotenv


APIs:

primero activar server :

´´´
npm run dev:server
´´´




# APIS PARA USERS:


GET http://localhost:5001/users/getAllUsers (se puede dar click y ver)




POST http://localhost:5001/users/newUser (user body en thunderClient)
body:
´´´
{
    "nombre": "Juan Pérez",
    "correo": "juan.perez@example.com",
    "contraseña": "miContraseñaSegura",
    "fotoPerfil": "url_a_la_foto",
    "direccion": "Calle Falsa 123",
    "telefono": "1234567890",
    "tipo": "comprador"
}
´´´




PUT http://localhost:5001/users/updateUser/:id (user body en thunderClient)

el editar puede editar cualquier campo del dato desde uno solo, hasta todo, las unicas condiciones son, ajustar el id ejemplo:

http://localhost:5001/users/updateUser/672b784954bc940d9200e06f

y en body:

{
  "_id": {
    "$oid": "5f3e5f4c2c0e4a1d4c8b4575"
  },
  "nombre": "Carlos Méndez",
  "correo": "carlos.mendez@example.com",
  "contraseña": "$2a$10$PmfVghukfkgkfbdhfhPhU3rdKhHvghgkj45j.PgghH5yH",
  "fotoPerfil": "https://example.com/foto/carlos.jpg",
  "direccion": "Avenida 45, Armenia",
  "telefono": "3201234567",
  "tipo": "artesano",
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
    "nombre": "Juan Pérez",
    "correo": "juan.perez@example.com",
    "contraseña": "miContraseñaSegura",
    "fotoPerfil": "url_a_la_foto",
    "direccion": "Calle Falsa 123",
    "telefono": "1234567890",
    "tipo": "comprador"
}

o incluso:

{
    "correo": "juan.perez@example.com"
}