import Album from './album.model';
import User from './user.model';

User.hasMany(Album);
Album.belongsTo(User);

User.sync({ alter: true });
Album.sync({ alter: true });

export { User, Album };
