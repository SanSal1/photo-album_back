import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/db.service';
import Role from '../types/Role';

class User extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
  declare role: Role;
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
    role: {
      type: DataTypes.ENUM({
        values: [Role.Basic, Role.Admin],
      }),
      defaultValue: Role.Basic,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'user',
  }
);

export default User;
