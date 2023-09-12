import { Sequelize } from 'sequelize';
import { DATABASE_URL } from '../configs/env.conf';

export const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (err) {
    console.log('Connecting database failed');
    return process.exit(1);
  }
  return null;
};
