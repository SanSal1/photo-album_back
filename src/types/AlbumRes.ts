import { Album } from '../models/db.model';

export interface AlbumRes extends Omit<Album, 'userId'> {
  user: {
    id: string;
    name: string;
  };
  files: {
    id: string;
    name: string;
    private: boolean;
  }[];
}
