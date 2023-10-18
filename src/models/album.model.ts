import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/db.service';

class Album extends Model {
  declare id: number;
  declare name: string;
  declare private: boolean;
  declare userId: number;
  // declare images: Array<T>;
}

Album.init(
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
    modelName: 'album',
  }
);

export default Album;
