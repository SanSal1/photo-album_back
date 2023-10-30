import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services/db.service';
import Role from '../types/Role';

class User extends Model {
  declare id: string;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: Role;
}

User.init(
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
