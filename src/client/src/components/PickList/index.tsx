import { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type PickListProps = {
  optionsData: Array<{ value: string; text: string; selected: boolean }>;
  afterChange: (value: string) => void;
};

export default function PickList({ optionsData, afterChange }: PickListProps) {
  const [selected, setSelected] = useState(
    optionsData.filter((option) => option.selected).pop()?.value
  );

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelected(value);

    afterChange(value);
  };

  return (
    <Select
      style={{ backgroundColor: 'white' }}
      value={selected}
      size="small"
      fullWidth
      onChange={handleChange}
    >
      {optionsData.map((option) => (
        <MenuItem value={option.value}>{option.text}</MenuItem>
      ))}
    </Select>
  );
}
