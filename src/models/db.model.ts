import Album from './album.model';
import CFile from './file.model';
import AlbumFile from './albumFile.model';
import User from './user.model';

User.hasMany(Album);
Album.belongsTo(User);

User.hasMany(CFile);
CFile.belongsTo(User);

Album.belongsToMany(CFile, { through: AlbumFile });
CFile.belongsToMany(Album, { through: AlbumFile });

User.sync({ alter: true });
Album.sync({ alter: true });
CFile.sync({ alter: true });
AlbumFile.sync({ alter: true });

export { User, Album, CFile, AlbumFile };
