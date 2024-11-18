Para poder correr el proyecto:
- npm i (Descargar dependencias)
- npm run dev 


ARTESANIAS API DOCUMENTATION:


**PRODUCTS**

**Get all products**

**Method**: GET

**URL**: `http://localhost:5001/products`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Responses**:

- Code: 200 OK

```json
{
  "status": 200,
  "message": "products fetched correctly",
  "data": [
    {
      "_id": "64f2c111fc13ae1b23000010",
      "nombre": "Maceta de Cerámica",
      "descripcion": "Maceta pintada a mano para plantas pequeñas.",
      "precio": 22,
      "categoria": "Jardinería",
      "fotos": [
        "https://example.com/fotos/maceta1.jpg"
      ],
      "stock": 12,
      "artesanoId": "5f3e5f4c2c0e4a1d4c8b4572"
    },
    ...
   ]
}
```

- Code: 404 Not Found

```json
{
  "status": 404,
  "message": "there is no products to fecth"
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error al obtener los productos",
  "error": {}
}
```

**Add a new product:**

**Method**: POST

**URL**: `http://localhost:5001/products`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Body**:

```json
{
      "nombre":string,
      "descripcion": string,
      "precio": integrer number,
      "categoria": string,
      "fotos": [
        string (url)
      ],
      "stock": integrer number
}
```

**Responses**:

- Code: 200 OK

```json
{
  "status": 200,
  "message": "products fetched correctly",
  "data": [
    {
      "_id": "64f2c111fc13ae1b23000010",
      "nombre": "Maceta de Cerámica",
      "descripcion": "Maceta pintada a mano para plantas pequeñas.",
      "precio": 22,
      "categoria": "Jardinería",
      "fotos": [
        "https://example.com/fotos/maceta1.jpg"
      ],
      "stock": 12,
      "artesanoId": "5f3e5f4c2c0e4a1d4c8b4572"
    },
    ...
   ]
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error while adding the product",
  "error": {
    "errors": {
      "artesanoId": {
        "name": "ValidatorError",
        "message": "Path `artesanoId` is required.",
        "properties": {
          "message": "Path `artesanoId` is required.",
          "type": "required",
          "path": "artesanoId"
        },
        ...
    },
    "_message": "productos validation failed",
    "name": "ValidationError",
    "message": "productos validation failed: artesanoId: Path `artesanoId` is required., stock: Path `stock` is required., categoria: Path `categoria` is required., precio: Path `precio` is required., descripcion: Path `descripcion` is required., nombre: Path `nombre` is required."
  }
}aa
```

**Add a new voucher:**

**Method**: POST

**URL**: `http://localhost:5001/vouchers` 

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Body**:

```json
{
  "codigo": string,
  "descuento": integrer number,
  "tipo": ['asignado a usuario', 'general'],
  "fechaExpiracion": ISO DATE ex:"2024-12-31T23:59:59.000Z",
  "usuarioId": ['null', ObjectId]
}
```

**Responses**:

- Code: 200 OK

```json
{
  "status": 200,
  "message": "products fetched correctly",
  "data": [
    {
      "_id": "64f2c111fc13ae1b23000010",
      "nombre": "Maceta de Cerámica",
      "descripcion": "Maceta pintada a mano para plantas pequeñas.",
      "precio": 22,
      "categoria": "Jardinería",
      "fotos": [
        "https://example.com/fotos/maceta1.jpg"
      ],
      "stock": 12,
      "artesanoId": "5f3e5f4c2c0e4a1d4c8b4572"
    },
    ...
   ]
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error while adding the product",
  "error": {
    "errors": {
      "artesanoId": {
        "name": "ValidatorError",
        "message": "Path `artesanoId` is required.",
        "properties": {
          "message": "Path `artesanoId` is required.",
          "type": "required",
          "path": "artesanoId"
        },
        ...
    },
    "_message": "productos validation failed",
    "name": "ValidationError",
    "message": "productos validation failed: artesanoId: Path `artesanoId` is required., stock: Path `stock` is required., categoria: Path `categoria` is required., precio: Path `precio` is required., descripcion: Path `descripcion` is required., nombre: Path `nombre` is required."
  }
}
```

