import { useState, Ref } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import type { PicklistOption } from '../../types';

type PickListProps = {
  optionsData: Array<PicklistOption>;
  afterChange?: (value: string) => void;
  id?: string;
  name?: string;
  selectRef?: Ref<any>;
};

export default function PickList({
  optionsData,
  name,
  id,
  afterChange,
  selectRef,
}: PickListProps) {
  const [selected, setSelected] = useState(
    optionsData.filter((option) => option.selected).pop()?.value
  );

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelected(value);

    if (afterChange) afterChange(value);
  };

  return (
    <Select
      inputRef={selectRef}
      style={{ backgroundColor: 'white' }}
      value={selected}
      size="small"
      fullWidth
      onChange={handleChange}
      name={name}
      labelId={id}
      inputProps={{ id }}
    >
      {optionsData.map((option, i) => (
        <MenuItem key={i} value={option.value}>
          {option.text}
        </MenuItem>
      ))}
    </Select>
  );
}
