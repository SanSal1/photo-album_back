const User = require('./user.model');

User.sync({ alter: true });

module.exports = {
  User,
};
