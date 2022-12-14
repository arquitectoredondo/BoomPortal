import React, { useState } from 'react';
import './calendar-news-pages.scss';
import { connect } from 'react-redux';
import { AppState } from '../../../../core/store/store';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AdminTable from '../../../../shared/components/portal-table/admin-table';

import { useParams, useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';
import {
  loadCalendarNewsPages,
  loadCalendarNewsPagesSuccess,
  loadCalendarNewsPagesFailure,
} from '../../store/actions/calendar-news-pages.actions';
import {
  createCalendarNewsPage,
  getPages,
} from '../../services/calendar-news-pages.service';
import {
  selectCalendarNewsPages,
  selectCalendarNewsPagesLoading,
  selectCalendarNewsPagesError,
  selectCalendarNewsPagesErrorMsg,
} from '../../store/selectors/calendar-news-pages.selectors';
import CreationLinkDialog from '../../../../shared/components/creation-link-dialog/creation-link-dialog';

interface CalendarNewsPagesProps {
  loadCalendarNewsPages: typeof loadCalendarNewsPages;
  loadCalendarNewsPagesSuccess: typeof loadCalendarNewsPagesSuccess;
  loadCalendarNewsPagesFailure: typeof loadCalendarNewsPagesFailure;
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

export function CalendarNewsPages(props: CalendarNewsPagesProps): JSX.Element {
  const { t } = useTranslation();
  let { calendarNewId } = useParams<{ calendarNewId: string }>();
  let history = useHistory();

  const [showCreationDialog, setShowCreationDialog] = useState<boolean>(false);

  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  React.useEffect(() => {
    props.loadCalendarNewsPages();
    getPages(calendarNewId ? calendarNewId : '', '', page + 1, rowsPerPage)
      .then((result: any) => {
        props.loadCalendarNewsPagesSuccess(result.data.content);
        setCount(result.data.totalHits);
        setRowsPerPage(20);
      })
      .catch((error: AxiosError) =>
        props.loadCalendarNewsPagesFailure(error.response?.data.errorMessage)
      );
    // eslint-disable-next-line
  }, [page]);

  const dialogClosed = (val?: any) => {
    setShowCreationDialog(false);
    props.loadCalendarNewsPages();
    if (val) {
      createCalendarNewsPage({ ...val, parentUuid: calendarNewId }).then(
        (result: any) => {
          props.loadCalendarNewsPagesSuccess([]);
          history.push(
            `/site/calendarNew/${calendarNewId}/pages/${result.data.uuid}`
          );
        }
      );
    }
  };

  const openDetails = (row: any) => {
    history.push(`/site/calendarNew/${calendarNewId}/pages/${row.uuid}`);
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
  pages: selectCalendarNewsPages(state),
  loading: selectCalendarNewsPagesLoading(state),
  error: selectCalendarNewsPagesError(state),
  errorMsg: selectCalendarNewsPagesErrorMsg(state),
});

export default connect(mapStateToProps, {
  loadCalendarNewsPages,
  loadCalendarNewsPagesSuccess,
  loadCalendarNewsPagesFailure,
})(CalendarNewsPages);
