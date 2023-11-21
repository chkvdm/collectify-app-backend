import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Collections = sequelize.define(
  'collections',
  {
    id: {
      field: 'id',
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    userId: {
      field: 'user_id',
      type: DataTypes.UUID,
      allowNull: false,
    },
    collectionName: {
      field: 'collection_name',
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      field: 'description',
      type: new DataTypes.STRING(5000),
      allowNull: false,
    },
    theme: {
      field: 'theme',
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    image: {
      field: 'image',
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

function collectionAssociate(models) {
  Collections.belongsTo(models.users, {
    onDelete: 'CASCADE',
    foreignKey: {
      name: 'user_id',
      allowNull: false,
    },
  });

  Collections.hasMany(models.items, {
    onDelete: 'CASCADE',
    foreignKey: 'collection_id',
  });

  Collections.hasMany(models.optionalFieldType, {
    onDelete: 'CASCADE',
    foreignKey: 'collection_id',
  });
}

export { Collections, collectionAssociate };
