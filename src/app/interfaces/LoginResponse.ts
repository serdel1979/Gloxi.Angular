export interface LoginResponse {
    token: string;
    expiration: string;
    email: string;
    roles: string[];
  }