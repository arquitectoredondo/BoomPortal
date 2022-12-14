import React, { useState } from 'react';
import './journal-pages.scss';
import { connect } from 'react-redux';
import { AppState } from '../../../../core/store/store';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import AdminTable from '../../../../shared/components/portal-table/admin-table';

import { useParams, useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';
import {
  loadPortalJournalPages,
  loadPortalJournalPagesSuccess,
  loadPortalJournalPagesFailure,
} from '../../store/actions/journal-pages.actions';
import {
  createPortalJournalPage,
  getPages,
} from '../../services/journal-pages.service';
import {
  selectPortalJournalPages,
  selectPortalJournalPagesLoading,
  selectPortalJournalPagesError,
  selectPortalJournalPagesErrorMsg,
} from '../../store/selectors/journal-pages.selectors';
import CreationLinkDialog from '../../../../shared/components/creation-link-dialog/creation-link-dialog';
import { selectLoginUser } from '../../../../core/store/selectors/auth.selectors';

interface JournalPagesProps {
  user: any;
  loadPortalJournalPages: typeof loadPortalJournalPages;
  loadPortalJournalPagesSuccess: typeof loadPortalJournalPagesSuccess;
  loadPortalJournalPagesFailure: typeof loadPortalJournalPagesFailure;
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
    label: 'Creation Date',
    value: 'creationDate',
  },
];

export function JournalPages(props: JournalPagesProps): JSX.Element {
  const { t } = useTranslation();
  let { journalId } = useParams<{ journalId: string }>();
  let history = useHistory();

  const [showCreationDialog, setShowCreationDialog] = useState<boolean>(false);

  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [searchValue, setSearchValue] = useState('');

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const getData = (val?: string) => {
    getPages(journalId ? journalId : '', val, page + 1, rowsPerPage)
      .then((result: any) => {
        props.loadPortalJournalPagesSuccess(result.data.content);
        setCount(result.data.totalHits);
        setRowsPerPage(20);
      })
      .catch((error: AxiosError) =>
        props.loadPortalJournalPagesFailure(error.response?.data.errorMessage)
      );
  };

  React.useEffect(() => {
    props.loadPortalJournalPages();
    getData();
    // eslint-disable-next-line
  }, [page]);

  const dialogClosed = (val?: any) => {
    setShowCreationDialog(false);
    props.loadPortalJournalPages();
    if (val) {
      createPortalJournalPage({ ...val, parentUuid: journalId }).then(
        (result: any) => {
          props.loadPortalJournalPagesSuccess([]);
          history.push(`/site/journal/${journalId}/pages/${result.data.uuid}`);
        }
      );
    }
  };

  const openDetails = (row: any) => {
    history.push(`/site/journal/${journalId}/pages/${row.uuid}`);
  };

  const pagesDataDateTransform = () => {
    let pages = props.pages.map((page: any) => {
      return {
        ...page,
        creationDate: page.publishDate
          ? new Date(page.publishDate.slice(0, 10)).toDateString()
          : '',
      };
    });
    return pages;
  };

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
      <CreationLinkDialog
        open={showCreationDialog}
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
  pages: selectPortalJournalPages(state),
  loading: selectPortalJournalPagesLoading(state),
  error: selectPortalJournalPagesError(state),
  errorMsg: selectPortalJournalPagesErrorMsg(state),
});

export default connect(mapStateToProps, {
  loadPortalJournalPages,
  loadPortalJournalPagesSuccess,
  loadPortalJournalPagesFailure,
})(JournalPages);
