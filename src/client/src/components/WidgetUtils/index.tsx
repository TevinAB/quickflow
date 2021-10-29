import { CircularProgress } from '@mui/material';

type LoadErrorProps = {
  errorMessage?: string;
};

export function WidgetLoadError({ errorMessage }: LoadErrorProps) {
  const errText = errorMessage || 'An error has occured';
  return <div className="error error--text">{errText}</div>;
}

export function WidgetLoading() {
  return (
    <div className="widget-loading">
      <CircularProgress style={{ width: '32px', height: '32px' }} />
    </div>
  );
}

export function WidgetDocNotFound() {
  return <div style={{ color: 'var(--grey-3)' }}>Document Not Found.</div>;
}
