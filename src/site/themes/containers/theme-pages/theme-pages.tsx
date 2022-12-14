import React, { useState } from 'react';
import './theme-pages.scss';
import { connect } from 'react-redux';
import AdminTable from '../../../../shared/components/portal-table/admin-table';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppState } from '../../../../core/store/store';
import {
  loadThemePages,
  loadThemePagesSuccess,
  loadThemePagesFailure,
} from '../../store/actions/theme-pages.actions';
import {
  selectThemePages,
  selectThemePagesPending,
  selectThemePagesError,
} from '../../store/selectors/theme-pages.selectors';
import { createThemePage } from '../../services/theme-pages.service';
import { ThemeSettings } from '../../models/themes.model';
import { selectThemeSettings } from '../../store/selectors/theme-settings.selectors';
import ContainerTemplate from '../../../../shared/components/container-template/container-template';
import { themeIsSelected } from '../../store/actions/theme.actions';
import CreationLinkDialog from '../../../../shared/components/creation-link-dialog/creation-link-dialog';
import { getPages } from '../../../pages/services/pages.service';
import { selectLoginUser } from '../../../../core/store/selectors/auth.selectors';

interface ThemePagesProps {
  user: any;
  loadThemePages: typeof loadThemePages;
  loadThemePagesSuccess: typeof loadThemePagesSuccess;
  loadThemePagesFailure: typeof loadThemePagesFailure;
  themeIsSelected: typeof themeIsSelected;
  themePages: any[];
  pending: boolean;
  error: boolean;
  themeSettings: ThemeSettings | undefined;
}

const headers = [
  {
    label: 'Page',
    value: 'label',
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

export function ThemePages(props: ThemePagesProps): JSX.Element {
  const { t } = useTranslation();
  let history = useHistory();
  let { portalUuid, themeId } = useParams<{
    portalUuid: string;
    themeId: string;
  }>();
  const [openDialog, setOpenDialog] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const getData = (val?: string) => {
    getPages(themeId, val, page + 1, rowsPerPage)
      .then((res: any) => {
        props.loadThemePagesSuccess(res.data.content);
        setCount(res.data.totalHits);
        setRowsPerPage(20);
      })
      .catch(() => props.loadThemePagesFailure());
  };

  React.useEffect(() => {
    props.loadThemePages();
    getData();
    // eslint-disable-next-line
  }, [page, rowsPerPage]);

  React.useEffect(() => {
    return function cleanup() {
      if (!history.location.pathname.includes('/themes')) {
        props.themeIsSelected(false);
      }
    };
    // eslint-disable-next-line
  }, [history.location.pathname]);

  const handleCloseDialog = (value?: any) => {
    setOpenDialog(false);
    if (value) {
      createThemePage(themeId, value).then((res: any) => {
        history.push(
          `/site/${portalUuid}/themes/pages/${themeId}/${res.data.uuid}`
        );
      });
    }
  };

  const pageSelected = (row: any) => {
    history.push(`/site/${portalUuid}/themes/pages/${themeId}/${row.uuid}`);
  };

  const pagesDataDateTransform = () => {
    let pages = props.themePages.map((page: any) => {
      return {
        ...page,
        publishDate: page.publishDate
          ? new Date(page.publishDate.slice(0, 10)).toDateString()
          : '',
      };
    });
    return pages;
  };

  return (
    <ContainerTemplate loading={props.pending} error={props.error}>
      <Box className="layout-list" display="flex" flexDirection="column">
        <Box className="list-title" display="flex" flexDirection="row">
          <span>
            {props.themeSettings?.name}
            {t('themePages.title')}
          </span>
          <FormControl variant="outlined" className="form-label-textfield">
            <OutlinedInput
              id="search-field"
              value={searchValue}
              onChange={(e: any) => {
                setSearchValue(e.target.value);
                getData(e.target.value.length > 2 ? e.target.value : '');
              }}
              placeholder={t('news.searchFilterPH')}
              endAdornment={
                <InputAdornment position="end">
                  <FontAwesomeIcon size="sm" icon={faSearch} />
                </InputAdornment>
              }
            />
          </FormControl>
          <Button id="add-button" onClick={() => setOpenDialog(true)}>
            <FontAwesomeIcon size="lg" icon={faPlus} />
          </Button>
        </Box>
        <AdminTable
          headers={headers}
          data={pagesDataDateTransform()}
          onRowClicked={pageSelected}
          currentPage={page}
          totalItems={count}
          itemsPerPage={rowsPerPage}
          onPageChange={(value: number) => handlePageChange(value)}
          canLock={true}
          userName={props.user.name}
        />
        <CreationLinkDialog
          open={openDialog}
          title={t('themePages.creationDialog.title')}
          onCloseDialog={handleCloseDialog}
          canDelete={false}
          onConfirmDelete={() => {}}
        />
      </Box>
    </ContainerTemplate>
  );
}

const mapStateToProps = (state: AppState) => ({
  user: selectLoginUser(state),
  themePages: selectThemePages(state),
  pending: selectThemePagesPending(state),
  error: selectThemePagesError(state),
  themeSettings: selectThemeSettings(state),
});

export default connect(mapStateToProps, {
  loadThemePages,
  loadThemePagesSuccess,
  loadThemePagesFailure,
  themeIsSelected,
})(ThemePages);
