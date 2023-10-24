import Album from './album.model';
import CFile from './file.model';
import User from './user.model';

User.hasMany(Album);
Album.belongsTo(User);

User.hasMany(CFile);
CFile.belongsTo(User);

User.sync({ alter: true });
Album.sync({ alter: true });
CFile.sync({ alter: true });

export { User, Album, CFile };
