import './index.css';
import InfoWidget, { MainInfoCard } from '../../components/InfoWidget';
import { WidgetLoading, WidgetLoadError } from '../../components/WidgetUtils';
import Timeline from '../../components/Timeline';
import AssociatedDeals from '../../components/AssociatedDeals';
import DocumentActions from '../../components/DocumentActions';
import { infoWidgetComponentAdapter, groupBy } from '../../utils';
import { DATE_STANDARD_3 } from '../../constants';
import { formatDate } from '../../utils/date';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getContactThunk } from '../../store/slices/contact';
import { useEffect, useState } from 'react';
import { showForm } from '../../store/slices/formManager';
import type {
  TimelineItem,
  TimelineFormattedData,
  InfoData,
} from '../../types';

const tempId = '61566801642c753073fe012e';

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
  const token = useAppSelector((state) => state.user.token);

  const contactData = useAppSelector((state) => state.contact.documentData);
  const [contactDataFormatted, setcontactDataFormatted] = useState<
    Array<InfoData>
  >([]);

  const timelineData = useAppSelector((state) => state.timeline);
  const [formattedTimelineData, setFormattedTimelineData] =
    useState<TimelineFormattedData>([]);

  const isLoading = useAppSelector((state) => state.contact.isLoading);
  const loadError = useAppSelector((state) => state.contact.documentLoadError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getContact() {
      await dispatch(getContactThunk({ documentId: tempId, token }));
    }

    getContact();
  }, [token, dispatch]);

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
      <WidgetLoadError />
    </div>
  );

  const renderContact = (
    <div className="doc-page">
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
          handleDeleteDocument={() => console.log('delete')}
        />
        <InfoWidget title="Contact Details" data={contactDataFormatted} />
      </div>
      <div className="doc-page__timeline-column">
        <Timeline timelineFormattedData={formattedTimelineData} />
      </div>
      <div className="doc-page__widget-column">
        <AssociatedDeals mainDocId={tempId} />
      </div>
    </div>
  );

  return (
    <>
      {loadError && !isLoading && renderError}
      {!loadError && isLoading && renderLoading}
      {!loadError && !isLoading && renderContact}
    </>
  );
}
