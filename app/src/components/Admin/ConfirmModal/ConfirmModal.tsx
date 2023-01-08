import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

export interface ConfirmModalProps {
  open: boolean;
  title: string;
  isSubmitting?: boolean;
  cancelButtonText?: string;
  agreeButtonText?: string;
  onAgree?: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
}

export function ConfirmModal({
  open,
  title,
  children,
  isSubmitting = false,
  agreeButtonText = 'Подтвердить',
  cancelButtonText = 'Отмена',
  onAgree = () => null,
  onCancel = () => null,
}: ConfirmModalProps): JSX.Element {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelButtonText}</Button>
        <Button
          onClick={onAgree}
          startIcon={
            isSubmitting ? (
              <CircularProgress color="inherit" size={16} />
            ) : undefined
          }
          disabled={isSubmitting}
          autoFocus
        >
          {agreeButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
