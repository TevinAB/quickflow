import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

//for auth routes only
export default function jwtBuilder(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (process.env.JWT_SECRET) {
    const { first_name, last_name, org_id, role_id, email, profile_id } =
      request.middlewareInfo.jwtData;

    const token = jwt.sign(
      { first_name, last_name, org_id, role_id, email, profile_id },
      process.env.JWT_SECRET
    );

    request.middlewareInfo.response.token = token;
    next();
  } else {
    response.status(500).json({ message: 'No secret found.' });
  }
}
