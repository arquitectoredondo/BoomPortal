import React, { useState } from 'react';
import './pages.scss';
import { connect } from 'react-redux';
import { AppState } from '../../../../core/store/store';
import { useTranslation, Trans } from 'react-i18next';
import {
  Box,
  Button,
  Dialog,
  DialogProps,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import AdminTable from '../../../../shared/components/portal-table/admin-table';
import {
  loadPortalPages,
  loadPortalPagesSuccess,
  loadPortalPagesFailure,
} from '../../store/actions/pages.actions';
import {
  selectPortalPages,
  selectPortalPagesLoading,
  selectPortalPagesError,
  selectPortalPagesErrorMsg,
} from '../../store/selectors/pages.selectors';
import { getPages, createPortalPage } from '../../services/pages.service';
import { useParams, useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';
import CreationLinkDialog from '../../../../shared/components/creation-link-dialog/creation-link-dialog';
import { resetThemeSettings } from '../../../themes/store/actions/theme-settings.actions';
import { themeIsSelected } from '../../../themes/store/actions/theme.actions';
import { selectLoginUser } from '../../../../core/store/selectors/auth.selectors';

interface PagesProps {
  user: any;
  resetThemeSettings: typeof resetThemeSettings;
  themeIsSelected: typeof themeIsSelected;
  loadPortalPages: typeof loadPortalPages;
  loadPortalPagesSuccess: typeof loadPortalPagesSuccess;
  loadPortalPagesFailure: typeof loadPortalPagesFailure;
  pages: any;
  loading: boolean;
  error: boolean;
  errorMsg: string;
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
    label: 'Publish Date',
    value: 'publishDate',
  },
];

export function Pages(props: PagesProps): JSX.Element {
  const { t } = useTranslation();
  const maxWidth: DialogProps['maxWidth'] = 'sm';
  let { portalUuid } = useParams<{ portalUuid: string }>();
  let history = useHistory();

  const [showCreationDialog, setShowCreationDialog] = useState<boolean>(false);
  const [showLanguageWarning, setShowLanguageWarning] =
    useState<boolean>(false);

  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [searchValue, setSearchValue] = useState('');

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const getData = (val?: string) => {
    getPages(portalUuid ? portalUuid : '', val, page + 1, rowsPerPage)
      .then((result: any) => {
        result.data.content.length <= 0 && setShowLanguageWarning(true);
        props.loadPortalPagesSuccess(result.data.content);
        setCount(result.data.totalHits);
        setRowsPerPage(20);
      })
      .catch((error: AxiosError) =>
        props.loadPortalPagesFailure(error.response?.data.errorMessage)
      );
  };

  React.useEffect(() => {
    props.loadPortalPages();
    getData();
    // eslint-disable-next-line
  }, [page, rowsPerPage]);

  const dialogClosed = (val?: any) => {
    setShowCreationDialog(false);
    props.loadPortalPages();
    if (val) {
      createPortalPage({ ...val, parentUuid: portalUuid }).then(
        (result: any) => {
          props.loadPortalPagesSuccess([]);
          history.push(`/site/${portalUuid}/pages/${result.data.uuid}`);
        }
      );
    }
  };

  const openDetails = (row: any) => {
    history.push(`/site/${portalUuid}/pages/${row.uuid}`);
  };

  const pagesDataDateTransform = () => {
    let pages = props.pages.map((page: any) => {
      return {
        ...page,
        publishDate: page.publishDate
          ? new Date(page.publishDate.slice(0, 10)).toDateString()
          : '',
      };
    });
    return pages;
  };

  function LanguageWarning() {
    return (
      <Dialog
        id="main-dialog"
        className="prevent-language-dialog"
        fullWidth={true}
        maxWidth={maxWidth}
        open={showCreationDialog && showLanguageWarning} 
        onClose={() => setShowCreationDialog(false)}
      >
        <Box
          className="prevent-language-dialog-title"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <span>{t('pages.creationDialog.addPage')}</span>
          <IconButton
            id="close-button"
            onClick={() => setShowCreationDialog(false)}
          >
            <FontAwesomeIcon size="sm" icon={faTimes} />
          </IconButton>
        </Box>
        <Box className="prevent-language-dialog-content">
          <span>{t('pages.creationDialog.preventLanguageChange')}</span>
          <br />
          <span>
            <Trans
              values={{
                language: t('pages.creationDialog.language'),
              }}
            >
              pages.creationDialog.currentLanguageHelper
            </Trans>{' '}
            <a href="./settings">{t('pages.creationDialog.portalSettings')}</a>
          </span>
          <Box
            className="prevent-language-dialog-actions"
            display="flex"
            flexDirection="row-reverse"
          >
            <Button
              id="save-button" 
              onClick={() => setShowLanguageWarning(false)}
            >
              {t('buttons.continue')}
            </Button>

            <Button
              id="cancel-button"
              onClick={() => setShowCreationDialog(false)}
            >
              {t('buttons.cancel')}
            </Button>
            <Box flex={1}></Box>
          </Box>
        </Box>
      </Dialog>
    );
  }

  return (
    <div className="layout-list">
      <Box className="list-title" display="flex" flexDirection="row">
        <span>{t('pages.title')}</span>
        <Box flex={1}></Box>
        <FormControl variant="outlined" className="form-label-textfield">
          <OutlinedInput
            id="search-field"
            value={searchValue}
            onChange={(e: any) => {
              getData(e.target.value.length > 2 ? e.target.value : '');
              setSearchValue(e.target.value);
            }}
            placeholder={t('news.searchFilterPH')}
            endAdornment={
              <InputAdornment position="end">
                <FontAwesomeIcon size="sm" icon={faSearch} />
              </InputAdornment>
            }
          />
        </FormControl>
        <Button id="add-button" onClick={() => setShowCreationDialog(true)}>
          <FontAwesomeIcon size="lg" icon={faPlus} />
        </Button>
      </Box>
      <div>
        <AdminTable
          headers={headers}
          data={pagesDataDateTransform()}
          onRowClicked={openDetails}
          currentPage={page}
          totalItems={count}
          itemsPerPage={rowsPerPage}
          onPageChange={(value: number) => handlePageChange(value)}
          canLock={true}
          userName={props.user.name}
        />
      </div>
      <LanguageWarning />
      <CreationLinkDialog
        open={showCreationDialog && !showLanguageWarning}
        title={t('pages.creationDialog.title')}
        onCloseDialog={(val: any) => {
          dialogClosed(val);
        }}
        canDelete={false}
        onConfirmDelete={() => {}}
      />
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  user: selectLoginUser(state),
  pages: selectPortalPages(state),
  loading: selectPortalPagesLoading(state),
  error: selectPortalPagesError(state),
  errorMsg: selectPortalPagesErrorMsg(state),
});

export default connect(mapStateToProps, {
  resetThemeSettings,
  themeIsSelected,
  loadPortalPages,
  loadPortalPagesSuccess,
  loadPortalPagesFailure,
})(Pages);
