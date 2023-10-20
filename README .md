
# "stockManager" Backend.


Un sistema de inventario basico para almacenar productos de forma facil. Desarrollado con nodejs y mongo db

la versión de nodjs es v18.18.2 y npm v10.2.0

## Instalación

Debe de descargar el sistema y dentro de la carpeta de este ejecutar el comando npm install.

```bash
  npm install
```

Luego debe crear un archivo .env para configurar el puerto y la base de datos MongoDB

```javascript
PORT = 3000
MONGO_DB = direccion_de_la_bd_en_MONGO_DB
```

Para arrancar el sistema se debe ejecutar en la consola el comando:
```bash
  npm start
```

## Endpoints
### GET - /api/productos/
Devuelve la lista de productos almacenados en la BD
### GET - /api/productos/:id
Devuelve un producto en especifico a traves de la ID
### GET - /api/productos/buscar/:nombre
Busca un producto a traves del nombre y lo devuelve como respuesta
### GET - /api/productos/categoria/:categoria
Devuelve la lista de productos filtrados por la categoria
### POST - /api/productos/
Endpoint que se utiliza para agregar un producto al servidor
### PUT - /api/productos/:id
Se utiliza para editar los datos de un producto en especifico a traves de la ID, la id se envia a traves de la url
### PUT - /api/productos/imagen/:id
Se utiliza para cambiar la imagen de un producto a traves de su id
### DELETE - /api/productos/:id
Se utiliza para eliminar un producto en especifico a traves de la ID, la id se envia a traves de la url