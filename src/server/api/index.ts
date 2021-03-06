//combine routes from auth and resources
import { Router, Request, Response, NextFunction } from 'express';
import authRoutes from './auth';
import resourceRoutes from './resources';
import responder from './middleware/responder/responder';

const apiRoutes = Router();

//setup middlewareInfo object
apiRoutes.use(function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  request.middlewareInfo = {
    gmailInfo: {},
    orgSetupData: {},
    jwtData: {},
    response: {
      data: {},
      token: {},
    },
    userRole: {},
    notifData: {},
    timelineData: {},
    deletePipeline: false,
  };
  next();
});

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/resource', resourceRoutes);
apiRoutes.use(responder);

export default apiRoutes;
