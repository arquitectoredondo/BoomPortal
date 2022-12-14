import React, { useState } from 'react';
import './theme-pages-details.scss';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Button, CircularProgress } from '@material-ui/core';
import {
  faChevronLeft,
  faPlus,
  faExclamationTriangle,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
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
  useNotOnMountEffect,
  formatDate,
  filterToString,
} from '../../../../shared/services/utils';
import {
  loadThemePageDetails,
  loadThemePageDetailsSuccess,
  loadThemePageDetailsFailure,
  updateThemePageDetails,
  updateThemePageDetailsSuccess,
  updateThemePageDetailsFailure,
} from '../../store/actions/theme-pages-details.actions';
import { Page } from '../../../pages/models/page.model';
import { WidgetElement } from '../../../pages/components/widget-element/widget-element';
import { deletePageWidget } from '../../../pages/services/page-details.service';
import {
  selectThemePageDetailsLayout,
  selectThemePageDetails,
  selectThemePageDetailsLoading,
  selectThemePageDetailsError,
} from '../../store/selectors/theme-pages-details.selectors';
import {
  getThemePageDetails,
  revertThemePage,
  publishThemePage,
  updateThemePageLayout,
  addThemePageWidget,
  updateThemePageWidget,
  deleteThemePage,
} from '../../services/theme-page-details.service';
import { updateThemePage } from '../../services/theme-pages.service';
import CreationLinkDialog from '../../../../shared/components/creation-link-dialog/creation-link-dialog';
import ConfirmDialog from '../../../../shared/components/confirm-dialog/confirm-dialog';
import AllWidgetsFields from '../../../../shared/components/widgets-translations/widgets-translations';
import ConfirmActionDialog from '../../../../shared/components/confirm-action-dialog/confirm-action-dialog';
import StatusBar from '../../../../shared/components/status-bar/status-bar';
import { AxiosError } from 'axios';
import { selectPortalSettings } from '../../../settings/store/selectors/settings.selectors';
import { PortalSettings } from '../../../settings/models/portal-settings.model';

interface PageDetailsProps {
  loadThemePageDetails: typeof loadThemePageDetails;
  loadThemePageDetailsSuccess: typeof loadThemePageDetailsSuccess;
  loadThemePageDetailsFailure: typeof loadThemePageDetailsFailure;
  updateThemePageDetails: typeof updateThemePageDetails;
  updateThemePageDetailsSuccess: typeof updateThemePageDetailsSuccess;
  updateThemePageDetailsFailure: typeof updateThemePageDetailsFailure;
  pageLayout: ResponsiveLayout;
  pageDetails: Page | undefined;
  loading: boolean;
  error: boolean;
  portalSettings: PortalSettings | undefined;
}

// tslint:disable-next-line: variable-name
const ResponsiveReactGridLayout: any = WidthProvider(Responsive);