**Get Products by description or name**

**Method**: GET

**URL**: `http://localhost:5001/products/search?searchTerm=texto a buscar`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Responses**:

- Code: 200 OK

```json
{
  "status": 200,
  "message": "Products fetched correctly",
  "data": [
    {
      "_id": "64f2c111fc13ae1b23000010",
      "nombre": "Maceta de Cerámica",
      "descripcion": "Maceta pintada a mano para plantas pequeñas.",
      "precio": 22,
      "categoria": "Jardinería",
      "fotos": [
        "https://example.com/fotos/maceta1.jpg"
      ],
      "stock": 12,
      "artesanoId": "5f3e5f4c2c0e4a1d4c8b4572"
    },
    {
      "_id": "672b75a9a636875332f2d508",
      "nombre": "Maceta de Cerámica",
      "descripcion": "Maceta pintada a mano para plantas pequeñas.",
      "precio": 22,
      "categoria": "Jardinería",
      "fotos": [
        "https://example.com/fotos/maceta1.jpg"
      ],
      "stock": 12,
      "artesanoId": "5f3e5f4c2c0e4a1d4c8b4572"
    }
  ]
}
```

- Code: 404 Not Found

```json
{
  "status": 404,
  "message": "No matching product found",
  "data": []
}
```

- Code: 400 Bad request

```json
{
  "status": 400,
  "message": "Search param is not valid"
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error at fetch products",
  "error": {}
}
```

**Get Products by category**

**Method**: GET

**URL**: `http://localhost:5001/products/:category`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Responses**:

- Code: 200 OK

```json
{
  "status": 200,
  "message": "Products fetched correctly",
  "data": [
    {
      "_id": "64f2c111fc13ae1b23000010",
      "nombre": "Maceta de Cerámica",
      "descripcion": "Maceta pintada a mano para plantas pequeñas.",
      "precio": 22,
      "categoria": "Jardineria",
      "fotos": [
        "https://example.com/fotos/maceta1.jpg"
      ],
      "stock": 12,
      "artesanoId": "5f3e5f4c2c0e4a1d4c8b4572"
    },
    {
      "_id": "672b75a9a636875332f2d508",
      "nombre": "Maceta de Cerámica",
      "descripcion": "Maceta pintada a mano para plantas pequeñas.",
      "precio": 22,
      "categoria": "Jardineria",
      "fotos": [
        "https://example.com/fotos/maceta1.jpg"
      ],
      "stock": 12,
      "artesanoId": "5f3e5f4c2c0e4a1d4c8b4572"
    }
  ]
}
```

- Code: 404 Not Found

```json
{
  "status": 404,
  "message": "No products found in this category",
  "data": []
}
```

- Code: 400 Bad request

```json
{
  "status": 400,
  "message": "Search param is not valid"
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error at fetch products",
  "error": {}
}
```

**Get workshops by description, name, location or modality**

**Method**: GET

**URL**: `http://localhost:5001/workshops?searchTerm=texto a buscar`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Responses**:

- Code: 200 OK

```json
{
  "message": "Workshops fetched successfully",
  "data": [
    {
      "_id": "64f2c111fc13ae1b23000031",
      "nombre": "Taller de Galletas Decoradas",
      "descripcion": "Crea deliciosas galletas decoradas utilizando técnicas de repostería.",
      "modalidad": "presencial",
      "fechaInicio": "2024-12-05T00:00:00.000Z",
      "fechaFin": "2024-12-19T00:00:00.000Z",
      "duracion": "2 semanas",
      "materialesProporcionados": [
        "Masa para galletas",
        "Glaseado",
        "Moldes"
      ],
      "materialesRequeridos": [
        "Rodillo",
        "Cortadores"
      ],
      "documental": "https://ejemplo.com/documental-galletas",
      "artesanoId": "5f3e5f4c2c0e4a1d4c8b4573",
      "ubicacion": "Cra 27 - 41 #1-23"
    }
  ]
}
```

