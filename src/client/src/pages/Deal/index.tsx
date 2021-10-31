import { useEffect, useState, useContext } from 'react';
import type {
  InfoData,
  PicklistOption,
  TimelineFormattedData,
  TimelineItem,
} from '../../types';
import { deleteDealThunk, getDealThunk } from '../../store/slices/deal';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { useParams } from 'react-router-dom';
import { groupBy, infoWidgetComponentAdapter } from '../../utils';
import { formatDate } from '../../utils/date';
import { DATE_STANDARD_3 } from '../../constants';
import {
  WidgetDocNotFound,
  WidgetLoadError,
  WidgetLoading,
} from '../../components/WidgetUtils';
import InfoWidget, { MainInfoCard } from '../../components/InfoWidget';
import DocumentActions from '../../components/DocumentActions';
import Timeline from '../../components/Timeline';
import AssociatedContacts from '../../components/AssociatedContacts';
import Button from '../../components/Button';
import { showForm } from '../../store/slices/formManager';
import PopUp from '../../components/PopUp';
import { PageContext } from '../QuickFlow';

const InfoWidgetOmitKeys = [
  'created_date',
  'closed_date',
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

export default function DealPage() {
  const pageHeight = useContext(PageContext);
  const token = useAppSelector((state) => state.user.token);
  const { id: dealId } = useParams<{ id: string }>();

  const dealData = useAppSelector((state) => state.deal.documentData);
  const [dealDataFormatted, setDealDataFormatted] = useState<Array<InfoData>>(
    []
  );

  const timelineData = useAppSelector((state) => state.timeline);
  const [formattedTimelineData, setFormattedTimelineData] =
    useState<TimelineFormattedData>([]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    dispatch(deleteDealThunk({ documentId: dealData._id, token }));
  };

  const isLoading = useAppSelector((state) => state.deal.isLoading);
  const loadError = useAppSelector((state) => state.deal.documentLoadError);
  const loadErrorMessage = useAppSelector((state) => state.deal.errorMessage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getDeal() {
      await dispatch(getDealThunk({ documentId: dealId, token }));
    }

    getDeal();
  }, [token, dispatch, dealId]);

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
    const valueSetter = (arg: PicklistOption | string | number) => {
      if (typeof arg === 'string' || typeof arg === 'number') {
        return String(arg);
      } else {
        if ('__type' in arg && arg.__type === 'Picklist') return arg.text;
      }
      return '';
    };

    if (!isLoading) {
      const formatDealResult = infoWidgetComponentAdapter<
        PicklistOption | string | number
      >(dealData, InfoWidgetOmitKeys, valueSetter);

      setDealDataFormatted(formatDealResult);
    }
  }, [dealData, isLoading]);

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

  const renderDeal = (
    <main className="doc-page">
      <div className="doc-page__info-column">
        <MainInfoCard name={dealData.name} owner={dealData.owner.text} />
        <DocumentActions
          handleAddNote={() =>
            dispatch(showForm({ formType: 'Note', formMode: 'New' }))
          }
          handleEditDocument={() =>
            dispatch(
              showForm({
                formType: 'Deal',
                formMode: 'Edit',
                _id: dealData._id,
              })
            )
          }
          handleDeleteDocument={() => setShowDeleteConfirm(true)}
        />
        <InfoWidget title="Deal Details" data={dealDataFormatted} />
      </div>
      <div
        style={{ height: pageHeight.height }}
        className="doc-page__timeline-column"
      >
        <Timeline timelineFormattedData={formattedTimelineData} />
      </div>
      <div className="doc-page__widget-column">
        <AssociatedContacts
          showRemove={false}
          onRemove={() => ''}
          contacts={dealData.associated_contacts || []}
        />
      </div>
      <div>
        <PopUp
          open={showDeleteConfirm}
          handleClose={() => setShowDeleteConfirm(false)}
          popUpTitle="confirm delete"
          popUpBody="Would you like to delete this deal?"
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
      {!loadError && !isLoading && dealData._id && renderDeal}
      {!loadError && !isLoading && !dealData._id && renderDocumentNotFound}
    </>
  );
}
