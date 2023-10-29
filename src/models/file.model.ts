import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/db.service';

class CFile extends Model {
  declare id: number;
  declare name: string;
  declare storageKey: string;
  declare private: boolean;
  declare userId: number;
  declare url?: string;
}

CFile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      type: DataTypes.INTEGER,
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
