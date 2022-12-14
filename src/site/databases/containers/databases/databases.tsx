import React, { useState } from "react";
import "./databases.scss";
import { connect } from "react-redux";
import AdminTable from "../../../../shared/components/portal-table/admin-table";
import { useTranslation } from "react-i18next";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { databaseSelected } from "../../../site/store/actions/site.actions";
import { useHistory } from "react-router-dom";
import {
  fetchDatabasesData,
  createDatabase,
} from "../../services/database.service";
import { AppState } from "../../../../core/store/store";

import { Box, Button, FormControl, InputAdornment, OutlinedInput } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Database } from "../../../site/models/database.model";
import {
  loadDatabases,
  openCloseCreationDialog,
  loadDatabasesSuccess,
  loadDatabasesFailure,
} from "../../store/actions/databases.actions";
import {
  selectDatabases,
  selectDatabasesPending,
  selectDatabasesError,
  selectDatabaseDialogOpen,
  selectDatabasesErrorMsg,
} from "../../store/selectors/databases.selectors";
import { AxiosError } from "axios";
import CreationDialog from "../../../../shared/components/creation-dialog/creation-dialog";

interface DatabasesProps {
  databaseSelected: typeof databaseSelected;
  databaseData: Database[];
  loadDatabases: typeof loadDatabases;
  openCloseCreationDialog: typeof openCloseCreationDialog;
  loadDatabasesSuccess: typeof loadDatabasesSuccess;
  loadDatabasesFailure: typeof loadDatabasesFailure;
  loading: boolean;
  error: boolean;
  errorMsg: string;
  dialogOpen: boolean;
}

const headers = [
  {
    label: "Database",
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

export function Databases(props: DatabasesProps): JSX.Element {
  const { t } = useTranslation();
  let history = useHistory();

  const {
    loadDatabases: loadDatabasesProps,
    loadDatabasesSuccess: loadDatabasesSuccessProps,
    loadDatabasesFailure: loadDatabasesFailureProps,
  } = props;

  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [searchValue, setSearchValue] = useState('');


  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const selectDatabase = (database: Database) => {
    props.databaseSelected(database);
    history.push(`/site/database/${database.uuid}/home`);
  };

  const databaseDataDateAndStatusTransform = () => {
    let databases = props.databaseData.map((database: Database) => {
      return {
        ...database,
        publicationDate: database.publicationDate
          ? new Date(database.publicationDate.slice(0, 10)).toDateString()
          : "",
      };
    });
    return databases;
  };

  const dialogClosed = (val?: string) => {
    props.openCloseCreationDialog(false);
    if (val) {
      createDatabase(val).then((result: any) => {
        props.databaseSelected({
          uuid: result.data.uuid,
          name: result.data.name,
          editedBy: result.data.editedBy,
          publicationDate: result.data.publicationDate,
          canRevert: result.data.canRevert,
          visibility: result.data.visibility,
          openAccess: result.data.openAccess,
        });
        history.push(`/site/database/${result.data.uuid}/home`);
      });
    }
  };

  const getData=(val?:string)=>{

    fetchDatabasesData(page+1, rowsPerPage,val)
      .then((res: any) => {
        loadDatabasesSuccessProps(res.data.content);
        setCount(res.data.totalHits);
        setRowsPerPage(20);
      })
      .catch((error: AxiosError) =>
        loadDatabasesFailureProps(error.response?.data.errorMessage)
      );
  }

  React.useEffect(() => {
    loadDatabasesProps();
    getData()
    //eslint-disable-next-line
  }, [
    loadDatabasesFailureProps,
    loadDatabasesSuccessProps,
    loadDatabasesProps,
    page,
    rowsPerPage,
  ]);

  return (
    <Box className="layout-list" display="flex" flexDirection="column">
      <Box className="list-title" display="flex" flexDirection="row">
        <span>{t("databases.title")}</span>
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
        <Button
          id="add-button"
          onClick={() => props.openCloseCreationDialog(true)}
        >
          <FontAwesomeIcon size="lg" icon={faPlus} />
        </Button>
      </Box>
      <AdminTable
        headers={headers}
        data={databaseDataDateAndStatusTransform()}
        onRowClicked={selectDatabase}
        currentPage={page}
        totalItems={count}
        itemsPerPage={rowsPerPage}
        onPageChange={(value: number) => handlePageChange( value )}
      />
      <CreationDialog
        open={props.dialogOpen}
        title={t("database.creationDialog.title")}
        label={t("database.creationDialog.name")}
        onCloseDialog={(val) => {
          dialogClosed(val);
        }}
      />
    </Box>
  );
}

const mapStateToProps = (state: AppState) => ({
  databaseData: selectDatabases(state),
  loading: selectDatabasesPending(state),
  error: selectDatabasesError(state),
  errorMsg: selectDatabasesErrorMsg(state),
  dialogOpen: selectDatabaseDialogOpen(state),
});

export default connect(mapStateToProps, {
  databaseSelected,
  loadDatabases,
  loadDatabasesSuccess,
  loadDatabasesFailure,
  openCloseCreationDialog,
})(Databases);
