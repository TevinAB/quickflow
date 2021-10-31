import { useState, useEffect } from 'react';
import type {
  InfoData,
  TimelineFormattedData,
  TimelineItem,
} from '../../types';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { useParams } from 'react-router-dom';
import {
  deleteAccountThunk,
  getAccountThunk,
} from '../../store/slices/account';
import { DATE_STANDARD_3 } from '../../constants';
import { formatDate } from '../../utils/date';
import { groupBy, infoWidgetComponentAdapter } from '../../utils';
import {
  WidgetDocNotFound,
  WidgetLoadError,
  WidgetLoading,
} from '../../components/WidgetUtils';
import InfoWidget, { MainInfoCard } from '../../components/InfoWidget';
import DocumentActions from '../../components/DocumentActions';
import { showForm } from '../../store/slices/formManager';
import Timeline from '../../components/Timeline';
import AssociatedContacts from '../../components/AssociatedContacts';
import PopUp from '../../components/PopUp';
import Button from '../../components/Button';

const InfoWidgetOmitKeys = [
  'created_date',
  '_id',
  'org_id',
  'owner',
  '__type',
  'timeline_id',
  'name',
  'first_name',
  'last_name',
  '__v',
  'associated_contacts',
];

export default function AccountPage() {
  const token = useAppSelector((state) => state.user.token);
  const { id: accountId } = useParams<{ id: string }>();

  const accountData = useAppSelector((state) => state.account.documentData);
  const [accountDataFormatted, setAccountDataFormatted] = useState<
    Array<InfoData>
  >([]);

  const timelineData = useAppSelector((state) => state.timeline);
  const [formattedTimelineData, setFormattedTimelineData] =
    useState<TimelineFormattedData>([]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    dispatch(deleteAccountThunk({ documentId: accountData._id, token }));
  };

  const isLoading = useAppSelector((state) => state.account.isLoading);
  const loadError = useAppSelector((state) => state.account.documentLoadError);
  const loadErrorMessage = useAppSelector(
    (state) => state.account.errorMessage
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getAccount() {
      await dispatch(getAccountThunk({ documentId: accountId, token }));
    }

    getAccount();
  }, [token, dispatch, accountId]);

  useEffect(() => {
    if (!isLoading) {
      const formatTimelineResult = groupBy<TimelineItem>(
        timelineData.timeline_items,
        (item) => {
          return formatDate(item.date, DATE_STANDARD_3);
        }
      );

      setFormattedTimelineData(formatTimelineResult);
    }
  }, [timelineData, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      const formatAccountResult = infoWidgetComponentAdapter(
        accountData,
        InfoWidgetOmitKeys
      );
      setAccountDataFormatted(formatAccountResult);
    }
  }, [accountData, isLoading]);

  const renderLoading = (
    <div className="page-loading-container">
      <WidgetLoading />
    </div>
  );

  const renderError = (
    <div className="page-error-container">
      <WidgetLoadError errorMessage={loadErrorMessage} />
    </div>
  );

  const renderAccount = (
    <main className="doc-page">
      <div className="doc-page__info-column">
        <MainInfoCard name={accountData.name} owner={accountData.owner.text} />
        <DocumentActions
          handleAddDeal={() =>
            dispatch(showForm({ formType: 'Deal', formMode: 'New' }))
          }
          handleAddNote={() =>
            dispatch(showForm({ formType: 'Note', formMode: 'New' }))
          }
          handleEditDocument={() =>
            dispatch(
              showForm({
                formType: 'Account',
                formMode: 'Edit',
                _id: accountData._id,
              })
            )
          }
          handleDeleteDocument={() => setShowDeleteConfirm(true)}
        />
        <InfoWidget title="Account Details" data={accountDataFormatted} />
      </div>
      <div className="doc-page__timeline-column">
        <Timeline timelineFormattedData={formattedTimelineData} />
      </div>
      <div className="doc-page__widget-column">
        <AssociatedContacts
          showRemove={false}
          onRemove={() => ''}
          contacts={accountData.associated_contacts || []}
        />
      </div>
      <div>
        <PopUp
          open={showDeleteConfirm}
          handleClose={() => setShowDeleteConfirm(false)}
          popUpTitle="confirm delete"
          popUpBody="Would you like to delete this account?"
          popUpActions={() => (
            <div>
              <Button variant="outlined" onClick={handleDeleteConfirm}>
                Confirm
              </Button>
            </div>
          )}
        />
      </div>
    </main>
  );

  //for when a user deletes a document while currently viewing it.
  const renderDocumentNotFound = (
    <div className="page-loading-container">
      <WidgetDocNotFound />
    </div>
  );

  return (
    <>
      {loadError && !isLoading && renderError}
      {!loadError && isLoading && renderLoading}
      {!loadError && !isLoading && accountData._id && renderAccount}
      {!loadError && !isLoading && !accountData._id && renderDocumentNotFound}
    </>
  );
}
