import React from 'react';
import './calendar-news.scss';
import { connect } from 'react-redux';
import AdminTable from '../../../../shared/components/portal-table/admin-table';
import { useTranslation } from 'react-i18next';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { calendarNewSelected } from '../../../site/store/actions/site.actions';
import { useHistory } from 'react-router-dom';
import {
  fetchCalendarNewsData,
  createCalendarNew,
} from '../../services/calendar-news.service';
import { AppState } from '../../../../core/store/store';

import { Box, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CalendarNews } from '../../../site/models/calendarNews.model';
import {
  loadCalendarNews,
  openCloseCreationDialog,
  loadCalendarNewsSuccess,
  loadCalendarNewsFailure,
} from '../../store/actions/calendar-news.actions';
import {
  selectCalendarNews,
  selectCalendarNewsPending,
  selectCalendarNewsError,
  selectCalendarNewDialogOpen,
  selectCalendarNewsErrorMsg,
} from '../../store/selectors/calendar-news.selectors';
import { AxiosError } from 'axios';
import CreationDialog from '../../../../shared/components/creation-dialog/creation-dialog';

interface CalendarNewsProps {
  calendarNewSelected: typeof calendarNewSelected;
  calendarNewData: CalendarNews[];
  loadCalendarNews: typeof loadCalendarNews;
  openCloseCreationDialog: typeof openCloseCreationDialog;
  loadCalendarNewsSuccess: typeof loadCalendarNewsSuccess;
  loadCalendarNewsFailure: typeof loadCalendarNewsFailure;
  loading: boolean;
  error: boolean;
  errorMsg: string;
  dialogOpen: boolean;
}

const headers = [
  {
    label: 'Calendar News',
    value: 'name',
  },
  {
    label: 'Edited By',
    value: 'editedBy',
  },
  {
    label: 'Publish Date',
    value: 'publicationDate',
  },
];

export function CalendarNewsComponent(props: CalendarNewsProps): JSX.Element {
  const { t } = useTranslation();
  let history = useHistory();

  const {
    loadCalendarNews: loadCalendarNewsProps,
    loadCalendarNewsSuccess: loadCalendarNewsSuccessProps,
    loadCalendarNewsFailure: loadCalendarNewsFailureProps,
  } = props;

  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const selectCalendarNew = (database: CalendarNews) => {
    props.calendarNewSelected(database);
    history.push(`/site/calendarNew/${database.uuid}/home`);
  };

  const calendarNewDataDateAndStatusTransform = () => {
    let databases = props.calendarNewData.map((database: CalendarNews) => {
      return {
        ...database,
        publicationDate: database.publicationDate
          ? new Date(database.publicationDate.slice(0, 10)).toDateString()
          : '',
      };
    });
    return databases;
  };

  const dialogClosed = (val?: string) => {
    props.openCloseCreationDialog(false);
    if (val) {
      createCalendarNew(val).then((result: any) => {
        props.calendarNewSelected({
          uuid: result.data.uuid,
          name: result.data.name,
          editedBy: result.data.editedBy,
          publicationDate: result.data.publicationDate,
          canRevert: result.data.canRevert,
          visibility: result.data.visibility,
          openAccess: result.data.openAccess,
        });
        history.push(`/site/calendarNew/${result.data.uuid}/home`);
      });
    }
  };

  React.useEffect(() => {
    loadCalendarNewsProps();
    fetchCalendarNewsData(page + 1, rowsPerPage)
      .then((res: any) => {
        loadCalendarNewsSuccessProps(res.data.content);
        setCount(res.data.totalHits);
        setRowsPerPage(20);
      })
      .catch((error: AxiosError) =>
        loadCalendarNewsFailureProps(error.response?.data.errorMessage)
      );
  }, [
    loadCalendarNewsFailureProps,
    loadCalendarNewsSuccessProps,
    loadCalendarNewsProps,
    page,
    rowsPerPage,
  ]);

  return (
    <Box className="layout-list" display="flex" flexDirection="column">
      <Box className="list-title" display="flex" flexDirection="row">
        <span>Select calendar database</span>
        <Button
          id="add-button"
          onClick={() => props.openCloseCreationDialog(true)}
        >
          <FontAwesomeIcon size="lg" icon={faPlus} />
        </Button>
      </Box>
      <AdminTable
        headers={headers}
        data={calendarNewDataDateAndStatusTransform()}
        onRowClicked={selectCalendarNew}
        currentPage={page}
        totalItems={count}
        itemsPerPage={rowsPerPage}
        onPageChange={(value: number) => handlePageChange(value)}
      />
      <CreationDialog
        open={props.dialogOpen}
        title={t('calendarNews.creationDialog.title')}
        label={t('calendarNews.creationDialog.name')}
        onCloseDialog={(val) => {
          dialogClosed(val);
        }}
      />
    </Box>
  );
}

const mapStateToProps = (state: AppState) => ({
  calendarNewData: selectCalendarNews(state),
  loading: selectCalendarNewsPending(state),
  error: selectCalendarNewsError(state),
  errorMsg: selectCalendarNewsErrorMsg(state),
  dialogOpen: selectCalendarNewDialogOpen(state),
});

export default connect(mapStateToProps, {
  calendarNewSelected,
  loadCalendarNews,
  loadCalendarNewsSuccess,
  loadCalendarNewsFailure,
  openCloseCreationDialog,
})(CalendarNewsComponent);
