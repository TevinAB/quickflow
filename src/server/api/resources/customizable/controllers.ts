import { HashFunction } from './../../../types/index.d';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { CustomizationInfo } from './model';
import { Role } from './roleModel';
import { Profile } from './profileModel';
import RequestException from '../../../exceptions/requestException';

const HASH_ROUNDS = 10;

//Form data

export function wrapperGetFormData<T extends Model<CustomizationInfo>>(
  customModel: T
) {
  return async function getFormData(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { type } = request.params;
    const { orgId } = request.middlewareInfo.jwtData;

    try {
      const formDoc = await customModel
        .findOne({ orgId, resType: type })
        .select('-__v -pipelineData');

      if (formDoc) {
        response.json({ result: formDoc });
      } else {
        throw new RequestException('Form type not found.', 404);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperEditFormData<T extends Model<CustomizationInfo>>(
  customModel: T
) {
  return async function editFormData(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id, formData } = request.body;
    try {
      await customModel.findOneAndUpdate({ _id }, { formData: [] });

      const updatedDoc = await customModel
        .findOneAndUpdate(
          { _id },
          {
            $push: { formData: { $each: formData } },
          },
          { new: true }
        )
        .select('-__v -pipelineData');

      if (updatedDoc) {
        response.json({ result: updatedDoc });
      } else {
        throw new RequestException('Form type update failed.', 400);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperGetListViews<T extends Model<CustomizationInfo>>(
  customModel: T
) {
  return async function getListViews(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { orgId } = request.middlewareInfo.jwtData;

    try {
      const listTypes = await customModel
        .find({ orgId, resType: { $ne: 'pipeline' } })
        .select('-_id -orgId -__v -formData -pipelineData');

      if (listTypes) {
        response.json({ result: listTypes });
      } else {
        throw new RequestException('List views not found.', 404);
      }
    } catch (error) {
      next(error);
    }
  };
}

//Pipelines

export function wrapperGetPipelines<T extends Model<CustomizationInfo>>(
  customModel: T
) {
  return async function getPipelines(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { orgId } = request.middlewareInfo.jwtData;
    try {
      const pipelines = await customModel
        .find({ orgId, resType: 'pipeline' })
        .select('-orgId -__v -formData -resType');

      //get the first element of the pipeline list because each organization will only have
      //one document that stores all their pipelines
      const finalResult = pipelines[0].pipelineData?.map((pipeline) => ({
        name: pipeline.name,
        _id: pipeline._id,
      }));

      if (finalResult) {
        response.json({ result: finalResult });
      } else {
        throw new RequestException('Pipelines not found.', 404);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperGetPipeline<T extends Model<CustomizationInfo>>(
  customModel: T
) {
  return async function getPipeline(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id } = request.params;

    try {
      const parentDoc = await customModel.findOne({ 'pipelineData._id': _id });

      const pipeline = parentDoc?.pipelineData?.filter(
        (obj) => String(obj._id) === _id
      );

      if (pipeline) {
        response.json({ result: pipeline });
      } else {
        throw new RequestException('Pipeline not found.', 404);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperCreatePipeline<T extends Model<CustomizationInfo>>(
  customModel: T
) {
  return async function createPipeline(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { name } = request.body;
    const { orgId } = request.middlewareInfo.jwtData;

    try {
      const parentDoc = await customModel.findOneAndUpdate(
        {
          orgId,
          resType: 'pipeline',
          'pipelineData.name': { $ne: name },
        },
        {
          $addToSet: {
            pipelineData: { name, stages: [{ stageName: 'start', order: 0 }] },
          },
        },
        { new: true }
      );

      if (parentDoc) {
        const updatedPipeline = parentDoc.pipelineData?.filter(
          (pipeline) => pipeline.name === name
        )[0];
        response.json({
          result: {
            name: updatedPipeline?.name,
            _id: updatedPipeline?._id,
          },
        });
      } else {
        throw new RequestException('Failed to add pipeline.', 400);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperEditPipeline<T extends Model<CustomizationInfo>>(
  customModel: T
) {
  return async function editPipeline(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id } = request.params;
    const { data } = request.body;
    const { orgId } = request.middlewareInfo.jwtData;

    try {
      const parentDoc = await customModel.findOneAndUpdate(
        {
          orgId,
          resType: 'pipeline',
          'pipelineData._id': _id,
        },
        { 'pipelineData.$.stages': data },
        { new: true }
      );

      if (parentDoc) {
        const pipeline = parentDoc.pipelineData?.filter(
          (pipeline) => String(pipeline._id) === _id
        )[0];

        response.json({ result: pipeline });
      } else {
        throw new RequestException('Pipeline update failed', 404);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperDeletePipeline<T extends Model<CustomizationInfo>>(
  customModel: T
) {
  return async function deletePipeline(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { deletePipeline } = request.middlewareInfo;
    const { _id } = request.params;

    try {
      if (!deletePipeline)
        throw new RequestException('Cannot delete active pipelines.', 400);

      await customModel.findOneAndDelete({ _id });

      response.json({ result: 'Pipeline deleted' });
    } catch (error) {
      next(error);
    }
  };
}

//Roles

export function wrapperGetRoles<T extends Model<Role>>(roleModel: T) {
  return async function getRoles(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { orgId } = request.middlewareInfo.jwtData;

    try {
      const roles = await roleModel
        .find({ orgId })
        .select('-__v -view -create -edit -delete_ -isAdmin -orgId');

      if (roles.length) {
        response.json({ result: roles });
      } else {
        throw new RequestException('Roles not found.', 404);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperGetRole<T extends Model<Role>>(roleModel: T) {
  return async function getRole(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id } = request.params;

    try {
      const role = await roleModel.findOne({ _id });

      if (role) {
        response.json({ result: role });
      } else {
        throw new RequestException('Role not found.', 404);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperCreateRole<T extends Model<Role>>(roleModel: T) {
  return async function createRole(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { roleName } = request.body;
    const { orgId } = request.middlewareInfo.jwtData;

    try {
      const newRole = new roleModel({ orgId, roleName });
      await newRole.save();

      response.json({
        result: { roleName: newRole.roleName, _id: newRole._id },
      });
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperEditRole<T extends Model<Role>>(roleModel: T) {
  return async function editRole(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id } = request.params;
    const { roleData } = request.body;

    try {
      const updatedDoc = await roleModel
        .findOneAndReplace({ _id }, { ...roleData }, { new: true })
        .select('-__v');

      if (updatedDoc) {
        response.json({ result: updatedDoc });
      } else {
        throw new RequestException('Role update failed.', 400);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperDeleteRole<
  T extends Model<Role>,
  U extends Model<Profile>
>(roleModel: T, profileModel: U) {
  return async function deleteRole(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id } = request.params;
    const { fallbackRoleId } = request.body;
    const { orgId } = request.middlewareInfo.jwtData;

    try {
      const roleToDelete = await roleModel.findOne({ _id });

      if (roleToDelete && !roleToDelete.isAdmin) {
        await profileModel.updateMany(
          { orgId, roleId: _id as any },
          { roleId: fallbackRoleId }
        );

        await roleToDelete.remove();

        response.json({ result: 'Role deleted.' });
      } else {
        throw new RequestException('Admin roles cannot be deleted', 404);
      }
    } catch (error) {
      next(error);
    }
  };
}

//Profiles
export function wrapperGetProfiles<T extends Model<Profile>>(profileModel: T) {
  return async function getProfiles(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { orgId } = request.middlewareInfo.jwtData;

    try {
      const profiles = await profileModel
        .find({ orgId })
        .select('firstName lastName _id');

      if (profiles.length) {
        response.json({ result: profiles });
      } else {
        throw new RequestException('No profiles found', 404);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperGetProfile<T extends Model<Profile>>(profileModel: T) {
  return async function getProfile(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id } = request.params;

    try {
      const profile = await profileModel.findOne({ _id });

      if (profile) {
        response.json({ result: profile });
      } else {
        throw new RequestException('Profile not found.', 404);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperCreateProfile<T extends Model<Profile>>(
  profileModel: T,
  hash: HashFunction
) {
  return async function createProfile(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { data } = request.body;
    const { orgId } = request.middlewareInfo.jwtData;

    try {
      if (!data.password) throw new RequestException('Missing password.', 400);

      const userExists = await profileModel.exists({ email: data.email });

      if (!userExists) {
        const passwordHash = await hash(data.password, HASH_ROUNDS);
        const newUser = new profileModel({ ...data, passwordHash, orgId });

        await newUser.save();

        response.json({
          result: {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            _id: newUser._id,
          },
        });
      } else {
        throw new RequestException('User already exists.', 400);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperEditProfile<T extends Model<Profile>>(
  profileModel: T,
  hash: HashFunction
) {
  return async function editProfile(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id } = request.params;
    const { data } = request.body;

    try {
      const passwordHash = await hash(data.password, HASH_ROUNDS);

      const user = await profileModel.findOneAndUpdate(
        { _id },
        { ...data, passwordHash },
        { new: true }
      );

      if (user) {
        response.json({ result: user });
      } else {
        throw new RequestException('Profile update failed.', 400);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperDeleteProfile<T extends Model<Profile>>(
  profileModel: T
) {
  return async function deleteProfile(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id } = request.params;

    try {
      await profileModel.findByIdAndDelete(_id);

      response.json({ result: 'Profile deleted.' });
    } catch (error) {
      next(error);
    }
  };
}
