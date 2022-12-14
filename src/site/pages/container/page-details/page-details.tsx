import React, { useState } from 'react';
import './page-details.scss';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Button, CircularProgress } from '@material-ui/core';

import {
  faChevronLeft,
  faExclamationTriangle,
  faPlus,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WidgetElement } from '../../components/widget-element/widget-element';
import { Responsive, WidthProvider, ResponsiveProps } from 'react-grid-layout';
import {
  PageWidget,
  ResponsiveLayout,
} from '../../../../shared/models/layout.model';
import {
  loadPortalPageDetails,
  loadPortalPageDetailsSuccess,
  loadPortalPageDetailsFailure,
  updatePortalPageDetailsSuccess,
  updatePortalPageDetailsFailure,
  updatePortalPageDetails,
} from '../../store/actions/page-details.actions';
import {
  getPortalPageDetails,
  updatePortalPageLayout,
  addPortalPageWidget,
  deletePageWidget,
  updatePortalPageWidget,
  revertPortalPage,
  publishPortalPage,
  deletePortalPage,
} from '../../services/page-details.service';
import { AppState } from '../../../../core/store/store';
import { connect } from 'react-redux';
import {
  selectPortalPageDetailsLoading,
  selectPortalPageDetailsLayout,
  selectPortalPageDetailsError,
  selectPortalPageDetails,
  selectPortalPageDetailsErrorMsg,
} from '../../store/selectors/page-details.selectors';
import { Page } from '../../models/page.model';
import { useHistory, useParams } from 'react-router-dom';
import WidgetDialog from '../../../../shared/components/widget-selector/widget-dialog/widget-dialog';
import {
  useNotOnMountEffect,
  formatDate,
  filterToString,
} from '../../../../shared/services/utils';
import { updatePortalPage } from '../../services/pages.service';
import { AxiosError } from 'axios';
import CreationLinkDialog from '../../../../shared/components/creation-link-dialog/creation-link-dialog';
import ConfirmDialog from '../../../../shared/components/confirm-dialog/confirm-dialog';
import AllWidgetsFields from '../../../../shared/components/widgets-translations/widgets-translations';
import WidgetsPreview from '../../../../shared/components/widget-preview/widget-preview';
import ConfirmActionDialog from '../../../../shared/components/confirm-action-dialog/confirm-action-dialog';
import StatusBar from '../../../../shared/components/status-bar/status-bar';
import { selectPortalSettings } from '../../../settings/store/selectors/settings.selectors';
import { PortalSettings } from '../../../settings/models/portal-settings.model';

interface PageDetailsProps {
  loadPortalPageDetails: typeof loadPortalPageDetails;
  loadPortalPageDetailsSuccess: typeof loadPortalPageDetailsSuccess;
  loadPortalPageDetailsFailure: typeof loadPortalPageDetailsFailure;
  updatePortalPageDetails: typeof updatePortalPageDetails;
  updatePortalPageDetailsSuccess: typeof updatePortalPageDetailsSuccess;
  updatePortalPageDetailsFailure: typeof updatePortalPageDetailsFailure;
  pageLayout: ResponsiveLayout;
  pageDetails: Page | undefined;
  loading: boolean;
  error: boolean;
  errorMsg: string;
  portalSettings: PortalSettings | undefined;
}

// tslint:disable-next-line: variable-name
const ResponsiveReactGridLayout: any = WidthProvider(Responsive);

