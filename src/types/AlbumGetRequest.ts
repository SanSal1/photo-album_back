import { CRequest } from './CRequest';

export interface AlbumGetRequest extends CRequest {
  query: {
    userId?: string;
  };
}
