import React, { useState } from 'react';
import './themes.scss';
import { connect } from 'react-redux';
import AdminTable from '../../../../shared/components/portal-table/admin-table';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

import {
  loadThemes,
  loadThemesSuccess,
  loadThemesFailure,
  loadThemeSelectedID,
  themeIsSelected,
} from '../../store/actions/theme.actions';
import { Theme } from '../../models/themes.model';
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppState } from '../../../../core/store/store';
import { fetchThemeData, createTheme } from '../../services/theme.service';
import {
  selectThemesPending,
  selectThemes,
  selectThemesError,
  selectThemeisSelectedID,
} from '../../store/selectors/theme.selectors';
import { Portal } from '../../../site/models/portal.model';
import { selectPortal } from '../../../site/store/selectors/site.selectors';
import ContainerTemplate from '../../../../shared/components/container-template/container-template';
import CreationDialog from '../../../../shared/components/creation-dialog/creation-dialog';
import { resetThemeSettings } from '../../../themes/store/actions/theme-settings.actions';

interface ThemesProps {
  loadThemeSelectedID: typeof loadThemeSelectedID;
  loadThemes: typeof loadThemes;
  loadThemesSuccess: typeof loadThemesSuccess;
  loadThemesFailure: typeof loadThemesFailure;
  themeIsSelected: typeof themeIsSelected;
  resetThemeSettings: typeof resetThemeSettings;
  themes: Theme[];
  pending: boolean;
  error: boolean;
  portal: Portal | undefined;
  themeSelectedID: string;
}

const headers = [
  {
    label: 'Theme',
    value: 'name',
  },
  {
    label: 'Created By',
    value: 'createdBy',
  },
  {
    label: 'Published on',
    value: 'publishDate',
  },
];

export function Themes(props: ThemesProps): JSX.Element {
  const { t } = useTranslation();
  let history = useHistory();
  let { portalUuid } = useParams<{ portalUuid: string }>();
  const [openDialog, setOpenDialog] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const selectTheme = (theme: Theme) => {
    if (props.portal) {
      props.loadThemeSelectedID(theme.uuid);
      props.themeIsSelected(true);
      history.push(`/site/${props.portal.uuid}/themes/settings/${theme.uuid}`);
    }
  };

  const openDialogCreateTheme = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (value?: string) => {
    setOpenDialog(false);
    if (value) {
      createTheme(portalUuid, value).then((res: any) => {
        props.loadThemeSelectedID(res.data);
        props.themeIsSelected(true);
        if (props.portal) {
          history.push(
            `/site/${props.portal.uuid}/themes/settings/${res.data}`
          );
        }
      });
    }
  };

  const themeDataDateTransform = () => {
    let themesTransformed = props.themes.map((theme: Theme) => {
      return {
        ...theme,
        publishDate: theme.publishDate
          ? new Date(theme.publishDate.slice(0, 10)).toDateString()
          : '',
      };
    });
    return themesTransformed;
  };

  const getData = (val: string) => {
    fetchThemeData(portalUuid, val, page + 1, rowsPerPage)
      .then((res: any) => {
        props.loadThemesSuccess(res.data.content);
        setCount(res.data.totalHits);
        setRowsPerPage(20);
      })
      .catch(() => props.loadThemesFailure());
  };

  React.useEffect(() => {
    props.loadThemes();
    getData(searchValue);
    return function cleanup() {
      if (!history.location.pathname.includes("/themes")) {
        themeIsSelected(false);
      }
    };
    // eslint-disable-next-line
  }, [history.location.pathname, page, rowsPerPage]);

  return (
    <ContainerTemplate loading={props.pending} error={props.error}>
      <Box className="layout-list" display="flex" flexDirection="column">
        <Box className="list-title" display="flex" flexDirection="row">
          <span>{t('themes.title')}</span>
          <FormControl variant="outlined" className="form-label-textfield">
            <OutlinedInput
              id="search-field"
              value={searchValue}
              onChange={(e: any) => {
                setSearchValue(e.target.value);
                getData(e.target.value.length > 2 ? e.target.value : "");
              }}
              placeholder={t("news.searchFilterPH")}
              endAdornment={
                <InputAdornment position="end">
                  <FontAwesomeIcon size="sm" icon={faSearch} />
                </InputAdornment>
              }
            />
          </FormControl>
          <Button id="add-button" onClick={openDialogCreateTheme}>
            <FontAwesomeIcon size="lg" icon={faPlus} />
          </Button>
        </Box>
        <AdminTable
          headers={headers}
          data={themeDataDateTransform()}
          onRowClicked={selectTheme}
          currentPage={page}
          totalItems={count}
          itemsPerPage={rowsPerPage}
          onPageChange={(value: number) => handlePageChange(value)}
        />
        <CreationDialog
          title={t('themes.creationDialog.title')}
          label={t('themes.creationDialog.name')}
          open={openDialog}
          onCloseDialog={handleCloseDialog}
        />
      </Box>
    </ContainerTemplate>
  );
}

const mapStateToProps = (state: AppState) => ({
  themes: selectThemes(state),
  pending: selectThemesPending(state),
  error: selectThemesError(state),
  portal: selectPortal(state),
  themeSelectedID: selectThemeisSelectedID(state),
});

export default connect(mapStateToProps, {
  resetThemeSettings,
  loadThemes,
  loadThemesSuccess,
  loadThemesFailure,
  loadThemeSelectedID,
  themeIsSelected,
})(Themes);
