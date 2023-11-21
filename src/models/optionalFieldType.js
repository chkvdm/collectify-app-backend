import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const OptionalFieldType = sequelize.define(
  'optional_field_type',
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
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    fieldName: {
      field: 'field_name',
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    fieldType: {
      field: 'field_type',
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

function optionalFieldTypeAssociate(models) {
  OptionalFieldType.belongsTo(models.collections, {
    onDelete: 'CASCADE',
    foreignKey: {
      name: 'collection_id',
      allowNull: false,
    },
  });
}

export { OptionalFieldType, optionalFieldTypeAssociate };
