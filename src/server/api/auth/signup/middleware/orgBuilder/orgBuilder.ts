import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { CustomizationInfo } from '../../../../resources/customizable/model';
import { Role } from '../../../../resources/customizable/roleModel';
import { BaseDocument } from '../../../../resources/documents/model';
import { Timeline } from '../../../../resources/timeline/model';
import { promiseRetry } from '../../../../../utils/helpers';
import {
  contactForm,
  accountForm,
  dealForm,
  pipeline,
  adminRole,
  managerRole,
  dummyContact,
  dummyDeals,
} from './data';

//this entire func has to be refactored at some point.
export default function wrapperOrgBuilder<
  T extends Model<CustomizationInfo>,
  U extends Model<Role>,
  B extends Model<BaseDocument>,
  V extends Model<Timeline>
>(customizationModel: T, roleModel: U, baseModel: B, timelineModel: V) {
  return async function orgBuilder(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { org_id, role_id, username, userId } =
        request.middlewareInfo.orgSetupData;

      if (!org_id || !role_id) return next();

      const contact = new customizationModel({
        org_id,
        res_type: 'contact',
        form_data: contactForm,
      });
      const account = new customizationModel({
        org_id,
        res_type: 'account',
        form_data: accountForm,
      });
      const deal = new customizationModel({
        org_id,
        res_type: 'deal',
        form_data: dealForm,
      });

      const dealPipeline = new customizationModel({
        org_id,
        res_type: 'pipeline',
        pipeline_data: [pipeline],
      });

      let pipelineId: any;
      if (dealPipeline.pipeline_data) {
        pipelineId = dealPipeline.pipeline_data[0]._id;
      } else {
        pipelineId = '';
      }

      //roleId links the newly created profile with this role.
      const admin = new roleModel({
        _id: role_id,
        org_id,
        role_name: 'Administrator',
        ...adminRole,
      });
      const manager = new roleModel({
        org_id,
        role_name: 'Manager',
        ...managerRole,
      });

      const retryLimit = 10;
      const delay = 1000;

      await promiseRetry(contact.save.bind(contact), retryLimit, delay);
      await promiseRetry(account.save.bind(account), retryLimit, delay);
      await promiseRetry(deal.save.bind(deal), retryLimit, delay);
      await promiseRetry(
        dealPipeline.save.bind(dealPipeline),
        retryLimit,
        delay
      );

      await promiseRetry(admin.save.bind(admin), retryLimit, delay);
      await promiseRetry(manager.save.bind(manager), retryLimit, delay);

      //make fake contact
      await populate(
        org_id,
        {
          ...dummyContact,
          owner: {
            __type: 'Picklist',
            text: username,
            value: userId,
          },
        },
        baseModel,
        timelineModel
      );

      //make fake deals
      for (let deal of dummyDeals) {
        await populate(
          org_id,
          {
            ...deal,
            pipeline: {
              __type: 'Picklist',
              text: 'Deal',
              value: pipelineId,
            },
            owner: {
              __type: 'Picklist',
              text: username,
              value: userId,
            },
          },
          baseModel,
          timelineModel
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

async function populate(
  org_id: string | any,
  data: Object,
  baseModel: Model<BaseDocument>,
  timelineModel: Model<Timeline>
) {
  const document = new baseModel({
    ...data,
    org_id,
  });
  const timeline = new timelineModel({ org_id, parent_id: document._id });

  const TIMELINE_ID = timeline._id;
  document.set('timeline_id', TIMELINE_ID);

  await timeline.save();
  await document.save();
}
