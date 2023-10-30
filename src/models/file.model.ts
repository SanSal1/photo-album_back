import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/db.service';

class CFile extends Model {
  declare id: string;
  declare name: string;
  declare storageKey: string;
  declare private: boolean;
  declare userId: string;
  declare url?: string;
}

CFile.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storageKey: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'file',
  }
);

export default CFile;
