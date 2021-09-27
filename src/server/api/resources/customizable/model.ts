import { model, Schema, Types } from 'mongoose';

export interface FormField {
  inputType: string;
  inputLabel: string;
  helpText: string;
  form: { order: number; visible: boolean };
  list: { order: number; visible: boolean };
  fieldName: string;
  deletable: boolean;
  dataSource?: string;
}

const formFieldSchema = new Schema<FormField>({
  inputType: { type: String, required: true },
  inputLabel: { type: String, required: true },
  helpText: { type: String, required: false },
  form: {
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  list: {
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  fieldName: { type: String, required: true },
  deletable: { type: Boolean, required: true, default: true },
  dataSource: { type: String, required: false },
});

interface Pipeline {
  stages: [{ stageName: string; order: number }];
  name: string;
  _id: Schema.Types.ObjectId;
}

const pipelineSchema = new Schema<Pipeline>({
  stages: [],
  name: { type: String, required: true },
  _id: { type: Schema.Types.ObjectId, default: Types.ObjectId },
});

export interface CustomizationInfo {
  orgId: string;
  resType: string; //contact, account, deal, pipeline
  formData?: Array<FormField>;
  pipelineData?: Array<Pipeline>;
}

const basicSchema = new Schema<CustomizationInfo>(
  {
    orgId: { type: String, required: true },
    resType: { type: String, required: true },
    formData: { type: [formFieldSchema], required: false },
    pipelineData: { type: [pipelineSchema], required: false },
  },
  { strict: false }
);

const customizationModel = model<CustomizationInfo>(
  'customization',
  basicSchema
);

export default customizationModel;
