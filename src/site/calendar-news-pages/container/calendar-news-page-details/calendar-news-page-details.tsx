import React, { useState } from 'react';
import './calendar-news-page-details.scss';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Button, CircularProgress } from '@material-ui/core';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Responsive, WidthProvider, ResponsiveProps } from 'react-grid-layout';
import {
  PageWidget,
  ResponsiveLayout,
} from '../../../../shared/models/layout.model';
import { AppState } from '../../../../core/store/store';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import WidgetDialog from '../../../../shared/components/widget-selector/widget-dialog/widget-dialog';
import {
  filterToString,
  useNotOnMountEffect,
} from '../../../../shared/services/utils';
import { AxiosError } from 'axios';
import {
  loadCalendarNewsPageDetails,
  loadCalendarNewsPageDetailsSuccess,
  loadCalendarNewsPageDetailsFailure,
  updateCalendarNewsPageDetails,
  updateCalendarNewsPageDetailsSuccess,
  updateCalendarNewsPageDetailsFailure,
} from '../../store/actions/calendar-news-page-details.actions';
import { WidgetElement } from '../../../pages/components/widget-element/widget-element';
import {
  selectCalendarNewsPageDetailsLayout,
  selectCalendarNewsPageDetails,
  selectCalendarNewsPageDetailsLoading,
  selectCalendarNewsPageDetailsError,
  selectCalendarNewsPageDetailsErrorMsg,
} from '../../store/selectors/calendar-news-page-details.selectors';
import {
  getCalendarNewsPageDetails,
  revertCalendarNewsPage,
  publishCalendarNewsPage,
  updateCalendarNewsPageLayout,
  addCalendarNewsPageWidget,
  updateCalendarNewsPageWidget,
  deleteCalendarNewsPage,
} from '../../services/calendar-news-page-details.service';
import { deletePageWidget } from '../../../pages/services/page-details.service';
import { updateCalendarNewsPage } from '../../services/calendar-news-pages.service';
import { CalendarNewsPage } from '../../models/calendar-news-page.model';
import CreationLinkDialog from '../../../../shared/components/creation-link-dialog/creation-link-dialog';
import ConfirmDialog from '../../../../shared/components/confirm-dialog/confirm-dialog';
import AllWidgetsFields from '../../../../shared/components/widgets-translations/widgets-translations';
import { selectPortalSettings } from '../../../settings/store/selectors/settings.selectors';
import { PortalSettings } from '../../../settings/models/portal-settings.model';

interface CalendarNewsPageDetailsProps {
  loadCalendarNewsPageDetails: typeof loadCalendarNewsPageDetails;
  loadCalendarNewsPageDetailsSuccess: typeof loadCalendarNewsPageDetailsSuccess;
  loadCalendarNewsPageDetailsFailure: typeof loadCalendarNewsPageDetailsFailure;
  updateCalendarNewsPageDetails: typeof updateCalendarNewsPageDetails;
  updateCalendarNewsPageDetailsSuccess: typeof updateCalendarNewsPageDetailsSuccess;
  updateCalendarNewsPageDetailsFailure: typeof updateCalendarNewsPageDetailsFailure;
  pageLayout: ResponsiveLayout;
  pageDetails: CalendarNewsPage | undefined;
  loading: boolean;
  error: boolean;
  errorMsg: string;
  portalSettings: PortalSettings | undefined;
}

// tslint:disable-next-line: variable-name
const ResponsiveReactGridLayout: any = WidthProvider(Responsive);

