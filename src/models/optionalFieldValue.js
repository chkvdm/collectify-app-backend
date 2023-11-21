import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const OptionalFieldValue = sequelize.define(
  'optional_field_value',
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
    fieldName: {
      field: 'field_name',
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    value: {
      field: 'value',
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

function optionalFieldValueAssociate(models) {
  OptionalFieldValue.belongsTo(models.items, {
    onDelete: 'CASCADE',
    foreignKey: {
      name: 'item_id',
      allowNull: false,
    },
  });
}

export { OptionalFieldValue, optionalFieldValueAssociate };