export function PageDetails(props: PageDetailsProps): JSX.Element {
  const { t } = useTranslation();
  let history = useHistory();
  let { portalUuid, pageId } = useParams<{
    portalUuid: string;
    pageId: string;
  }>();

  const [init, setInit] = useState<boolean>(false);
  const [canRevert, setCanRevert] = useState<boolean>(false);
  const [showCreationDialog, setShowCreationDialog] = useState<boolean>(false);
  const [showTranslationDialog, setShowTranslationDialog] =
    useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
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

  const {
    loadPortalPageDetails: loadDetails,
    loadPortalPageDetailsSuccess: loadSuccess,
    loadPortalPageDetailsFailure: loadFailure,
  } = props;
  const [loadingPublish, setLoadingPublish] = React.useState(false);
  const [openPublishState, setOpenPublishState] = React.useState(false);
  const [loadingRevert, setLoadingRevert] = React.useState(false);
  const [openRevertState, setOpenRevertState] = React.useState(false);
  const [openRevertDialog, setOpenRevertDialog] = React.useState(false);
  const [errorLockedBy, setErrorLockedBy] = React.useState(false);
  const [disableAllWidgetsButton, setDisableAllWidgetsButton] =
    React.useState(false);
  const [nameLockedBy, setNameLockedBy] = React.useState('');

  React.useEffect(() => {
    loadDetails();
    setInit(true);
    getPortalPageDetails(pageId ? pageId : '')
      .then((result: any) => {
        loadSuccess(result.data);
        setInit(false);
      })
      .catch((error: AxiosError) => {
        loadFailure(error.response?.data.errorMessage);
        if (error.response?.data.code === 303) {
          setErrorLockedBy(true);
          setNameLockedBy(error.response?.data.errorMessage);
        }
      });

    // eslint-disable-next-line
  }, [loadDetails, loadSuccess, loadFailure]);

  useNotOnMountEffect(() => {
    if (widgetToUpdate) {
      setWidgetSelected(true);
      setShowWidgetSelector(true);
    }
  }, [widgetToUpdate]);

  const generateDOM = () => {
    return props.pageLayout.lg.map((cmp: PageWidget, i: number) => (
      <div className="static react-draggable-dragging" key={i}>
        <WidgetElement
          onDeleteWidget={deleteWidget}
          onEditWidget={editWidgetConfig}
          widget={cmp}
        ></WidgetElement>
      </div>
    ));
  };

  const revertChanges = () => {
    props.loadPortalPageDetails();
    setInit(true);
    setLoadingRevert(true);
    setOpenRevertDialog(false);
    revertPortalPage(pageId ? pageId : '')
      .then((result: any) => {
        props.loadPortalPageDetailsSuccess(result.data);
        setCanRevert(false);
        setInit(false);
        setOpenRevertState(true);
        setLoadingRevert(false);
      })
      .catch((error: AxiosError) =>
        loadPortalPageDetailsFailure(error.response?.data.errorMessage)
      );
  };

  const publishChanges = () => {
    setInit(true);
    setLoadingPublish(true);
    publishPortalPage(pageId ? pageId : '')
      .then((result: any) => {
        props.loadPortalPageDetailsSuccess(result.data);
        setCanRevert(false);
        setInit(false);
        setLoadingPublish(false);
        setOpenPublishState(true);
      })
      .catch((error: AxiosError) => {
        loadPortalPageDetailsFailure(error.response?.data.errorMessage);
      });
  };

  const onLayoutChange = (data: any) => {
    if (props.pageDetails && !init) {
      updatePortalPageLayout(
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
          loadPortalPageDetailsFailure(error.response?.data.errorMessage);
          if (error.response?.data.code === 303) {
            setErrorLockedBy(true);
            setNameLockedBy(error.response?.data.errorMessage);
          }
        });
    }
  };

  const deleteWidget = (id: string) => {
    loadDetails();
    setWidgetSelected(false);
    setShowWidgetSelector(false);
    deletePageWidget(id, pageId ? pageId : '')
      .then((result: any) => {
        loadSuccess(result.data);
      })
      .catch((error: AxiosError) =>
        loadFailure(error.response?.data.errorMessage)
      );
  };

  const editWidgetConfig = (widget: PageWidget) => {
    setWidgetToUpdate(widget);
  };
  const turnBack = () => {
    history.push(`/site/${portalUuid}/pages`);
  };

  const dialogClosed = (val?: any) => {
    setShowCreationDialog(false);

    if (val) {
      updatePortalPage({
        ...val,
        parentUuid: portalUuid,
        uuid: props.pageDetails?.uuid,
      })
        .then((result: any) => {
          props.loadPortalPageDetailsSuccess(result.data);
        })
        .catch((error: AxiosError) => {
          loadPortalPageDetailsFailure(error.response?.data.errorMessage);
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
      updatePortalPage({
        ...val,
        parentUuid: portalUuid,
        uuid: props.pageDetails?.uuid,
      })
        .then((result: any) => {
          setDisableAllWidgetsButton(false);
          props.loadPortalPageDetailsSuccess(result.data);
        })
        .catch((error: AxiosError) => {
          setDisableAllWidgetsButton(false);
          loadPortalPageDetailsFailure(error.response?.data.errorMessage);
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
    loadDetails();
    if (!form.uuid) {
      addPortalPageWidget(form, pageId ? pageId : '')
        .then((result: any) => {
          loadSuccess(result.data);
        })
        .catch((error: AxiosError) => {
          loadFailure(error.response?.data.errorMessage);
          if (error.response?.data.code === 303) {
            setErrorLockedBy(true);
            setNameLockedBy(error.response?.data.errorMessage);
          }
        });
    } else {
      updatePortalPageWidget(form, pageId ? pageId : '').then(() => {
        getPortalPageDetails(pageId ? pageId : '')
          .then((result: any) => {
            loadSuccess(result.data);
          })
          .catch((error: AxiosError) => {
            loadFailure(error.response?.data.errorMessage);
            if (error.response?.data.code === 303) {
              setErrorLockedBy(true);
              setNameLockedBy(error.response?.data.errorMessage);
            }
          });
      });
    }
  };

  const openConfirm = () => {
    setConfirmationDialog(true);
  };

  const handleBackButton = () => {
    history.push(`/site/${portalUuid}/pages`);
  };

  const deletePage = (confirm: boolean) => {
    setConfirmationDialog(false);
    if (confirm) {
      props.loadPortalPageDetails();
      deletePortalPage(pageId ? pageId : '')
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
                <React.Fragment>
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
                    onConfirmDelete={() => {
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
                  {showTranslationDialog && ( //Condition that forces the translations to be rendered each time the dialog is opened
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
                  )}
                  <ConfirmDialog
                    open={showConfirmationDialog}
                    bodyMessage={t('pages.deleteMessage')}
                    onClose={deletePage}
                  />
                </React.Fragment>
              ) : (
                <CircularProgress size={30} />
              )}
            </Box>
            <Box flexDirection="row" display="flex">
              <Button
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
                onClick={() => {
                  setShowPreview(true);
                }}
              >
                {t('buttons.preview')}
              </Button>
              <WidgetsPreview open={showPreview} setOpen={setShowPreview} />
              <Button
                id="publish-button"
                className="main-green-button"
                data-cy="publish-button"
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
              type={'portal'}
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
  pageLayout: selectPortalPageDetailsLayout(state),
  pageDetails: selectPortalPageDetails(state),
  loading: selectPortalPageDetailsLoading(state),
  error: selectPortalPageDetailsError(state),
  errorMsg: selectPortalPageDetailsErrorMsg(state),
  portalSettings: selectPortalSettings(state),
});

export default connect(mapStateToProps, {
  loadPortalPageDetails,
  loadPortalPageDetailsSuccess,
  loadPortalPageDetailsFailure,
  updatePortalPageDetails,
  updatePortalPageDetailsSuccess,
  updatePortalPageDetailsFailure,
})(PageDetails);
