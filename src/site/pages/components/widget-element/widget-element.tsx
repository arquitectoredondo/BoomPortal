import React from 'react';
import './widget-element.scss';
import { Box, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { PageWidget } from '../../../../shared/models/layout.model';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import ConfirmActionDialog from '../../../../shared/components/confirm-action-dialog/confirm-action-dialog';

interface WidgetElementProps {
  widget: PageWidget;
  onDeleteWidget: (id: string) => void;
  onEditWidget: (widget: PageWidget) => void;
}

export function WidgetElement(props: WidgetElementProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const [openDeleteDialog, setOpenDeleteDialog] =
    React.useState<boolean>(false);
  const handleAction = () => {
    props.onDeleteWidget(props.widget.uuid);
    setOpenDeleteDialog(false);
  };
  const renderTitle = () => {
    switch (props.widget.widgetType) {
      case 7: {
        return <div>{t('taxonomy.title')}</div>;
      }
      case 3: {
        return <div>{props.widget.placeholder?.[i18n.language]}</div>;
      }

      default: {
        if (props.widget.title) {
          return <div>{props.widget.title?.[i18n.language]}</div>;
        } else {
          return;
        }
      }
    }
  };
  return (
    <Box
      className="widget-element"
      flexDirection="column"
      display="flex"
      flex={1}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        className="widget-header"
      >
        <Button
          onClick={() => props.onEditWidget(props.widget)}
          id="edit-button"
        >
          <FontAwesomeIcon className="icon" size="sm" icon={faPencilAlt} />
        </Button>

        <Box display="flex" flex={1} justifyContent="center">
          {renderTitle()}
        </Box>
        <Button id="delete-button" onClick={() => setOpenDeleteDialog(true)}>
          <FontAwesomeIcon className="icon" size="sm" icon={faTrash} />
        </Button>
        <ConfirmActionDialog
          open={openDeleteDialog}
          onClose={setOpenDeleteDialog}
          handleAction={handleAction}
          title={t('widgets.deleteDialog.title')}
          description={t('widgets.deleteDialog.description')}
          actionLabel={t('widgets.deleteDialog.label')}
        />
      </Box>
      <Box className="widget-body">
        {props.widget.widgetType === 5 && (
          <div
            className="text-widget-preview"
            dangerouslySetInnerHTML={{
              __html: props.widget.text
                ? DOMPurify.sanitize(props.widget.text?.[i18n.language])
                : '',
            }}
          />
        )}
      </Box>
    </Box>
  );
}
