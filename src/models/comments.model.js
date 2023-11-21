import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Comments = sequelize.define(
  'comments',
  {
    id: {
      field: 'id',
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    itemId: {
      field: 'item_id',
      type: DataTypes.UUID,
      allowNull: false,
    },
    fromUser: {
      field: 'user_id',
      type: DataTypes.UUID,
      allowNull: false,
    },
    text: {
      field: 'text',
      type: new DataTypes.STRING(500),
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

function commentsAssociate(models) {
  Comments.belongsTo(models.items, {
    onDelete: 'CASCADE',
    foreignKey: {
      name: 'item_id',
      allowNull: false,
    },
  });

  Comments.belongsTo(models.users, {
    onDelete: 'CASCADE',
    foreignKey: {
      name: 'user_id',
      allowNull: false,
    },
  });
}

export { Comments, commentsAssociate };
