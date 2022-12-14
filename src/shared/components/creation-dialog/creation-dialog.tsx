import React, { useState } from 'react';
import './creation-dialog.scss';
import {
  Box,
  Button,
  DialogProps,
  Dialog,
  IconButton,
  TextField,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

interface CreationDialogProps {
  open: boolean;
  title: string;
  label: string;
  onCloseDialog: (value?: string) => void;
}

export default function CreationDialog(props: CreationDialogProps): JSX.Element {
  const { t } = useTranslation();
  const maxWidth: DialogProps['maxWidth'] = 'sm';

  const [name, setName] = useState<string>('');

  const handleCloseDialog = (val?: string) => {
    props.onCloseDialog(val ? val : '');
    setName('');
  };

  return (
    <Dialog
      id="dialog-creation"
      className="layout-dialog"
      fullWidth={true}
      maxWidth={maxWidth}
      open={props.open}
      onClose={() => handleCloseDialog()}
    >
      <Box
        display="flex"
        flexDirection="row"
        className="layout-dialog-title"
        alignItems="center"
      >
        <span>{props.title}</span>
        <IconButton id="close-button" onClick={() => handleCloseDialog()}>
          <FontAwesomeIcon size="lg" icon={faTimes} />
        </IconButton>
      </Box>
      <div className="layout-dialog-body">
        <Box
          display="flex"
          className="form-label-textfield"
          flexDirection="column"
        >
          <span>{props.label}</span>
          <TextField
            id="field-label"
            value={name}
            variant="outlined"
            onChange={(evt: any) => setName(evt.target.value)}
          />
        </Box>
      </div>
      <Box
        className="layout-dialog-actions"
        display="flex"
        flexDirection="row-reverse"
      >
        <Button
          id="save-button"
          disabled={!name}
          onClick={() => handleCloseDialog(name)}
        >
          {t('buttons.save')}
        </Button>
        <Button id="cancel-button" onClick={() => handleCloseDialog()}>
          {t('buttons.cancel')}
        </Button>
      </Box>
    </Dialog>
  );
}
