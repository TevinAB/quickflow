import './index.css';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import IconButton from '../IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface ContactData {
  _id: string;
  first_name: string;
  last_name: string;
  timeline_id: string;
}

type AsscContactsProps = {
  contacts: Array<ContactData>;
  onRemove: (_id: string) => void;
};

export default function AssociatedContacts({
  contacts,
  onRemove,
}: AsscContactsProps) {
  return (
    <div className="widget assc-contacts">
      <Typography fontWeight="bold" className="widget__title" component="h2">
        Associated Contacts ({contacts.length})
      </Typography>
      <ul className="widget__body assc-contacts__list">
        {contacts.map(({ _id, first_name, last_name }) => (
          <li>
            <div className="assc-contacts__contact">
              <Link to={`/contact/${_id}`}>
                <div className="assc-contact__inner-wrapper">
                  {first_name} {last_name}
                </div>
              </Link>
              <IconButton onClick={() => onRemove(_id)}>
                <CloseOutlinedIcon />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
