import { Album } from '../models/db.model';

export interface AlbumRes extends Omit<Album, 'userId'> {
  user: {
    id: number;
    name: string;
  };
  files: {
    id: number;
    name: string;
    private: boolean;
  }[];
}
