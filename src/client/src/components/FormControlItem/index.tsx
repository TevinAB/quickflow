import './index.css';
import { ChangeEventHandler, forwardRef, Ref } from 'react';
import type {
  FormFieldData,
  PicklistOption,
  SearchResultItem,
} from '../../types';
import PickList from '../PickList';
import AddAssocItem from '../AddAssocItem';
import { TextField } from '@mui/material';
import AdapterDayJs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { useState } from 'react';

type FormControlItemProps = {
  formFieldData: FormFieldData;
  listOptions?: Array<PicklistOption>;

  selectedAssocContacts?: Array<SearchResultItem>;
  onContactSelect?: (selectedItem: SearchResultItem) => void;
  onContactRemove?: (removedItem: SearchResultItem) => void;

  /**props from using react-hook-form */
  name?: string;
  onChange?: (val: any) => void;
  onBlur?: ChangeEventHandler;
  value?: unknown;
};

const FormControlItem = forwardRef<Ref<any>, FormControlItemProps>(
  function FormControlItem(
    {
      formFieldData,
      name,
      listOptions,
      selectedAssocContacts,
      onContactSelect,
      onContactRemove,
      value,
      onChange,
      onBlur,
    },
    ref
  ) {
    const { input_label, input_type, help_text, _id } = formFieldData;
    const [dateValue] = useState<Date | null>(new Date());
    let renderItem: JSX.Element;

    switch (input_type) {
      case 'Text':
      case 'Email':
      case 'Number':
      case 'Url':
      case 'Password':
        renderItem = (
          <TextField
            inputRef={ref}
            inputProps={{ onChange: onChange }}
            onBlur={onBlur}
            value={value}
            fullWidth
            id={_id}
            size="small"
            name={name}
            type={input_type.toLowerCase()}
          />
        );
        break;

      case 'Picklist':
        const options = listOptions ? listOptions : [];
        renderItem = (
          <PickList
            id={_id}
            name={name}
            optionsData={options}
            selectRef={ref}
            afterChange={onChange}
            value={value}
          />
        );
        break;

      case 'Assoc_Contact':
        const selected = selectedAssocContacts || [];
        const contactRemove =
          onContactRemove || function (_: SearchResultItem) {};

        const contactSelect =
          onContactSelect || function (_: SearchResultItem) {};

        renderItem = (
          <AddAssocItem
            id={_id}
            labelText={input_label}
            itemType="Contact"
            selectedItems={selected}
            onItemRemove={contactRemove}
            onItemSelect={contactSelect}
          />
        );
        break;

      case 'Date':
        renderItem = (
          <LocalizationProvider dateAdapter={AdapterDayJs}>
            <DateTimePicker
              InputProps={{ id: _id }}
              inputRef={ref as Ref<HTMLInputElement>}
              renderInput={(props) => (
                <TextField
                  ref={ref as Ref<HTMLInputElement>}
                  fullWidth
                  size="small"
                  {...props}
                />
              )}
              value={(value as Date) || dateValue}
              onChange={(newValue) => {
                if (onChange)
                  onChange(new Date(newValue as Date).toUTCString());
              }}
            />
          </LocalizationProvider>
        );
        break;

      default:
        renderItem = (
          <TextField
            inputRef={ref}
            inputProps={{ onChange: onChange }}
            onBlur={onBlur}
            value={value}
            fullWidth
            id={_id}
            size="small"
            name={name}
            type="text"
          />
        );
        break;
    }

    return (
      <div className="form-control">
        <label className="form-control__label" title={help_text} htmlFor={_id}>
          {input_label}
        </label>
        <div className="control__item">{renderItem}</div>
      </div>
    );
  }
);

export default FormControlItem;
