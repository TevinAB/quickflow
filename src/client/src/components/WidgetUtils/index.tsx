import { CircularProgress } from '@mui/material';

export function WidgetLoadError() {
  return <div className="error error--text">An error has occured</div>;
}

export function WidgetLoading() {
  return (
    <div className="widget-loading">
      <CircularProgress style={{ width: '32px', height: '32px' }} />
    </div>
  );
}
