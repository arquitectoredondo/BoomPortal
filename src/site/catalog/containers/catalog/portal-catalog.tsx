import React, { useState } from 'react';
import './portal-catalog.scss';
import { connect } from 'react-redux';
import { AppState } from '../../../../core/store/store';
import {
  loadPortalCatalog,
  loadPortalCatalogSuccess,
  loadPortalCatalogFailure,
  savePortalCatalog,
} from '../../store/actions/portal-catalog.actions';
import {
  selectPortalCatalogLoading,
  selectPortalCatalogError,
  selectPortalCatalog,
  selectPortalCatalogErrorMsg,
} from '../../store/selectors/portal-catalog.selectors';
import { useTranslation } from 'react-i18next';
import {
  getPortalCatalog,
  saveDraftPortalCatalog,
  getYearsList,
} from '../../services/portal-catalog.service';
import { useParams } from 'react-router-dom';
import ContainerTemplate from '../../../../shared/components/container-template/container-template';
import Catalog from '../../../../shared/components/catalog/catalog';
import { Box, Button } from '@material-ui/core';
import { CatalogSettings } from '../../../../shared/models/catalog.model';
import { AxiosError } from 'axios';
import { publishPortalSettings } from '../../../settings/services/settings.service';
import { resetThemeSettings } from '../../../themes/store/actions/theme-settings.actions';
import { themeIsSelected } from '../../../themes/store/actions/theme.actions';

interface CatalogProps {
  resetThemeSettings: typeof resetThemeSettings;
  themeIsSelected: typeof themeIsSelected;
  loadPortalCatalog: typeof loadPortalCatalog;
  loadPortalCatalogSuccess: typeof loadPortalCatalogSuccess;
  loadPortalCatalogFailure: typeof loadPortalCatalogFailure;
  savePortalCatalog: typeof savePortalCatalog;
  loading: boolean;
  error: boolean;
  errorMsg: string;
  portalCatalog: CatalogSettings | undefined;
}

export function PortalCatalogComponent(props: CatalogProps): JSX.Element {
  const { t } = useTranslation();
  let { portalUuid } = useParams<{ portalUuid: string }>();
  const [yearsList, setYearsList] = useState<number[]>();
  const {
    loadPortalCatalog: loadPortalCatalogProps,
    loadPortalCatalogSuccess: loadPortalCatalogSuccessProps,
    loadPortalCatalogFailure: loadPortalCatalogFailureProps,
  } = props;

  React.useEffect(() => {
    loadPortalCatalogProps();
    props.resetThemeSettings();
    props.themeIsSelected(false);
    getPortalCatalog(portalUuid ? portalUuid : '')
      .then((result: any) => {
        loadPortalCatalogSuccessProps(result.data);
      })
      .catch((error: AxiosError) =>
        loadPortalCatalogFailureProps(error.response?.data.errorMessage)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    portalUuid,
    loadPortalCatalogProps,
    loadPortalCatalogSuccessProps,
    loadPortalCatalogFailureProps,
  ]);

  React.useEffect(() => {
    getYearsList(portalUuid ? portalUuid : '').then((res: any) => {
      setYearsList(res.data);
    });
  }, [portalUuid]);
  const handleChanges = (value: any) => {
    loadPortalCatalogProps();
    saveDraftPortalCatalog(value)
      .then((result: any) => {
        props.savePortalCatalog(value);
        loadPortalCatalogSuccessProps(result.data);
      })
      .catch((error: AxiosError) =>
        loadPortalCatalogFailureProps(error.response?.data.errorMessage)
      );
  };

  const publishChanges = () => {
    publishPortalSettings(portalUuid ? portalUuid : '');
  };

  return (
    <ContainerTemplate
      loading={props.loading}
      error={props.error}
      errorMsg={props.errorMsg}
    >
      <div className="catalog-body">
        <div className="catalog-header">
          <Box
            display="flex"
            className="header-settings"
            flexDirection="row"
            alignItems="center"
          >
            <span className="catalog-title">{t('catalog.title')}</span>
            <Box
              display="flex"
              flexDirection="row"
              flex={1}
              justifyContent="flex-end"
            >
              <Box display="flex" flex={1}></Box>
              <Button
                id="publish-changes-button"
                data-cy="publish-button"
                className="main-green-button"
                variant="contained"
                onClick={() => publishChanges()}
              >
                {t('buttons.publish')}
              </Button>
            </Box>
          </Box>
        </div>
        <Catalog
          isPortal={true}
          yearList={yearsList}
          data={props.portalCatalog}
          onSaveChanges={handleChanges}
        />
      </div>
    </ContainerTemplate>
  );
}

const mapStateToProps = (state: AppState) => ({
  loading: selectPortalCatalogLoading(state),
  error: selectPortalCatalogError(state),
  errorMsg: selectPortalCatalogErrorMsg(state),
  portalCatalog: selectPortalCatalog(state),
});

export default connect(mapStateToProps, {
  resetThemeSettings,
  themeIsSelected,
  loadPortalCatalog,
  loadPortalCatalogSuccess,
  loadPortalCatalogFailure,
  savePortalCatalog,
})(PortalCatalogComponent);
