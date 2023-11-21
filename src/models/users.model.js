import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Users = sequelize.define(
  'users',
  {
    id: {
      field: 'id',
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    email: {
      field: 'email',
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      field: 'password',
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      field: 'name',
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

function usersAssociate(models) {
  Users.hasMany(models.collections, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id',
  });

  Users.hasMany(models.comments, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id',
  });

  Users.hasMany(models.likes, {
    onDelete: 'CASCADE',
    foreignKey: 'from_user',
  });
}

export { Users, usersAssociate };
