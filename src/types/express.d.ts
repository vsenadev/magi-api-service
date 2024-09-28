import { ILoginPayload } from '@src/model/Login.model';

declare global {
  namespace Express {
    interface Request {
      user?: ILoginPayload;
    }
  }
}
