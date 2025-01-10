const { Sequelize } = require('sequelize');
const config = require('./config.js');

// Configuración de Sequelize para la base de datos PostgreSQL
const sequelize = new Sequelize(config.development);

module.exports = sequelize;