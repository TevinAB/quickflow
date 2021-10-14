import './index.css';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '../IconButton';
import { useTheme } from '@mui/material';

type TagProps = {
  text: string;
  removeButton?: boolean;
  onRemove?: () => void;
};

export default function Tag({ text, removeButton, onRemove }: TagProps) {
  const theme = useTheme();

  return (
    <span className="tag" style={{ backgroundColor: theme.palette.info.main }}>
      {text}
      {removeButton && (
        <IconButton onClick={onRemove} aria-label="remove">
          <CloseIcon
            sx={{
              fontSize: 17,
              paddingLeft: '4px',
              color: theme.palette.secondary.main,
            }}
          />
        </IconButton>
      )}
    </span>
  );
}
