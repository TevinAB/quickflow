import './index.css';
import { useMuiTableColumns, useMuiTableRows } from '../../hooks/mui';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { getListData } from '../../services/forms';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { getAllDocumentsThunk } from '../../store/slices/documentList';
import { WidgetLoading, WidgetLoadError } from '../../components/WidgetUtils';
import { showForm } from '../../store/slices/formManager';
import { deleteDocumentsThunk } from '../../store/slices/documentList';
import type { FormData } from '../../types';
import Button from '../../components/Button';
import PopUp from '../../components/PopUp';

export default function ContactList() {
  const [error, setError] = useState(false);
  const [columnData, setColumnData] = useState<FormData>({
    form_data: [],
    res_type: '',
  });

  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const contacts = useAppSelector((state) => state.documents.documents);
  const isLoading = useAppSelector((state) => state.documents.isLoading);

  const muiColumnData = useMuiTableColumns(columnData);
  const muiRowData = useMuiTableRows(contacts);

  useEffect(() => {
    async function handleMount() {
      try {
        const [column] = await Promise.all([
          getListData('Contact', token),
          dispatch(getAllDocumentsThunk({ documentType: 'Contact', token })),
        ]);

        setColumnData(column?.data.result as FormData);
      } catch (error) {
        //show toast
        //set error to true
        setError(true);
      }
    }

    handleMount();
  }, [token, dispatch]);

  const renderError = (
    <div>
      <WidgetLoadError errorMessage="Contact list failed to load" />
    </div>
  );

  const renderLoading = (
    <div className="page-loading-container">
      <WidgetLoading />
    </div>
  );

  const renderPage = (
    <div className="doc-list">
      <div className="doc-list__action-buttons">
        <Button
          className="btn btn--action-btn"
          variant="contained"
          onClick={() =>
            dispatch(showForm({ formType: 'Contact', formMode: 'New' }))
          }
        >
          Add Contact
        </Button>
        {selectedItems.length > 0 && (
          <Button
            className="btn btn--action-btn"
            variant="contained"
            color="error"
            onClick={() => setShowConfirmDelete(true)}
          >
            Delete
          </Button>
        )}
      </div>
      <DataGrid
        checkboxSelection
        style={{ fontSize: '15px' }}
        disableSelectionOnClick
        rowsPerPageOptions={[15]}
        rows={muiRowData as Array<GridRowsProp>}
        columns={muiColumnData as Array<GridColDef>}
        onSelectionModelChange={(select) =>
          setSelectedItems(select as Array<string>)
        }
      />
      <PopUp
        open={showConfirmDelete}
        handleClose={() => setShowConfirmDelete(false)}
        popUpTitle="Confirm Delete"
        popUpBody={`Are you sure you want to delete ${selectedItems.length} document(s)?`}
        popUpActions={() => (
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(
                deleteDocumentsThunk({
                  documentIds: selectedItems,
                  documentType: 'Contact',
                  token,
                })
              );
              setSelectedItems([]);
              setShowConfirmDelete(false);
            }}
          >
            Confirm
          </Button>
        )}
      />
    </div>
  );

  return (
    <>
      {!isLoading && error && renderError}
      {isLoading && !error && renderLoading}
      {!isLoading && !error && renderPage}
    </>
  );
}
