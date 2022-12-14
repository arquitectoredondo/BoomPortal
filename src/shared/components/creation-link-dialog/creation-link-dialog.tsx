import React, { useState } from 'react';
import './creation-link-dialog.scss';
import {
  Box,
  Button,
  DialogProps,
  Dialog,
  IconButton,
  TextField,
  TextareaAutosize,
  Switch,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

interface CreationLinkDialogProps {
  open: boolean;
  data?: any;
  title: string;
  canDelete: boolean;
  onCloseDialog: (page?: any) => void;
  onConfirmDelete: (page?: any) => void;
}

export default function CreationLinkDialog(
  props: CreationLinkDialogProps
): JSX.Element {
  const { t } = useTranslation();
  const maxWidth: DialogProps['maxWidth'] = 'sm';

  const [name, setName] = useState<string>(props.data ? props.data.label : '');
  const [link, setLink] = useState<string>(props.data ? props.data.link : '');
  const [seoTitle, setSeoTitle] = useState<string>(props.data ? props.data.seoTitle : '');
  const [seoDescription, setSeoDescription] = useState<string>(props.data ? props.data.seoDescription : '');
  const [visibility, setVisibility] = useState<boolean>(
    props.data ? props.data.visibility : false
  );

  const handleCloseDialog = (page?: any) => {
    props.onCloseDialog(page);
  };

  const onDelete = (page?: any) => {
    props.onConfirmDelete(page);
  };

  return (
    <Dialog
      id="dialog-page-creation"
      className="layout-dialog"
      fullWidth={true}
      maxWidth={maxWidth}
      open={props.open}
      onClose={() => handleCloseDialog()}
    >
      <Box
        className="layout-dialog-title"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <span>{props.title}</span>
        <IconButton id="close-button" onClick={() => handleCloseDialog()}>
          <FontAwesomeIcon size="sm" icon={faTimes} />
        </IconButton>
      </Box>
      <Box
        className="layout-dialog-body"
        display="flex"
        flexDirection="column"
        flex={1}
      >
        <Box
          display="flex"
          flexDirection="row"
          flex={1}
          justifyContent="flex-end"
        >
          <Box display="flex" flex={1}></Box>
          <Box display="flex" flexDirection="row" alignItems="center">
            {t('buttons.hidden')}
            <Switch
              data-cy="visibility-switch"
              disabled={!props.canDelete}
              checked={visibility}
              onChange={() => setVisibility(!visibility)}
              color="primary"
            />
            {t('buttons.visible')}
          </Box>
        </Box>
        <Box
          display="flex"
          className="form-label-textfield"
          flexDirection="column"
        >
          <span>{t('pages.creationDialog.name')}</span>
          <TextField
            id="page-name"
            value={name}
            variant="outlined"
            onChange={(evt: any) => setName(evt.target.value)}
          />
        </Box>
        <Box
          display="flex"
          className="form-label-textfield"
          flexDirection="column"
        >
          <span>{t('pages.creationDialog.permalink')}</span>
          <TextField
            id="page-link"
            value={link}
            variant="outlined"
            onChange={(evt: any) => setLink(evt.target.value)}
          />
        </Box>
        <Box
          display="flex"
          className="form-label-textfield"
          flexDirection="column"
        >
          <span>{t('pages.creationDialog.seoTitle')}</span>
          <TextField
            id="page-seo-title"
            value={seoTitle}
            variant="outlined"
            onChange={(evt: any) => setSeoTitle(evt.target.value)}
          />
        </Box>
        <Box
          display="flex"
          className="form-label-textfield"
          flexDirection="column"
        >
          <span>{t('pages.creationDialog.seoDescription')}</span>
          <TextareaAutosize 
            id="page-seo-description"
            value={seoDescription}
            rowsMin={3}
            onChange={(evt: any) => setSeoDescription(evt.target.value)}
          />
        </Box>
      </Box>
      <Box
        className="layout-dialog-actions"
        display="flex"
        flexDirection="row-reverse"
      >
        <Button
          id="save-button"
          disabled={!(name && link)}
          onClick={() => handleCloseDialog({ label: name, link, visibility, seoTitle, seoDescription })}
        >
          {t('buttons.save')}
        </Button>

        <Button id="cancel-button" onClick={() => handleCloseDialog()}>
          {t('buttons.cancel')}
        </Button>
        <Box flex={1}></Box>
        {props.canDelete && (
          <Button
            id="remove-button"
            className="main-red-button"
            disabled={
              (visibility)
            }
            title="Page must be hidden"
            onClick={() => onDelete()}
          >
            {t('buttons.remove')}
          </Button>
        )}
      </Box>
    </Dialog>
  );
}