export function ThemePageDetails(props: PageDetailsProps): JSX.Element {
  const { t } = useTranslation();
  let history = useHistory();
  let { portalUuid, themeId, pageId } = useParams<{
    portalUuid: string;
    themeId: string;
    pageId: string;
  }>();

  const [init, setInit] = useState<boolean>(false);
  const [canRevert, setCanRevert] = useState<boolean>(false);
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
  const gridProps: ResponsiveProps = {
    rowHeight: 8,
    margin: [16, 0],
    breakpoints: { lg: 1400, md: 0, sm: 0, xs: 0, xxs: 0 },
    cols: { lg: 24, md: 24, sm: 24, xs: 24, xxs: 24 },
  };
  const [loadingPublish, setLoadingPublish] = React.useState(false);
  const [openPublishState, setOpenPublishState] = React.useState(false);
  const [loadingRevert, setLoadingRevert] = React.useState(false);
  const [openRevertState, setOpenRevertState] = React.useState(false);
  const [openRevertDialog, setOpenRevertDialog] = React.useState(false);
  const [errorLockedBy, setErrorLockedBy] = React.useState(false);
  const [nameLockedBy, setNameLockedBy] = React.useState('');
  const [disableAllWidgetsButton, setDisableAllWidgetsButton] =
    React.useState(false);
  React.useEffect(() => {
    props.loadThemePageDetails();
    setInit(true);
    getThemePageDetails(pageId ? pageId : '')
      .then((result: any) => {
        props.loadThemePageDetailsSuccess(result.data);
        setInit(false);
      })
      .catch((error: AxiosError) => {
        props.loadThemePageDetailsFailure();
        if (error.response?.data.code === 303) {
          setErrorLockedBy(true);
          setNameLockedBy(error.response?.data.errorMessage);
        }
      });

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
    props.loadThemePageDetails();
    setInit(true);
    setLoadingRevert(true);
    setOpenRevertDialog(false);
    revertThemePage(pageId ? pageId : '')
      .then((result: any) => {
        props.loadThemePageDetailsSuccess(result.data);
        setInit(false);
        setCanRevert(false);
        setOpenRevertState(true);
        setLoadingRevert(false);
      })
      .catch(() => props.loadThemePageDetailsFailure());
  };

  const publishChanges = () => {
    setInit(true);
    setLoadingPublish(true);
    publishThemePage(pageId ? pageId : '')
      .then((result: any) => {
        props.loadThemePageDetailsSuccess(result.data);
        setInit(false);
        setCanRevert(false);
        setLoadingPublish(false);
        setOpenPublishState(true);
      })
      .catch(() => props.loadThemePageDetailsFailure());
  };

  const onLayoutChange = (data: any) => {
    if (props.pageDetails && !init) {
      updateThemePageLayout(
        data,
        props.pageLayout.lg,
        props.pageDetails ? props.pageDetails.uuid : ''
      )
        .then(() => {
          setCanRevert(
            filterToString(data) !== filterToString(props.pageLayout.lg)
          );
        })
        .catch((error: AxiosError) => {
          props.updateThemePageDetailsFailure();
          if (error.response?.data.code === 303) {
            setErrorLockedBy(true);
            setNameLockedBy(error.response?.data.errorMessage);
          }
        });
    }
  };

  const deleteWidget = (id: string) => {
    props.loadThemePageDetails();
    setWidgetSelected(false);
    setShowWidgetSelector(false);
    deletePageWidget(id, pageId ? pageId : '')
      .then((result: any) => {
        props.loadThemePageDetailsSuccess(result.data);
      })
      .catch(() => props.loadThemePageDetailsFailure());
  };

  const editWidgetConfig = (widget: PageWidget) => {
    setWidgetToUpdate(widget);
  };
  const turnBack = () => {
    history.push(`/site/${portalUuid}/themes/pages/${themeId}`);
  };

  const dialogClosed = (val?: any) => {
    setShowCreationDialog(false);

    if (val) {
      updateThemePage({
        ...val,
        parentUuid: themeId,
        uuid: props.pageDetails?.uuid,
      })
        .then((result: any) => {
          props.loadThemePageDetailsSuccess(result.data);
        })
        .catch((error: AxiosError) => {
          props.loadThemePageDetailsFailure();
          if (error.response?.data.code === 303) {
            setErrorLockedBy(true);
            setNameLockedBy(error.response?.data.errorMessage);
          }
        });
    }
  };
  const widgetsTranslationsClosed = (val?: any) => {
    setShowTranslationDialog(false);

    if (val) {
      setDisableAllWidgetsButton(true);
      updateThemePage({
        ...val,
        parentUuid: themeId,
        uuid: props.pageDetails?.uuid,
      })
        .then((result: any) => {
          setDisableAllWidgetsButton(false);
          props.loadThemePageDetailsSuccess(result.data);
        })
        .catch((error: AxiosError) => {
          setDisableAllWidgetsButton(false);
          props.loadThemePageDetailsFailure();
          if (error.response?.data.code === 303) {
            setErrorLockedBy(true);
            setNameLockedBy(error.response?.data.errorMessage);
          }
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
    props.loadThemePageDetails();
    if (!form.uuid) {
      addThemePageWidget(form, pageId ? pageId : '')
        .then((result: any) => {
          props.loadThemePageDetailsSuccess(result.data);
        })
        .catch((error: AxiosError) => {
          props.loadThemePageDetailsFailure();
          if (error.response?.data.code === 303) {
            setErrorLockedBy(true);
            setNameLockedBy(error.response?.data.errorMessage);
          }
        });
    } else {
      updateThemePageWidget(form, pageId ? pageId : '');
      getThemePageDetails(pageId ? pageId : '')
        .then((result: any) => {
          props.loadThemePageDetailsSuccess(result.data);
        })
        .catch((error: AxiosError) => {
          props.loadThemePageDetailsFailure();
          if (error.response?.data.code === 303) {
            setErrorLockedBy(true);
            setNameLockedBy(error.response?.data.errorMessage);
          }
        });
    }
  };

  const openConfirm = () => {
    setConfirmationDialog(true);
  };

  const handleBackButton = () => {
    history.push(`/site/${portalUuid}/themes/pages/${themeId}`);
  };

  const closeConfirm = (confirm: boolean) => {
    setConfirmationDialog(false);
    if (confirm) {
      props.loadThemePageDetails();
      deleteThemePage(pageId ? pageId : '')
        .then(handleBackButton)
        .catch(handleBackButton);
    }
  };

  return (
    <>
      <ConfirmActionDialog
        open={errorLockedBy}
        onClose={() => null}
        title={t('tableHeaders.dialog.title')}
        description={`${t('tableHeaders.dialog.desc1')}${nameLockedBy}${t(
          'tableHeaders.dialog.desc2'
        )}`}
        descriptionIcon={faLock}
        handleAction={turnBack}
        cancelLabel="Accept"
      />
      {!errorLockedBy && (
        <Box
          className="page-details"
          flexDirection="column"
          display="flex"
          flex={1}
        >
          <StatusBar
            openPublishState={openPublishState}
            setOpenPublishState={setOpenPublishState}
            openRevertState={openRevertState}
            setOpenRevertState={setOpenRevertState}
            openRevertDialog={
              openRevertDialog ||
              showWidgetSelector ||
              showTranslationDialog ||
              showCreationDialog
            }
            openBlocked={props.pageDetails?.canRevert || canRevert}
          />
          <Box
            className="page-details-header"
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Box
              flexDirection="row"
              display="flex"
              alignItems="center"
              flex={1}
            >
              <IconButton id="back-button" onClick={() => turnBack()}>
                <FontAwesomeIcon size="sm" icon={faChevronLeft} />
              </IconButton>
              <span className="title-header">{props.pageDetails?.label}</span>

              {!props.loading && props.pageDetails ? (
                <div>
                  <Button
                    data-cy="settings-button"
                    className="main-blue-button"
                    id="open-settings-button"
                    onClick={() => setShowCreationDialog(true)}
                  >
                    {t('buttons.settings')}
                  </Button>
                  <CreationLinkDialog
                    open={showCreationDialog}
                    title={t('themePages.creationDialog.title')}
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
                        props.portalSettings?.languages || ['nl', 'en']
                      ).indexOf('nl') >= 0 ? (
                      t('buttons.translations')
                    ) : (
                      t('buttons.AllWidgets')
                    )}
                  </Button>
                  <AllWidgetsFields
                    watchLanguage={true}
                    open={showTranslationDialog}
                    title={
                      (
                        props.portalSettings?.languages || ['nl', 'en']
                      ).indexOf('nl') >= 0
                        ? t('pages.widgetTranslations.title')
                        : t('buttons.AllWidgets')
                    }
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
              <Button
                data-cy="revert-button"
                id="revert-button"
                className="main-red-button"
                variant="contained"
                onClick={() => setOpenRevertDialog(true)}
                disabled={!(props.pageDetails?.canRevert || canRevert)}
              >
                {loadingRevert ? (
                  <CircularProgress size={21} />
                ) : (
                  t('buttons.revert')
                )}
              </Button>
              <ConfirmActionDialog
                open={openRevertDialog}
                onClose={setOpenRevertDialog}
                handleAction={revertChanges}
                title={t('pages.revertTitle')}
                description={`${t('pages.confirmRevert1')}
            ${formatDate(props.pageDetails?.publishDate)}${t(
                  'pages.confirmRevert2'
                )}`}
                descriptionIcon={faExclamationTriangle}
                actionLabel={t('buttons.revert')}
              />
              <Button
                id="preview-button"
                className="main-blue-button"
                variant="contained"
              >
                {t('buttons.preview')}
              </Button>
              <Button
                data-cy="publish-button"
                id="publish-button"
                className="main-green-button"
                onClick={() => publishChanges()}
                disabled={
                  loadingPublish || !(props.pageDetails?.canRevert || canRevert)
                }
              >
                {loadingPublish ? (
                  <CircularProgress size={21} />
                ) : (
                  t('buttons.publish')
                )}
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
              type="theme"
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
      )}
    </>
  );
}

const mapStateToProps = (state: AppState) => ({
  pageLayout: selectThemePageDetailsLayout(state),
  pageDetails: selectThemePageDetails(state),
  loading: selectThemePageDetailsLoading(state),
  error: selectThemePageDetailsError(state),
  portalSettings: selectPortalSettings(state),
});

export default connect(mapStateToProps, {
  loadThemePageDetails,
  loadThemePageDetailsSuccess,
  loadThemePageDetailsFailure,
  updateThemePageDetails,
  updateThemePageDetailsSuccess,
  updateThemePageDetailsFailure,
})(ThemePageDetails);
