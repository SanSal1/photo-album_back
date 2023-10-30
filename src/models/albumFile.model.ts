import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/db.service';

class AlbumFile extends Model {
  declare id: string;
  declare albumId: string;
  declare fileId: string;
}

AlbumFile.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    albumId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'albums', key: 'id' },
    },
    fileId: {
      type: DataTypes.UUID,
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
