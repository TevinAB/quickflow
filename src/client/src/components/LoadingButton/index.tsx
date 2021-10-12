import Button from '../Button';
import { ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

type LoadingButtonProps = {
  children?: ReactNode;
  loading?: boolean;
  loadingProp?: () => JSX.Element;
};

export default function LoadingButton({
  loading,
  loadingProp,
  children,
  ...otherProps
}: LoadingButtonProps & ButtonProps) {
  let toRender: JSX.Element | ReactNode;

  if (loading) {
    toRender = loadingProp && loadingProp();
  } else {
    toRender = children;
  }

  return (
    <Button disabled={loading} {...otherProps}>
      {toRender}
    </Button>
  );
}
