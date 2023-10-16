import { PORT } from './src/configs/env.conf';
import app from './src/app';
import { connect } from './src/services/db.service';

const start = async () => {
  await connect();
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
};

start();
