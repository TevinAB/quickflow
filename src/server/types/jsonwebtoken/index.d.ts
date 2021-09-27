import { Secret, VerifyOptions } from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    firstName: string;
    lastName: string;
    email: string;
    profileId: string;
    roleId: string;
    orgId: string;
  }

  function verify(
    token: string,
    secretOrPublicKey: Secret,
    options?: VerifyOptions
  ): JwtPayload;
}
