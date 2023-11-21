import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Themes = sequelize.define(
  'themes',
  {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    theme: {
      field: 'theme',
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: false,
  }
);

export { Themes };
