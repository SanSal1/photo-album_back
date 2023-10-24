import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/db.service';

class CFile extends Model {
  declare id: number;
  declare name: string;
  declare userId: number;
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
      unique: true,
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
