const { DataTypes } = require('sequelize');
const sequelize = require('../db');  // Asegúrate de que este archivo configure tu conexión con PostgreSQL

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,  // Asumiendo que el ID es un entero
    primaryKey: true,         // Si el campo id es la clave primaria
    autoIncrement: true,      // Si es auto incremental
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,         // Asegúrate de que el título no sea nulo
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,      // Asumiendo que el valor predeterminado es false
  }
}, {
  timestamps: false, 
  tableName: 'tareas',  // Nombre de la tabla ya existente
  underscored: true,      // Si usas nombres de columnas con guiones bajos en lugar de PascalCase
});

module.exports = Task;