import React, { useState } from "react";
import "./journals.scss";
import { connect } from "react-redux";
import AdminTable from "../../../../shared/components/portal-table/admin-table";
import { useTranslation } from "react-i18next";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { journalSelected } from "../../../site/store/actions/site.actions";
import { useHistory } from "react-router-dom";
import {
  fetchJournalsData,
  createJournal,
} from "../../services/journals.service";
import { AppState } from "../../../../core/store/store";

import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Journal } from "../../../site/models/journal.model";
import {
  loadJournals,
  openCloseCreationDialog,
  loadJournalsSuccess,
  loadJournalsFailure,
} from "../../store/actions/journals.actions";
import {
  selectJournals,
  selectJournalsPending,
  selectJournalsError,
  selectJournalDialogOpen,
  selectJournalsErrorMsg,
} from "../../store/selectors/journals.selectors";
import { AxiosError } from "axios";
import CreationDialog from "../../../../shared/components/creation-dialog/creation-dialog";

interface JournalsProps {
  journalSelected: typeof journalSelected;
  journalData: Journal[];
  loadJournals: typeof loadJournals;
  openCloseCreationDialog: typeof openCloseCreationDialog;
  loadJournalsSuccess: typeof loadJournalsSuccess;
  loadJournalsFailure: typeof loadJournalsFailure;
  loading: boolean;
  error: boolean;
  errorMsg: string;
  dialogOpen: boolean;
}

const headers = [
  {
    label: "Journal",
    value: "name",
  },
  {
    label: "Edited By",
    value: "editedBy",
  },
  {
    label: "Publish Date",
    value: "publicationDate",
  },
];

export function Journals(props: JournalsProps): JSX.Element {
  const { t, i18n } = useTranslation();
  i18n.language !== "nl" && i18n.changeLanguage("nl");
  let history = useHistory();

  const {
    loadJournals: loadJournalsProps,
    loadJournalsSuccess: loadJournalsSuccessProps,
    loadJournalsFailure: loadJournalsFailureProps,
  } = props;

  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [searchValue, setSearchValue] = useState("");

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const selectJournal = (journal: Journal) => {
    props.journalSelected(journal);
    history.push(`/site/journal/${journal.uuid}/home`);
  };

  const journalDataDateAndStatusTransform = () => {
    let journals = props.journalData.map((journal: Journal) => {
      return {
        ...journal,
        publicationDate: journal.publicationDate
          ? new Date(journal.publicationDate.slice(0, 10)).toDateString()
          : "",
      };
    });
    return journals;
  };

  const dialogClosed = (val?: string) => {
    props.openCloseCreationDialog(false);
    if (val) {
      createJournal(val).then((result: any) => {
        props.journalSelected({
          uuid: result.data.uuid,
          name: result.data.name,
          editedBy: result.data.editedBy,
          publicationDate: result.data.publicationDate,
          canRevert: result.data.canRevert,
          visibility: result.data.visibility,
          openAccess: result.data.openAccess,
        });
        history.push(`/site/journal/${result.data.uuid}/home`);
      });
    }
  };

  const getData = (val?: string) => {
    fetchJournalsData(page + 1, rowsPerPage, val)
      .then((res: any) => {
        loadJournalsSuccessProps(res.data.content);
        setCount(res.data.totalHits);
        setRowsPerPage(20);
      })
      .catch((error: AxiosError) =>
        loadJournalsFailureProps(error.response?.data.errorMessage)
      );
  };

  React.useEffect(() => {
    loadJournalsProps();
    getData();
    // eslint-disable-next-line
  }, [
    loadJournalsFailureProps,
    loadJournalsSuccessProps,
    loadJournalsProps,
    page,
    rowsPerPage,
  ]);

  return (
    <Box className="layout-list" display="flex" flexDirection="column">
      <Box className="list-title" display="flex" flexDirection="row">
        <span>{t("journals.title")}</span>
        <FormControl variant="outlined" className="form-label-textfield">
          <OutlinedInput
            id="search-field"
            value={searchValue}
            onChange={(e: any) => {
              getData(e.target.value.length > 2 ? e.target.value : "");
              setSearchValue(e.target.value);
            }}
            placeholder={t("news.searchFilterPH")}
            endAdornment={
              <InputAdornment position="end">
                <FontAwesomeIcon size="sm" icon={faSearch} />
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          id="add-button"
          onClick={() => props.openCloseCreationDialog(true)}
        >
          <FontAwesomeIcon size="lg" icon={faPlus} />
        </Button>
      </Box>
      <AdminTable
        headers={headers}
        data={journalDataDateAndStatusTransform()}
        onRowClicked={selectJournal}
        currentPage={page}
        totalItems={count}
        itemsPerPage={rowsPerPage}
        onPageChange={(value: number) => handlePageChange(value)}
      />
      <CreationDialog
        open={props.dialogOpen}
        title={t("journal.creationDialog.title")}
        label={t("journal.creationDialog.name")}
        onCloseDialog={(val) => {
          dialogClosed(val);
        }}
      />
    </Box>
  );
}

const mapStateToProps = (state: AppState) => ({
  journalData: selectJournals(state),
  loading: selectJournalsPending(state),
  error: selectJournalsError(state),
  errorMsg: selectJournalsErrorMsg(state),
  dialogOpen: selectJournalDialogOpen(state),
});

export default connect(mapStateToProps, {
  journalSelected,
  loadJournals,
  loadJournalsSuccess,
  loadJournalsFailure,
  openCloseCreationDialog,
})(Journals);
