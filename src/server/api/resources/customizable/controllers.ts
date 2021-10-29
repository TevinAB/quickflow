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
    const { org_id } = request.middlewareInfo.jwtData;
    try {
      const formDoc = await customModel
        .findOne({ org_id, res_type: type })
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
    const { form_data } = request.body;
    const { _id } = request.params;
    try {
      await customModel.findOneAndUpdate({ _id }, { form_data: [] });

      const updatedDoc = await customModel
        .findOneAndUpdate(
          { _id },
          {
            $push: { form_data: { $each: form_data } },
          },
          { new: true }
        )
        .select('-__v -pipeline_data');

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
    const { org_id } = request.middlewareInfo.jwtData;

    try {
      const listTypes = await customModel
        .find({ org_id, res_type: { $ne: 'pipeline' } })
        .select('-org_id -__v -pipeline_data');

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
    const { org_id } = request.middlewareInfo.jwtData;
    try {
      const pipelines = await customModel
        .find({ org_id, res_type: 'pipeline' })
        .select('pipeline_data');

      //get the first element of the pipeline list because each organization will only have
      //one document that stores all their pipelines
      const finalResult = pipelines[0];

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
      const parentDoc = await customModel.findOne({ 'pipeline_data._id': _id });

      const pipeline = parentDoc?.pipeline_data?.filter(
        (obj) => String(obj._id) === _id
      );

      if (pipeline) {
        const resultData = pipeline[0].stages.sort((a, b) => a.order - b.order);
        response.json({ result: resultData });
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
    const { org_id } = request.middlewareInfo.jwtData;

    try {
      const parentDoc = await customModel.findOneAndUpdate(
        {
          org_id,
          res_type: 'pipeline',
          'pipeline_data.name': { $ne: name },
        },
        {
          $addToSet: {
            pipeline_data: {
              name,
              stages: [{ stage_name: 'start', order: 0 }],
            },
          },
        },
        { new: true }
      );

      if (parentDoc) {
        const updatedPipeline = parentDoc.pipeline_data?.filter(
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
    const { org_id } = request.middlewareInfo.jwtData;

    try {
      const parentDoc = await customModel.findOneAndUpdate(
        {
          org_id,
          res_type: 'pipeline',
          'pipeline_data._id': _id,
        },
        { 'pipeline_data.$.stages': data },
        { new: true }
      );

      if (parentDoc) {
        const pipeline = parentDoc.pipeline_data?.filter(
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
    const { _ids } = request.body;

    try {
      const _id = [...(_ids as Array<string>)].pop();
      if (!deletePipeline)
        throw new RequestException('Cannot delete active pipelines.', 400);

      await customModel.findOneAndUpdate(
        { 'pipeline_data._id': _id },
        { $pull: { pipeline_data: { _id } } }
      );

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
    const { org_id } = request.middlewareInfo.jwtData;

    try {
      const roles = await roleModel
        .find({ org_id })
        .select('-__v -view -create -edit -delete_ -is_admin -org_id');

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
    const { role_name } = request.body;
    const { org_id } = request.middlewareInfo.jwtData;

    try {
      const newRole = new roleModel({ org_id, role_name });
      await newRole.save();

      response.json({
        result: { role_name: newRole.role_name, _id: newRole._id },
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
    const { org_id } = request.middlewareInfo.jwtData;

    try {
      const roleToDelete = await roleModel.findOne({ _id });

      if (roleToDelete && !roleToDelete.is_admin) {
        await profileModel.updateMany(
          { org_id, role_id: _id as any },
          { role_id: fallbackRoleId }
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
    const { org_id } = request.middlewareInfo.jwtData;

    try {
      const profiles = await profileModel.find({ org_id }).select('name _id');

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
      const profile = await profileModel
        .findOne({ _id })
        .select('-password_hash -__v');

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
    const { org_id } = request.middlewareInfo.jwtData;

    try {
      if (!data.password) throw new RequestException('Missing password.', 400);

      const userExists = await profileModel.exists({ email: data.email });

      if (!userExists) {
        const passwordHash = await hash(data.password, HASH_ROUNDS);
        const newUser = new profileModel({
          ...data,
          password_hash: passwordHash,
          org_id,
        });

        await newUser.save();

        response.json({
          result: {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
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
      const password_hash = await hash(data.password, HASH_ROUNDS);

      const user = await profileModel.findOneAndUpdate(
        { _id },
        { ...data, password_hash },
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
    const { _ids } = request.body;

    try {
      const _id = [...(_ids as Array<string>)].pop();
      await profileModel.findByIdAndDelete(_id);

      response.json({ result: 'Profile deleted.' });
    } catch (error) {
      next(error);
    }
  };
}