- Code: 404 Not Found

```json
{
  "message": "No workshops found matching the search term",
  "data": []
}
```

- Code: 400 Bad request

```json
{
  "satus": 400,
  "message": "Search term is required"
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error searching for workshops",
  "error": {}
}
```

**Get all discounts**

**Method**: GET

**URL**: `http://localhost:5001/products/discounts`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Responses**:

- Code: 200 OK

```json
{
  "status": 200,
  "message": "discounts fetched correctly",
  "data": [
    {
      "_id": "64f2c111fc13ae1b23000007",
      "nombre": "Cojín Bordado",
      "descripcion": "Cojín bordado con motivos tradicionales.",
      "precio": 35,
      "categoria": "Hogar",
      "fotos": [
        "https://example.com/fotos/cojin1.jpg"
      ],
      "stock": 8,
      "artesanoId": "5f3e5f4c2c0e4a1d4c8b4572",
      "descuento": 25
    }
    ...
   ]
}
```

- Code: 404 Not Found

```json
{
  "status": 404,
  "message": "there is no products to fecth"
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error al obtener los productos",
  "error": {}
}
```

**Get all Vouchers (general and asigned to the user logged in)** 

**Method**: GET

**URL**: `http://localhost:5001/vouchers`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Responses**:

- Code: 200 OK

```json
{
  "status": 200,
  "message": "Vouchers fetched correctly.",
  "data": [
    {
      "_id": "64f2c111fc13ae1b23000011",
      "codigo": "DESCUENTO10",
      "descuento": 10,
      "tipo": "general",
      "fechaExpiracion": "2025-12-31T23:59:59.000Z",
      "usuarioId": null
    },
    ...
   ]
}
```

- Code: 404 Not Found

```json
{
  "status": 404,
  "message": "there are no vouchers available"
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error while fetching vouchers",
  "error": {}
}
```

**Remove from favorites**

**Method**: delete

