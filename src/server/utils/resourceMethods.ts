import { Request, Response } from 'express';
import { Model } from 'mongoose';

export function wrapperGetResource<T extends Model<any>>(
  resourceModel: T,
  errorMessage: string
) {
  return async function getResource(req: Request, response: Response) {
    const { _id, orgId } = req.params;
    try {
      //orgId used to prevent cross organizational access of resources
      const resource = await resourceModel.findOne({ _id, orgId });
      response.json(resource);
    } catch (error) {
      response.status(404).json({ message: errorMessage });
    }
  };
}

export function wrapperCreateResource<T extends Model<any>>(
  resourceModel: T,
  errorMessage: string
) {
  return async function createResource(req: Request, response: Response) {
    const { resourceDetails } = req.body;

    try {
      const newResource = new resourceModel(resourceDetails);

      await newResource.save();

      response.status(200).json(newResource);
    } catch (error) {
      response.status(400).json({ message: errorMessage });
    }
  };
}

export function wrapperUpdateResource<T extends Model<any>>(
  resourceModel: T,
  errorMessage: string
) {
  return async function updateResource(req: Request, response: Response) {
    const { _id, updateDetails } = req.body;
    try {
      const updatedResource = await resourceModel.findOneAndUpdate(
        { _id },
        updateDetails
      );

      response.status(200).json(updatedResource);
    } catch (error) {
      response.status(400).json({ message: errorMessage });
    }
  };
}

export function wrapperDeleteResource<T extends Model<any>>(
  resourceModel: T,
  errorMessage: string,
  successMessage: string
) {
  return async function deleteResource(req: Request, response: Response) {
    const { _id } = req.params;

    try {
      await resourceModel.findOneAndDelete({ _id });
      response.status(200).json({ message: successMessage });
    } catch (error) {
      response.status(400).json({ message: errorMessage });
    }
  };
}
