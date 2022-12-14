import React, { useState } from 'react';
import { connect } from 'react-redux';
import './themes-catalog.scss';
import { AppState } from '../../../../core/store/store';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import {
  loadThemeCatalog,
  loadThemeCatalogSuccess,
  loadThemeCatalogFailure,
  saveThemeCatalog,
} from '../../store/actions/theme-catalog.actions';
import ContainerTemplate from '../../../../shared/components/container-template/container-template';
import {
  selectThemeCatalogLoading,
  selecthemeCatalogError,
  selectThemeCatalog,
  selectThemeCatalogErrorMsg,
} from '../../store/selectors/theme-catalog.selectors';
import {
  getThemeCatalog,
  updateThemeCatalog,
  getThemeYearsList,
} from '../../services/themeCatalog.service';
import { themeIsSelected } from '../../store/actions/theme.actions';
import { CatalogSettings } from '../../../../shared/models/catalog.model';
import Catalog from '../../../../shared/components/catalog/catalog';
import { AxiosError } from 'axios';
import { publishThemeSettings } from '../../services/theme-settings.service';

interface CatalogProps {
  loadThemeCatalog: typeof loadThemeCatalog;
  loadThemeCatalogSuccess: typeof loadThemeCatalogSuccess;
  loadThemeCatalogFailure: typeof loadThemeCatalogFailure;
  saveThemeCatalog: typeof saveThemeCatalog;
  themeIsSelected: typeof themeIsSelected;
  loading: boolean;
  error: boolean;
  themeCatalog: CatalogSettings | undefined;
  errorMsg: string;
}

export function ThemeCatalogComponent(props: CatalogProps): JSX.Element {
  const { t } = useTranslation();
  let { themeId } = useParams<{ themeId: string }>();
  let history = useHistory();
  const [yearsList, setYearsList] = useState<number[]>();
  const {
    loadThemeCatalog: loadThemeCatalogProps,
    loadThemeCatalogSuccess: loadThemeCatalogSuccessProps,
    loadThemeCatalogFailure: loadThemeCatalogFailureProps,
    themeIsSelected: themeIsSelectedProps,
  } = props;

  React.useEffect(() => {
    loadThemeCatalogProps();
    getThemeCatalog(themeId ? themeId : '')
      .then((result: any) => {
        loadThemeCatalogSuccessProps(result.data);
      })
      .catch((error: AxiosError) =>
        loadThemeCatalogFailureProps(error.response?.data.errorMessage)
      );
  }, [
    themeId,
    loadThemeCatalogProps,
    loadThemeCatalogSuccessProps,
    loadThemeCatalogFailureProps,
  ]);

  React.useEffect(() => {
    getThemeYearsList(themeId ? themeId : '').then((res: any) => {
      setYearsList(res.data);
    });
  }, [themeId]);

  React.useEffect(() => {
    return function cleanup() {
      if (!history.location.pathname.includes('/themes')) {
        themeIsSelectedProps(false);
      }
    };
  }, [history.location.pathname, themeIsSelectedProps]);

  const handleChanges = (value: any) => {
    loadThemeCatalogProps();
    updateThemeCatalog(value)
      .then((result: any) => {
        props.saveThemeCatalog(result.data);
        loadThemeCatalogSuccessProps(result.data);
      })
      .catch((error: AxiosError) =>
        loadThemeCatalogFailureProps(error.response?.data.errorMessage)
      );
  };

  const publishChanges = () => {
    publishThemeSettings(themeId ? themeId : '');
  };

  return (
    <ContainerTemplate
      loading={props.loading}
      error={props.error}
      errorMsg={props.errorMsg}
    >
      <div className="catalogTheme-body">
        <div className="catalog-header">
          <Box
            display="flex"
            className="header-settings"
            flexDirection="row"
            alignItems="center"
          >
            <span className="theme-title">{t('catalog.title')}</span>
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
          isPortal={false}
          data={props.themeCatalog}
          onSaveChanges={handleChanges}
          yearList={yearsList}
        />
      </div>
    </ContainerTemplate>
  );
}

const mapStateToProps = (state: AppState) => ({
  loading: selectThemeCatalogLoading(state),
  error: selecthemeCatalogError(state),
  themeCatalog: selectThemeCatalog(state),
  errorMsg: selectThemeCatalogErrorMsg(state),
});

export default connect(mapStateToProps, {
  loadThemeCatalog,
  loadThemeCatalogSuccess,
  loadThemeCatalogFailure,
  saveThemeCatalog,
  themeIsSelected,
})(ThemeCatalogComponent);
