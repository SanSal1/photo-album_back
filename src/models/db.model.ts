import User from './user.model';

User.sync({ alter: true });

export { User };
