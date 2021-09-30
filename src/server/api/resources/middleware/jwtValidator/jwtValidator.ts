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
        firstName: decode.firstName,
        lastName: decode.lastName,
        email: decode.email,
        profileId: decode.profileId,
        roleId: decode.roleId,
        orgId: decode.orgId,
      };

      next();
    } catch (error) {
      response.status(401).json({ message: 'Unauthorized.' });
    }
  } else {
    response.status(500).json({ message: 'No secret found.' });
  }
}
