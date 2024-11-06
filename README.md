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



http://localhost:5001/users/getAllUsers (se puede dar click y ver)




http://localhost:5001/users/newUser (user body en thunderClient)
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