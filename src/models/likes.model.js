import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Likes = sequelize.define(
  'likes',
  {
    id: {
      field: 'id',
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    toItem: {
      field: 'to_item',
      type: DataTypes.UUID,
      allowNull: false,
    },
    fromUser: {
      field: 'from_user',
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

function likesAssociate(models) {
  Likes.belongsTo(models.items, {
    onDelete: 'CASCADE',
    foreignKey: {
      name: 'to_item',
      allowNull: false,
    },
  });

  Likes.belongsTo(models.users, {
    onDelete: 'CASCADE',
    foreignKey: {
      name: 'from_user',
      allowNull: false,
    },
  });
}

export { Likes, likesAssociate };
