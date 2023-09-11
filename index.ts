const config = require('./src/configs/env.conf');
const app = require('./app');
const dbService = require('./src/services/db.service');

const start = async () => {
  await dbService.connect();
  app.listen(config.PORT, () => {
    console.log(`Server is running at port ${config.PORT}`);
  });
};

start();
