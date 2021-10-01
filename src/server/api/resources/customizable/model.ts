import { model, Schema, Types } from 'mongoose';

export interface FormField {
  input_type: string;
  input_label: string;
  help_text: string;
  form: { order: number; visible: boolean };
  list: { order: number; visible: boolean };
  field_name: string;
  deletable: boolean;
  data_source?: string;
}

const formFieldSchema = new Schema<FormField>({
  input_type: { type: String, required: true },
  input_label: { type: String, required: true },
  help_text: { type: String, required: false },
  form: {
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  list: {
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  field_name: { type: String, required: true },
  deletable: { type: Boolean, required: true, default: true },
  data_source: { type: String, required: false },
});

interface Pipeline {
  stages: [{ stage_name: string; order: number }];
  name: string;
  _id: Schema.Types.ObjectId;
}

const pipelineSchema = new Schema<Pipeline>({
  stages: [],
  name: { type: String, required: true },
  _id: { type: Schema.Types.ObjectId, default: Types.ObjectId },
});

export interface CustomizationInfo {
  org_id: string;
  res_type: string; //contact, account, deal, pipeline
  form_data?: Array<FormField>;
  pipeline_data?: Array<Pipeline>;
}

const basicSchema = new Schema<CustomizationInfo>(
  {
    org_id: { type: String, required: true },
    res_type: { type: String, required: true },
    form_data: { type: [formFieldSchema], required: false },
    pipeline_data: { type: [pipelineSchema], required: false },
  },
  { strict: false }
);

const customizationModel = model<CustomizationInfo>(
  'customization',
  basicSchema
);

export default customizationModel;
