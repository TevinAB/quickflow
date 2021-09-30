import { NotificationType, TimelineBody } from '..';
import { Role } from '../../api/resources/customizable/roleModel';

declare module 'express-serve-static-core' {
  interface Request {
    middlewareInfo: {
      //store data obtained from google token
      gmailInfo: {};

      //used to store data for creating a jwt or for storing data pulled from a jwt
      jwtData:
        | {
            firstName: string;
            lastName: string;
            email: string;
            profileId: any;
            roleId: any;
            orgId: any;
          }
        | { [key: string]: any };

      //used to setup an 'organization' when a user signs up
      orgSetupData:
        | {
            orgId: any;
            roleId: any;
          }
        | { [key: string]: any };

      //used by responder to build final response if need be.
      response:
        | {
            token: string;
            data: any;
          }
        | { [key: string]: any };

      //store role permissions for roleAuthorizer middleware to use
      userRole: { [key: string]: any };

      //data used to add notification to profiles
      notifData:
        | {
            profileId: any;
            notifType: NotificationType;
            title: '';
          }
        | { [key: string]: any };

      //data used to add timeline items
      timelineData:
        | {
            //ids for all timelines to be updated
            timelineIds: [];

            //the id of the timeline that needs to be returned, if any
            timelineToReturn: any;

            addResponse: boolean;
            title: string;
            itemType: 'email' | 'note' | 'task' | 'event' | 'other';
            itemBody: TimelineBody;
          }
        | { [key: string]: any };

      deletePipeline: boolean;
    };
  }
}
