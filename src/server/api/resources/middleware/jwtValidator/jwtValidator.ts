import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

//for resource routes
export default function jwtValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (process.env.JWT_SECRET) {
    const token = request.header('x-auth-token') || '';

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      request.middlewareInfo.jwtData = {
        first_name: decode.first_name,
        last_name: decode.last_name,
        email: decode.email,
        profile_id: decode.profile_id,
        role_id: decode.role_id,
        org_id: decode.org_id,
      };

      next();
    } catch (error) {
      next(error);
    }
  } else {
    response.status(500).json({ message: 'No secret found.' });
  }
}