**URL**: [`http://localhost:5001/product](http://localhost:5001/products/64f2c111fc13ae1b23000007)s/:productId`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Responses**:

- Code: 214

```json

{
  "status": 214,
  "message": "Product removed from favorites successfully",
  "data": {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  }
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error while removing from favorites",
  "error": {}
}
```

**Add to favorites**

**Method**: post

**URL**: [`http://localhost:5001/product](http://localhost:5001/products/64f2c111fc13ae1b23000007)s/:productId`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Responses**:

- Code: 200 OK

```json

{
  "status": 214,
  "message": "Product added to favorites successfully",
  "data": {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  }
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error while adding to favorites",
  "error": {}
}
```

**Get all Vouchers (general and asigned to the user logged in)** 

**Method**: GET

**URL**: `http://localhost:5001/vouchers`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Responses**:

- Code: 200 OK

```json
{
  "status": 200,
  "message": "Vouchers fetched correctly.",
  "data": [
    {
      "_id": "64f2c111fc13ae1b23000011",
      "codigo": "DESCUENTO10",
      "descuento": 10,
      "tipo": "general",
      "fechaExpiracion": "2025-12-31T23:59:59.000Z",
      "usuarioId": null
    },
    ...
   ]
}
```

- Code: 404 Not Found

```json
{
  "status": 404,
  "message": "there are no vouchers available"
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error while fetching vouchers",
  "error": {}
}
```

**Get all workshops**

**Method**: GET

**URL**: `http://localhost:5001/workshops/all`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Responses**:

- Code: 200 OK

```json
{
  "status": 200,
  "message": "workshops fetched sucessfully",
  "data": [
    {
      "_id": "64f2c111fc13ae1b23000026",
      "nombre": "Taller de Pintura",
      "descripcion": "Explora técnicas de pintura acrílica y acuarela para expresar tu creatividad.",
      "modalidad": "presencial",
      "fechaInicio": "2024-11-05T00:00:00.000Z",
      "fechaFin": "2024-11-19T00:00:00.000Z",
      "duracion": "2 semanas",
      "materialesProporcionados": [
        "Pinturas acrílicas",
        "Pinceles",
        "Lienzos"
      ],
      "materialesRequeridos": [
        "Paleta",
        "Agua",
        "Trapo"
      ],
      "documental": "https://ejemplo.com/documental-pintura",
      "artesanoId": "5f3e5f4c2c0e4a1d4c8b4568",
      "ubicacion": "Crr 37 - 34 #1-33"
    },
    ...
}
```

- Code: 404 Not Found

```json
{
  "message": "No workshops found",
  "data": []
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error while fetching workshops",
  "error": {}
}
```

**Get disocunts by category**

**Method**: GET

**URL**: `http://localhost:5001/products/discounts/:category`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Responses**:

- Code: 200 OK

```json
{
  "status": 200,
  "message": "discounts fetched correctly",
  "data": [
    {
      "_id": "64f2c111fc13ae1b23000007",
      "nombre": "Cojín Bordado",
      "descripcion": "Cojín bordado con motivos tradicionales.",
      "precio": 35,
      "categoria": "Hogar",
      "fotos": [
        "https://example.com/fotos/cojin1.jpg"
      ],
      "stock": 8,
      "artesanoId": "5f3e5f4c2c0e4a1d4c8b4572",
      "descuento": 25
    }
    ...
   ]
}
```

- Code: 404 Not Found

```json
{
  "status": 404,
  "message": "there is no products to fecth"
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error al obtener los productos",
  "error": {}
}
```

**add Order** 

**Method**: POST

**URL**: [`http://localhost:5001/](http://localhost:5001/products/64f2c111fc13ae1b23000007)orders/`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Body**:

```json
{
  "productos":[
      {
        
        "productoId":"64f2c111fc13ae1b23000008",
        "cantidad":4

      },
      {
        "productoId":"64f2c111fc13ae1b23000008",
        "cantidad":4
      }
    ],
    
    //(opcional)
    {
	    voucher: "objectId"
    }
    
}
```

**Responses**:

- Code: 200 OK

```json

{
  "status": 200,
  "message": "Order added correctly",
  "data": {
    "usuarioId": "6730348ef39c6117a094b829",
    "productos": [
      {
        "productoId": "64f2c111fc13ae1b23000008",
        "cantidad": 4
      },
      {
        "productoId": "64f2c111fc13ae1b23000008",
        "cantidad": 4
      }
    ],
    "total": 120,
    "fecha": "2024-11-15T03:16:29.629Z",
    "estado": "pendiente",
    "_id": "6736bd0d8bcf5503e2c527c4"
  }
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error while adding order",
  "error": {}
}
```

**Get Cart**

**Method**:GET

**URL**: [`http://localhost:5001/](http://localhost:5001/products/64f2c111fc13ae1b23000007)orders/`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Responses**:

- Code: 200 OK

```json

{
  "status": 200,
  "message": "product fetched successfully",
  "data": {
    "_id": "6733b92cfd0440cb0ea3e438",
    "carrito": [
      "64f2c111fc13ae1b23000008"
    ]
  }
}
```

```json

{
  "status": 200,
  "message": "product fetched successfully",
  "data": {
    "_id": "6733b92cfd0440cb0ea3e438",
    "carrito": [
      "64f2c111fc13ae1b23000008"
    ]
  }
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error while fetching products from cart",
  "error": {}
}
```

**Add to favorites**

**Method**: PUT

**URL**: [`http://localhost:5001/](http://localhost:5001/products/64f2c111fc13ae1b23000007)orders/removeFromCart/:id`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Responses**:

- Code: 200 OK

```json

{
  "status": 214,
  "message": "Product removed from cart",
  "data": {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  }
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error while removing from cart",
  "error": {}
}
```

**Add to cart**

**Method**: PUT

**URL**: [`http://localhost:5001/](http://localhost:5001/products/64f2c111fc13ae1b23000007)orders/addToCart/:id`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Responses**:

- Code: 200 OK

```json

{
  "status": 214,
  "message": "Product added to cart",
  "data": {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  }
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error while addding to cart",
  "error": {}
}
```

**Get one workshop**

**Method**: GET

**URL**: `http://localhost:5001/workshops/:id`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Responses**:

- Code: 200 OK

```json
{
  "status": 200,
  "message": "workshops fetched sucessfully",
  "data": {
    "_id": "64f2c111fc13ae1b23000029",
    "nombre": "Taller de Aromaterapia",
    "descripcion": "Aprende sobre el uso de aceites esenciales y sus beneficios para la salud.",
    "modalidad": "virtual",
    "fechaInicio": "2024-11-10T00:00:00.000Z",
    "fechaFin": "2024-11-24T00:00:00.000Z",
    "duracion": "2 semanas",
    "materialesProporcionados": [
      "Muestras de aceites",
      "Guía de uso"
    ],
    "materialesRequeridos": [
      "Botellas",
      "Etiquetas"
    ],
    "documental": "https://www.terapeutasdechile.cl/imagenes/talleres/imagen-ID-81888413.jpg",
    "artesanoId": "5f3e5f4c2c0e4a1d4c8b4575",
    "ubicacion": null
  }
}
```

- Code: 404 Not Found

```json
{
  "message": "No workshops found matching the search term",
  "data": []
}
```

- Code: 400 Bad request

```json
{
  "satus": 400,
  "message": "Search term is required"
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "Error searching for workshops",
  "error": {}
}
```

**Get favorites**

**Method**: GET

**URL**: `http://localhost:5001/products/getFavs`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Responses**:

- Code: 200 OK

```json
{
  "status": 200,
  "mesasge": "products fetched successfully",
  "data": [
    {
      "_id": "64f2c111fc13ae1b23000007",
      "nombre": "Cojín Bordado",
      "descripcion": "Cojín bordado con motivos tradicionales.",
      "precio": 35,
      "categoria": "Bordado",
      "fotos": [
        "https://i.pinimg.com/originals/94/4d/ea/944deafcf7b75c87c597bc3904d8622c.jpg"
      ],
      "stock": 8,
      "artesanoId": "5f3e5f4c2c0e4a1d4c8b4572",
      "descuento": 25
    }
    ...
   ]
}
```

- Code: 404 Not Found

```json
{
  "status": 404,
  "message": "There are not products in favorites listh"
}
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "error while fetching products",
  "error": {}
}
```

**Get purchases**

**Method**: GET

**URL**: `http://localhost:5001/products/getPurchases`

**Auth required**: True

**Headers**:

```json
{ 
	"Content-Type": "application/json", 
	"x-version": "1.0.0" 
}
```

**Responses**:

- Code: 200 OK

```json
{
  "status": 200,
  "mesasge": "products fetched successfully",
  "data": [
    {
      "_id": "64f2c111fc13ae1b23000020",
      "usuarioId": "5f3e5f4c2c0e4a1d4c8b4574",
      "productos": [
        {
          "productoId": "64f2c111fc13ae1b23000008",
          "cantidad": 4,
          "precio": 15
        }
      ],
      "total": 60,
      "fecha": "2024-11-01T00:00:00.000Z",
      "estado": "pendiente"
    }
    ...
   ]
}
```

- Code: 404 Not Found

```json
{
  "status": 404,
  "message": "There are not products in purchases list"
}F
```

- Code: 401 unathorized

```json
{
  "status": 401,
  "message": "JWT not provided"
}
```

- Code: 500 Server error

```json
{
  "message": "error while fetching products",
  "error": {}
}
```


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
**URL**: `http://localhost:5001/users/updateUser`  
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
  
0 commit comments
Comments
0
 (0)
Comment
You're not receiving notifications from this thread.