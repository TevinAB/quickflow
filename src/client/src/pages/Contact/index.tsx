import './index.css';
import InfoWidget, { MainInfoCard } from '../../components/InfoWidget';
import PopUp from '../../components/PopUp';
import Button from '../../components/Button';
import {
  WidgetLoading,
  WidgetLoadError,
  WidgetDocNotFound,
} from '../../components/WidgetUtils';
import Timeline from '../../components/Timeline';
import AssociatedDeals from '../../components/AssociatedDeals';
import DocumentActions from '../../components/DocumentActions';
import { infoWidgetComponentAdapter, groupBy } from '../../utils';
import { DATE_STANDARD_3 } from '../../constants';
import { formatDate } from '../../utils/date';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  getContactThunk,
  deleteContactThunk,
} from '../../store/slices/contact';
import { useEffect, useState, useContext } from 'react';
import { showForm } from '../../store/slices/formManager';
import type {
  TimelineItem,
  TimelineFormattedData,
  InfoData,
} from '../../types';
import { useParams } from 'react-router-dom';

import { PageContext } from '../QuickFlow';

//omitting first and last name as they will be included elsewhere
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
];
export default function ContactPage() {
  const pageHeight = useContext(PageContext);
  const token = useAppSelector((state) => state.user.token);
  const { id: contactId } = useParams<{ id: string }>();

  const contactData = useAppSelector((state) => state.contact.documentData);
  const [contactDataFormatted, setcontactDataFormatted] = useState<
    Array<InfoData>
  >([]);

  const timelineData = useAppSelector((state) => state.timeline);
  const [formattedTimelineData, setFormattedTimelineData] =
    useState<TimelineFormattedData>([]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    dispatch(deleteContactThunk({ documentId: contactData._id, token }));
  };

  const isLoading = useAppSelector((state) => state.contact.isLoading);
  const loadError = useAppSelector((state) => state.contact.documentLoadError);
  const loadErrorMessage = useAppSelector(
    (state) => state.contact.errorMessage
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getContact() {
      await dispatch(getContactThunk({ documentId: contactId, token }));
    }

    getContact();
  }, [token, dispatch, contactId]);

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
      const formatContactResult = infoWidgetComponentAdapter(
        contactData,
        InfoWidgetOmitKeys
      );
      setcontactDataFormatted(formatContactResult);
    }
  }, [contactData, isLoading]);

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

  const renderContact = (
    <main className="doc-page">
      <div className="doc-page__info-column">
        <MainInfoCard name={contactData.name} owner={contactData.owner.text} />
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
                formType: 'Contact',
                formMode: 'Edit',
                _id: contactData._id,
              })
            )
          }
          handleDeleteDocument={() => setShowDeleteConfirm(true)}
        />
        <InfoWidget title="Contact Details" data={contactDataFormatted} />
      </div>
      <div
        style={{ height: pageHeight.height }}
        className="doc-page__timeline-column"
      >
        <Timeline timelineFormattedData={formattedTimelineData} />
      </div>
      <div className="doc-page__widget-column">
        <AssociatedDeals mainDocId={contactId} />
      </div>
      <div>
        <PopUp
          open={showDeleteConfirm}
          handleClose={() => setShowDeleteConfirm(false)}
          popUpTitle="confirm delete"
          popUpBody="Would you like to delete this contact?"
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
      {!loadError && !isLoading && contactData._id && renderContact}
      {!loadError && !isLoading && !contactData._id && renderDocumentNotFound}
    </>
  );
}
