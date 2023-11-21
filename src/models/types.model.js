import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Types = sequelize.define(
  'types',
  {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    type: {
      field: 'type',
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: false,
  }
);

export { Types };
