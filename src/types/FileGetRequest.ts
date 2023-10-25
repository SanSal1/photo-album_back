import { CRequest } from './CRequest';

export interface FileGetRequest extends CRequest {
  query: {
    userId?: string;
  };
}
