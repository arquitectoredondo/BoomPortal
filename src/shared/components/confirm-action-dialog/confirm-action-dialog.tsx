import React from 'react';
import './confirm-action-dialog.scss';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
  IconButton,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
export interface ConfirmActionDialogProps {
  title: string;
  descriptionIcon?: IconDefinition;
  description: string;
  open: boolean;
  onClose: (value: boolean) => void;
  handleAction?: () => void;
  actionLabel?: string;
  cancelLabel?: string;
}

export function ConfirmActionDialog(
  props: ConfirmActionDialogProps
): JSX.Element {
  const { t } = useTranslation();
  const handleClose = (value: boolean) => {
    props.onClose(value);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        className="layout-dialog revert-dialog"
      >
        <Box
          className="layout-dialog-title"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <span>{props.title}</span>
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
            {props.descriptionIcon && (
              <Box className="layout-dialog-body">
                <FontAwesomeIcon
                  className="trash-icon"
                  icon={props.descriptionIcon}
                  size="3x"
                />
              </Box>
            )}
            <DialogContentText>{props.description}</DialogContentText>
          </DialogContent>
        </Box>
        <DialogActions>
          <Button
            id="cancel-button"
            onClick={() => {
              if (props.cancelLabel && props.handleAction) {
                props.handleAction();
              } else {
                handleClose(false);
              }
            }}
            className="main-grey-button"
          >
            {props.cancelLabel ? props.cancelLabel : t('buttons.cancel')}
          </Button>
          {props.handleAction && !props.cancelLabel && (
            <Button
              id="save-button"
              onClick={props.handleAction}
              className="main-red-button"
              autoFocus
            >
              {props.actionLabel}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmActionDialog;
