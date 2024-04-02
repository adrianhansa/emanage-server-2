interface User {
  id: string;
  isAdmin?: boolean;
  accessLevel?: number;
}

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
