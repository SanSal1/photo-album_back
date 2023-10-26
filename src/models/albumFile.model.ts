import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/db.service';

class AlbumFile extends Model {
  declare id: number;
  declare albumId: number;
  declare fileId: number;
}

AlbumFile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'albums', key: 'id' },
    },
    fileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'files', key: 'id' },
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'album_file',
  }
);

export default AlbumFile;
