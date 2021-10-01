import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { CustomizationInfo } from '../../../../resources/customizable/model';
import { Role } from '../../../../resources/customizable/roleModel';
import { promiseRetry } from '../../../../../utils/helpers';
import {
  contactForm,
  accountForm,
  dealForm,
  pipeline,
  adminRole,
  managerRole,
} from './data';

export default function wrapperOrgBuilder<
  T extends Model<CustomizationInfo>,
  U extends Model<Role>
>(customizationModel: T, roleModel: U) {
  return async function orgBuilder(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { org_id, role_id } = request.middlewareInfo.orgSetupData;

    if (!org_id || !role_id) return next();

    try {
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

      next();
    } catch (error) {
      next(error);
    }
  };
}
