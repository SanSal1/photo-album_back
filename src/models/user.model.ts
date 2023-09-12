import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/db.service';

class User extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
  declare isAdmin: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'user',
  }
);

export default User;
