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
    const { orgId, roleId } = request.middlewareInfo.orgSetupData;

    if (!orgId || !roleId) return next();

    try {
      const contact = new customizationModel({
        orgId,
        resType: 'contact',
        formData: contactForm,
      });
      const account = new customizationModel({
        orgId,
        resType: 'account',
        formData: accountForm,
      });
      const deal = new customizationModel({
        orgId,
        resType: 'deal',
        formData: dealForm,
      });

      const dealPipeline = new customizationModel({
        orgId,
        resType: 'pipeline',
        pipelineData: [pipeline],
      });

      //roleId links the newly created profile with this role.
      const admin = new roleModel({
        _id: roleId,
        orgId,
        roleName: 'Administrator',
        ...adminRole,
      });
      const manager = new roleModel({
        orgId,
        roleName: 'Manager',
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
