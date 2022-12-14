import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
} from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

export interface ConfirmProps {
  bodyMessage: string;
  open: boolean;
  onClose: (value: boolean) => void;
}

export default function ConfirmDialog(props: ConfirmProps) {
  const { t } = useTranslation();
  const handleClose = (value: boolean) => {
    props.onClose(value);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} className="layout-dialog">
        <Box
          className="layout-dialog-title"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <span>{t('placeholders.confirm')}</span>
          <IconButton id="close-button" onClick={() => handleClose(false)}>
            <FontAwesomeIcon size="sm" icon={faTimes} />
          </IconButton>
        </Box>
        <Box 
          className="layout-dialog-body"
          flexDirection="column"
          textAlign="center"
        >
          <DialogContent>
            <Box className="layout-dialog-body"><FontAwesomeIcon className="trash-icon" icon={faTrash} size="5x" /></Box>
            <DialogContentText>{props.bodyMessage}</DialogContentText>
          </DialogContent>
        </Box>
        <DialogActions>
          <Button
            id="cancel-button"
            onClick={() => handleClose(false)}
            className="main-red-button"
          >
            {t('buttons.cancel')}
          </Button>
          <Button
            id="save-button"
            onClick={() => handleClose(true)}
            className="main-blue-button"
            autoFocus
          >
            {t('buttons.sure')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
