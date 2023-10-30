import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/db.service';

class Album extends Model {
  declare id: string;
  declare name: string;
  declare private: boolean;
  declare userId: string;
}

Album.init(
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
    modelName: 'album',
  }
);

export default Album;
