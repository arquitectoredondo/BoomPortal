import React from 'react';
import './status-bar.scss';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';

export interface StatusBarProps {
  openPublishState: boolean;
  setOpenPublishState: (value: boolean) => void;
  openRevertState: boolean;
  setOpenRevertState: (value: boolean) => void;
  openRevertDialog: boolean;
  openBlocked: boolean;
}

export function StatusBar(props: StatusBarProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="status-bar">
      <Snackbar
        className="alert-message"
        open={props.openPublishState}
        autoHideDuration={2000}
        onClose={() => {
          props.setOpenPublishState(false);
        }}
      >
        <Alert variant="filled" severity="success">
          {t('pages.alerts.publishSuccess')}
        </Alert>
      </Snackbar>
      <Snackbar
        className="alert-message"
        open={props.openRevertState}
        autoHideDuration={2000}
        onClose={() => {
          props.setOpenRevertState(false);
        }}
      >
        <Alert variant="filled" severity="error">
          {t('pages.alerts.revertSuccess')}
        </Alert>
      </Snackbar>
      <Snackbar
        className={`alert-message ${props.openRevertDialog && 'dialog-open'}`}
        open={props.openBlocked}
        autoHideDuration={null}
        onClose={(evt, reason) => {
          if (reason === 'clickaway') {
            return;
          }
        }}
      >
        <Alert variant="filled" severity="info">
          {t('pages.alerts.blocked')}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default StatusBar;
