import './index.css';
import IconButton from '../IconButton';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Tooltip } from '@mui/material';

type DocumentActionsProps = {
  handleAddNote?: () => void;
  handleAddDeal?: () => void;
  handleEditDocument?: () => void;
  handleDeleteDocument?: () => void;
};

export default function DocumentActions({
  handleAddDeal,
  handleAddNote,
  handleDeleteDocument,
  handleEditDocument,
}: DocumentActionsProps) {
  const addDealButton = (
    <Tooltip title="Add deal">
      <IconButton
        aria-label="add deal"
        className="doc-btn"
        onClick={handleAddDeal}
      >
        <MonetizationOnOutlinedIcon color="secondary" fontSize="medium" />
      </IconButton>
    </Tooltip>
  );

  const addNoteButton = (
    <Tooltip title="Add note">
      <IconButton
        aria-label="add note"
        className="doc-btn"
        onClick={handleAddNote}
      >
        <EventNoteOutlinedIcon color="secondary" fontSize="medium" />
      </IconButton>
    </Tooltip>
  );

  const deleteDocumentButton = (
    <Tooltip title="Delete document">
      <IconButton
        aria-label="delete document"
        className="doc-btn doc-btn--delete"
        onClick={handleDeleteDocument}
      >
        <DeleteOutlineOutlinedIcon color="secondary" fontSize="medium" />
      </IconButton>
    </Tooltip>
  );

  const editDocumentButton = (
    <Tooltip title="Edit document">
      <IconButton
        aria-label="edit document"
        className="doc-btn"
        onClick={handleEditDocument}
      >
        <ModeEditOutlinedIcon color="secondary" fontSize="medium" />
      </IconButton>
    </Tooltip>
  );

  return (
    <div className="document-btn-container">
      {handleAddDeal && addDealButton}
      {handleAddNote && addNoteButton}
      {handleEditDocument && editDocumentButton}
      {handleDeleteDocument && deleteDocumentButton}
    </div>
  );
}
