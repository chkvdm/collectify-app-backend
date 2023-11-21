import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Items = sequelize.define(
  'items',
  {
    id: {
      field: 'id',
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    collectionId: {
      field: 'collection_id',
      type: DataTypes.UUID,
      allowNull: false,
    },
    itemName: {
      field: 'item_name',
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    underscored: true,
  }
);

function itemsAssociate(models) {
  Items.hasMany(models.comments, {
    onDelete: 'CASCADE',
    foreignKey: 'item_id',
  });

  Items.hasMany(models.optionalFieldValue, {
    onDelete: 'CASCADE',
    foreignKey: 'item_id',
  });

  Items.hasMany(models.likes, {
    onDelete: 'CASCADE',
    foreignKey: 'to_item',
  });

  Items.belongsTo(models.collections, {
    onDelete: 'CASCADE',
    foreignKey: {
      name: 'collection_id',
      allowNull: false,
    },
  });
}

export { Items, itemsAssociate };
