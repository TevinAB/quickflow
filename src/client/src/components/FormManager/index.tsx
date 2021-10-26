import './index.css';
import {
  getForm_Data,
  nameIdPair,
  selectDataSource,
  toPicklistData,
  getItemData,
} from '../../utils';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { useSubmit } from '../../hooks/form';
import { useDispatch } from 'react-redux';
import { hideForm } from '../../store/slices/formManager';
import FormControlItem from '../FormControlItem';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  DialogActions,
} from '@mui/material';
import type {
  SearchResultItem,
  FormFieldData,
  PicklistOption,
} from '../../types';
import { WidgetLoading } from '../WidgetUtils';

export default function FormManager() {
  const token = 'token'; //useAppSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const formType = useAppSelector((state) => state.formManager.formType);
  const formMode = useAppSelector((state) => state.formManager.formMode);
  const itemId = useAppSelector((state) => state.formManager.itemId);
  const submit = useSubmit();

  const [assocContact, setAssocContact] = useState<Array<SearchResultItem>>([]);
  const handleSelectedAssocContact = (selected: SearchResultItem) => {
    const newList = assocContact.filter(
      (contact) => contact._id !== selected._id
    );

    setAssocContact([...newList, selected]);
  };
  const handleRemoveAssocContact = (removed: SearchResultItem) => {
    setAssocContact(
      assocContact.filter((contact) => contact._id !== removed._id)
    );
  };

  const [loading, setLoading] = useState(false);
  const [defaultData, setDefaultData] = useState<Record<string, any>>({});
  const [formFieldData, setFormFieldData] = useState<Array<FormFieldData>>([]);
  const [listOptionsMap, setListOptionsMap] = useState<
    Record<string, Array<PicklistOption>>
  >({});

  const { handleSubmit, control } = useForm({
    defaultValues: defaultData,
  });

  const onSubmit = async (data: any) => {
    const finalData: Record<string, any> = { ...data };

    if (assocContact.length) {
      finalData['associated_contacts'] = assocContact;
    }

    if (
      finalData.hasOwnProperty('first_name') &&
      finalData.hasOwnProperty('last_name')
    ) {
      finalData['name'] = `${data['first_name']} ${data['last_name']}`;
    }

    //constructs picklist data obj
    for (let key in listOptionsMap) {
      if (listOptionsMap.hasOwnProperty(key)) {
        const selectedOption = listOptionsMap[key]
          .filter((option) => option.value === data[key])
          .pop();

        finalData[key] = {
          __type: 'Picklist',
          text: selectedOption?.text || '',
          value: selectedOption?.value || '',
        };
      }
    }

    try {
      await submit(itemId, finalData, formType, formMode, token);

      dispatch(hideForm());

      //show toast
    } catch (error) {
      //show toast
    }
  };

  useEffect(() => {
    async function buildForm() {
      setLoading(true);
      try {
        const formData = (await getForm_Data(formType, token)).sort(
          (a, b) => Number(a.form.order) - Number(b.form.order)
        );

        const sourcesList: Array<Promise<Record<string, Array<nameIdPair>>>> =
          [];
        const idList: Array<string> = [];
        formData.forEach((field) => {
          if (field.input_type === 'Picklist') {
            sourcesList.push(selectDataSource(field.data_source, token));
            idList.push(field.field_name); // keep track of who requested what list options
          }
        });

        const allSourceResults = await Promise.all(sourcesList);

        let tempDefault: any = {};
        if (formMode === 'Edit') {
          tempDefault = await getItemData(itemId, formType, token);

          if (tempDefault['associated_contacts']) {
            setAssocContact(tempDefault['associated_contacts']);
          }
        }

        const tempListOptionsMap: typeof listOptionsMap = {};
        allSourceResults.forEach((sourceData, index) => {
          tempListOptionsMap[idList[index]] = toPicklistData<nameIdPair>(
            sourceData.result,
            {
              valueKey: '_id',
              textKey: 'name',
              selected: { _id: tempDefault[idList[index]]?.value },
            }
          );
        });

        setFormFieldData(formData);
        setDefaultData(tempDefault);
        setListOptionsMap(tempListOptionsMap);
        setLoading(false);
      } catch (error) {
        //show toast
        //close form
        setLoading(false);
      }
    }

    if (formType === 'none') return;

    buildForm();
  }, [formType, formMode, itemId]);

  const action = formType === 'Login' || formType === 'SignUp' ? '' : formMode;
  const title = `${action} ${formType}`;
  return (
    <Dialog
      open={formType !== 'none' && formMode !== 'none'}
      onClose={() => dispatch(hideForm())}
      fullWidth
      maxWidth="form"
    >
      <DialogTitle className="form__title">{title}</DialogTitle>
      <DialogContent dividers>
        <div className="form-manager">
          {loading && <WidgetLoading />}
          {!loading && (
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              {formFieldData.map((field) => (
                <Controller
                  key={field._id}
                  name={field.field_name}
                  defaultValue={
                    listOptionsMap[field.field_name]
                      ? listOptionsMap[field.field_name]
                          .filter(
                            (op) =>
                              op.value === defaultData[field.field_name]?.value
                          )
                          .pop()?.value
                      : defaultData[field.field_name]
                  }
                  control={control}
                  render={({ field: _field }) => (
                    <FormControlItem
                      formFieldData={field}
                      listOptions={listOptionsMap[field.field_name]}
                      selectedAssocContacts={assocContact}
                      onContactSelect={handleSelectedAssocContact}
                      onContactRemove={handleRemoveAssocContact}
                      {..._field}
                    />
                  )}
                />
              ))}
              <div className="form__footer">
                <DialogActions>
                  <Button color="primary" type="submit" variant="contained">
                    Submit
                  </Button>
                </DialogActions>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
