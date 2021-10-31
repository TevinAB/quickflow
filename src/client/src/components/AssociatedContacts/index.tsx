import './index.css';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import IconButton from '../IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Contact } from '../../types';

type AsscContactsProps = {
  contacts: Array<Contact>;
  showRemove: boolean;
  onRemove: (_id: string) => void;
};

export default function AssociatedContacts({
  contacts,
  onRemove,
  showRemove,
}: AsscContactsProps) {
  return (
    <div className="widget assc-contacts">
      <Typography fontWeight="bold" className="widget__title" component="h2">
        Associated Contacts ({contacts.length})
      </Typography>
      <ul className="widget__body assc-contacts__list">
        {contacts.map(({ _id, name }) => (
          <li>
            <div className="assc-contacts__contact">
              <Link to={`/contact/${_id}`}>
                <div className="assc-contact__inner-wrapper">{name}</div>
              </Link>
              {showRemove && (
                <IconButton onClick={() => onRemove(_id)}>
                  <CloseOutlinedIcon />
                </IconButton>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
