import { Sequelize } from 'sequelize';
const config = require('../configs/env.conf');

const sequelize = new Sequelize(config.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connect = async () => {
  // TODO
  try {
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (err) {
    console.log('Connecting database failed');
    return process.exit(1);
  }
  return null;
};

module.exports = { connect, sequelize };
