import { Secret, VerifyOptions } from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    first_name: string;
    last_name: string;
    email: string;
    profile_id: string;
    role_id: string;
    org_id: string;
  }

  function verify(
    token: string,
    secretOrPublicKey: Secret,
    options?: VerifyOptions
  ): JwtPayload;
}
