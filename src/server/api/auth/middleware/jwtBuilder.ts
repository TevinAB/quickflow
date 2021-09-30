import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

//for auth routes only
export default function jwtBuilder(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (process.env.JWT_SECRET) {
    const { firstName, lastName, orgId, roleId, email, profileId } =
      request.middlewareInfo.jwtData;

    const token = jwt.sign(
      { firstName, lastName, orgId, roleId, email, profileId },
      process.env.JWT_SECRET
    );

    request.middlewareInfo.response.token = token;
    next();
  } else {
    response.status(500).json({ message: 'No secret found.' });
  }
}
