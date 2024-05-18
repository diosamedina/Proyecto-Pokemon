const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },  // Puede ser automático
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: false });  // Para que Sequelize no cree automáticamente las columnas createdAt y updatedAt en el modelo de tabla de base de datos
};