export function CalendarNewsPageDetails(
  props: CalendarNewsPageDetailsProps
): JSX.Element {
  const { t } = useTranslation();
  let history = useHistory();
  let { calendarNewId, pageId } = useParams<{
    calendarNewId: string;
    pageId: string;
  }>();

  const [init, setInit] = useState<boolean>(false);
  const [canRevert, setCanRevert] = useState<boolean>(false);
  const [addingWidget, setAddingWidget] = useState<boolean>(false);
  const [showCreationDialog, setShowCreationDialog] = useState<boolean>(false);
  const [showTranslationDialog, setShowTranslationDialog] =
    useState<boolean>(false);
  const [showConfirmationDialog, setConfirmationDialog] =
    useState<boolean>(false);
  const [showWidgetSelector, setShowWidgetSelector] = useState<boolean>(false);
  const [widgetSelected, setWidgetSelected] = useState<boolean>(false);
  const [widgetToUpdate, setWidgetToUpdate] = useState<
    PageWidget | undefined
  >();
  const [disableAllWidgetsButton, setDisableAllWidgetsButton] =
    React.useState(false);
  const gridProps: ResponsiveProps = {
    rowHeight: 8,
    margin: [16, 0],
    breakpoints: { lg: 1400, md: 0, sm: 0, xs: 0, xxs: 0 },
    cols: { lg: 24, md: 24, sm: 24, xs: 24, xxs: 24 },
  };

  React.useEffect(() => {
    props.loadCalendarNewsPageDetails();
    setInit(true);
    getCalendarNewsPageDetails(pageId ? pageId : '')
      .then((result: any) => {
        props.loadCalendarNewsPageDetailsSuccess(result.data);
        setInit(false);
      })
      .catch((error: AxiosError) =>
        props.loadCalendarNewsPageDetailsFailure(
          error.response?.data.errorMessage
        )
      );

    // eslint-disable-next-line
  }, []);

  useNotOnMountEffect(() => {
    if (widgetToUpdate) {
      setWidgetSelected(true);
      setShowWidgetSelector(true);
    }
  }, [widgetToUpdate]);

  const generateDOM = () => {
    return props.pageLayout.lg.map((cmp: PageWidget, i: number) => (
      <div className="static" key={i}>
        <WidgetElement
          onDeleteWidget={deleteWidget}
          onEditWidget={editWidgetConfig}
          widget={cmp}
        ></WidgetElement>
      </div>
    ));
  };

  const revertChanges = () => {
    props.loadCalendarNewsPageDetails();
    setInit(true);
    revertCalendarNewsPage(pageId ? pageId : '')
      .then((result: any) => {
        props.loadCalendarNewsPageDetailsSuccess(result.data);
        setInit(false);
        setCanRevert(false);
      })
      .catch((error: AxiosError) =>
        loadCalendarNewsPageDetailsFailure(error.response?.data.errorMessage)
      );
  };

  const publishChanges = () => {
    setInit(true);
    publishCalendarNewsPage(pageId ? pageId : '')
      .then(() => {
        setInit(false);
        setCanRevert(false);
      })
      .catch((error: AxiosError) =>
        loadCalendarNewsPageDetailsFailure(error.response?.data.errorMessage)
      );
  };

  const onLayoutChange = (data: any) => {
    if (props.pageDetails && !init && !addingWidget) {
      updateCalendarNewsPageLayout(
        data,
        props.pageLayout.lg,
        props.pageDetails ? props.pageDetails.uuid : ''
      )
        .then(() => {
          setCanRevert(
            filterToString(data) !== filterToString(props.pageLayout.lg)
          );
        })
        .catch((error: AxiosError) =>
          updateCalendarNewsPageDetailsFailure(
            error.response?.data.errorMessage
          )
        );
    }
  };

  const deleteWidget = (id: string) => {
    setWidgetSelected(false);
    setShowWidgetSelector(false);
    deletePageWidget(id, pageId ? pageId : '')
      .then((result: any) => {
        props.loadCalendarNewsPageDetailsSuccess(result.data);
      })
      .catch((error: AxiosError) =>
        props.loadCalendarNewsPageDetailsFailure(
          error.response?.data.errorMessage
        )
      );
  };

  const editWidgetConfig = (widget: PageWidget) => {
    setWidgetToUpdate(widget);
  };
  const turnBack = () => {
    history.push(`/site/calendarNew/${calendarNewId}/pages`);
  };

  const dialogClosed = (val?: any) => {
    setShowCreationDialog(false);

    if (val) {
      updateCalendarNewsPage({
        ...val,
        parentUuid: calendarNewId,
        uuid: props.pageDetails?.uuid,
      })
        .then((result: any) => {
          props.loadCalendarNewsPageDetailsSuccess(result.data);
        })
        .catch((error: AxiosError) =>
          loadCalendarNewsPageDetailsFailure(error.response?.data.errorMessage)
        );
    }
  };

  const widgetsTranslationsClosed = (val?: any) => {
    setShowTranslationDialog(false);

    if (val) {
      setDisableAllWidgetsButton(true);
      updateCalendarNewsPage({
        ...val,
        parentUuid: calendarNewId,
        uuid: props.pageDetails?.uuid,
      })
        .then((result: any) => {
          setDisableAllWidgetsButton(false);
          props.loadCalendarNewsPageDetailsSuccess(result.data);
        })
        .catch((error: AxiosError) => {
          setDisableAllWidgetsButton(false);
          loadCalendarNewsPageDetailsFailure(error.response?.data.errorMessage);
        });
    }
  };
  const widgetDialogClose = () => {
    setWidgetSelected(false);
    setShowWidgetSelector(false);
    setWidgetToUpdate(undefined);
  };

  const addWidget = (form: any) => {
    setShowWidgetSelector(false);
    setWidgetSelected(false);
    props.loadCalendarNewsPageDetails();
    if (!form.uuid) {
      setAddingWidget(true);
      addCalendarNewsPageWidget(form, pageId ? pageId : '')
        .then((result: any) => {
          props.loadCalendarNewsPageDetailsSuccess(result.data);
          setAddingWidget(false);
        })
        .catch((error: AxiosError) =>
          props.loadCalendarNewsPageDetailsFailure(
            error.response?.data.errorMessage
          )
        );
    } else {
      updateCalendarNewsPageWidget(form, pageId ? pageId : '').then(() => {
        getCalendarNewsPageDetails(pageId ? pageId : '')
          .then((result: any) => {
            props.loadCalendarNewsPageDetailsSuccess(result.data);
          })
          .catch((error: AxiosError) =>
            props.loadCalendarNewsPageDetailsFailure(
              error.response?.data.errorMessage
            )
          );
      });
    }
  };

  const openConfirm = () => {
    setConfirmationDialog(true);
  };

  const handleBackButton = () => {
    history.push(`/site/calendarNew/${calendarNewId}/pages`);
  };

  const closeConfirm = (confirm: boolean) => {
    setConfirmationDialog(false);
    if (confirm) {
      props.loadCalendarNewsPageDetails();
      deleteCalendarNewsPage(pageId ? pageId : '')
        .then(handleBackButton)
        .catch(handleBackButton);
    }
  };

  return (
    <Box
      className="page-details"
      flexDirection="column"
      display="flex"
      flex={1}
    >
      <Box
        className="page-details-header"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Box flexDirection="row" display="flex" alignItems="center" flex={1}>
          <IconButton id="back-button" onClick={() => turnBack()}>
            <FontAwesomeIcon size="sm" icon={faChevronLeft} />
          </IconButton>
          <span className="title-header">{props.pageDetails?.label}</span>

          {!props.loading && props.pageDetails ? (
            <div>
              <Button
                className="main-blue-button"
                id="open-settings-button"
                onClick={() => setShowCreationDialog(true)}
              >
                {t('buttons.settings')}
              </Button>
              <CreationLinkDialog
                open={showCreationDialog}
                title={t('pages.creationDialog.title')}
                onCloseDialog={(val: any) => {
                  dialogClosed(val);
                }}
                data={{
                  label: props.pageDetails.label,
                  link: props.pageDetails.link,
                  visibility: props.pageDetails.visibility,
                  seoTitle: props.pageDetails.seoTitle,
                  seoDescription: props.pageDetails.seoDescription,
                }}
                canDelete={true}
                onConfirmDelete={(val: any) => {
                  openConfirm();
                }}
              />
              <Button
                className="main-blue-button"
                id="open-translations-button"
                onClick={() => setShowTranslationDialog(true)}
                disabled={disableAllWidgetsButton}
              >
                {disableAllWidgetsButton ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  t('buttons.translations')
                )}
              </Button>
              <AllWidgetsFields
                watchLanguage={false}
                open={showTranslationDialog}
                title={t('pages.widgetTranslations.title')}
                onCloseDialog={(val: any) => {
                  widgetsTranslationsClosed(val);
                }}
                data={{
                  cms: props.pageLayout.lg,
                  label: props.pageDetails.label,
                  link: props.pageDetails.link,
                  visibility: props.pageDetails.visibility,
                  seoTitle: props.pageDetails.seoTitle,
                  seoDescription: props.pageDetails.seoDescription,
                }}
                canDelete={true}
                onConfirmDelete={() => {
                  openConfirm();
                }}
              />
              <ConfirmDialog
                open={showConfirmationDialog}
                bodyMessage={t('pages.deleteMessage')}
                onClose={closeConfirm}
              />
            </div>
          ) : (
            <CircularProgress size={30} />
          )}
        </Box>
        <Box flexDirection="row" display="flex">
          {(props.pageDetails?.canRevert || canRevert) && (
            <Button
              id="revert-button"
              className="main-red-button"
              variant="contained"
              onClick={() => revertChanges()}
            >
              {t('buttons.revert')}
            </Button>
          )}
          <Button
            id="preview-button"
            className="main-blue-button"
            variant="contained"
          >
            {t('buttons.preview')}
          </Button>
          <Button
            className="main-green-button"
            data-cy="publish-button"
            onClick={() => publishChanges()}
          >
            {t('buttons.publish')}
          </Button>
        </Box>
      </Box>
      <Box className="page-details-editor" flex={1}>
        <Box display="flex" flexDirection="row">
          <Box flex={1}>{t('pages.layoutEditing.portalName')}</Box>
          <span>{t('pages.layoutEditing.menuItems')}</span>
          <span>{t('pages.layoutEditing.login')}</span>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            id="open-widget-selector"
            className="main-transparent-button"
            onClick={() => setShowWidgetSelector(true)}
          >
            <FontAwesomeIcon className="addIcon" size="sm" icon={faPlus} />
            {t('pages.addWidget')}
          </Button>
        </Box>
        <WidgetDialog
          type="journal"
          open={showWidgetSelector}
          onCloseDialog={() => widgetDialogClose()}
          onSave={addWidget}
          widgetSelected={widgetSelected ? widgetToUpdate : undefined}
        />
        <ResponsiveReactGridLayout
          id="grid"
          {...gridProps}
          layouts={props.pageLayout}
          onLayoutChange={onLayoutChange}
          useCSSTransforms={false}
        >
          {generateDOM()}
        </ResponsiveReactGridLayout>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state: AppState) => ({
  pageLayout: selectCalendarNewsPageDetailsLayout(state),
  pageDetails: selectCalendarNewsPageDetails(state),
  loading: selectCalendarNewsPageDetailsLoading(state),
  error: selectCalendarNewsPageDetailsError(state),
  errorMsg: selectCalendarNewsPageDetailsErrorMsg(state),
  portalSettings: selectPortalSettings(state),
});

export default connect(mapStateToProps, {
  loadCalendarNewsPageDetails,
  loadCalendarNewsPageDetailsSuccess,
  loadCalendarNewsPageDetailsFailure,
  updateCalendarNewsPageDetails,
  updateCalendarNewsPageDetailsSuccess,
  updateCalendarNewsPageDetailsFailure,
})(CalendarNewsPageDetails);
