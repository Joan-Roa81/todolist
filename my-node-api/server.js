const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json()); // Para manejar JSON en las solicitudes

app.use('/api', routes);

// Conectar a la base de datos y arrancar el servidor
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('API RESTful está corriendo en http://localhost:3000');
  });
}).catch((error) => {
  console.log('Error al conectar a la base de datos:', error);
});
