import React, { useState } from "react";
import "./portals.scss";
import { connect } from "react-redux";
import AdminTable from "../../../../shared/components/portal-table/admin-table";
import { useTranslation } from "react-i18next";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { portalSelected } from "../../../site/store/actions/site.actions";
import { Portal } from "../../../site/models/portal.model";
import { useHistory } from "react-router-dom";
import { fetchPortalsData, createPortal } from "../../services/portals.service";
import { AppState } from "../../../../core/store/store";
import {
  selectPortals,
  selectPortalsPending,
  selectPortalsError,
  selectPortalsDialogOpen,
  selectPortalsErrorMsg,
} from "../../store/selectors/portals.selectors";
import {
  loadPortals,
  loadPortalsSuccess,
  loadPortalsFailure,
  openCloseCreationDialog,
} from "../../store/actions/portals.actions";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError } from "axios";
import CreationDialog from "../../../../shared/components/creation-dialog/creation-dialog";

interface PortalProps {
  portalSelected: typeof portalSelected;
  portalData: Portal[];
  loadPortals: typeof loadPortals;
  openCloseCreationDialog: typeof openCloseCreationDialog;
  loadPortalsSuccess: typeof loadPortalsSuccess;
  loadPortalsFailure: typeof loadPortalsFailure;
  loading: boolean;
  error: boolean;
  errorMsg: string;
  dialogOpen: boolean;
}

const headers = [
  {
    label: "Portal",
    value: "name",
  },
  {
    label: "Created By",
    value: "createdBy",
  },
  {
    label: "Domain",
    value: "domain",
  },
  {
    label: "Publish Date",
    value: "publishDate",
  },
];

export function Portals(props: PortalProps): JSX.Element {
  const { t } = useTranslation();
  let history = useHistory();

  const {
    loadPortals: loadPortalsProps,
    loadPortalsSuccess: loadPortalsSuccessProps,
    loadPortalsFailure: loadPortalsFailureProps,
  } = props;

  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [searchValue, setSearchValue] = useState("");

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const selectPortal = (portal: Portal) => {
    props.portalSelected(portal);
    history.push(`/site/${portal.uuid}/settings`);
  };

  const portalDataDateTransform = () => {
    let portals = props.portalData.map((portal: Portal) => {
      return {
        ...portal,
        publishDate: portal.publishDate
          ? new Date(portal.publishDate.slice(0, 10)).toDateString()
          : "",
      };
    });
    return portals;
  };

  const dialogClosed = (val?: string) => {
    props.openCloseCreationDialog(false);
    if (val) {
      createPortal(val).then((result: any) => {
        props.portalSelected({
          uuid: result.data.uuid,
          name: result.data.name,
          domain: result.data.domain,
          createdBy: result.data.createdBy,
          publishDate: result.data.publishDate,
        });
        history.push(`/site/${result.data.uuid}/settings`);
      });
    }
  };
  const getData = (val?: string) => {
    fetchPortalsData(page + 1, rowsPerPage, val)
      .then((res: any) => {
        loadPortalsSuccessProps(res.data.content);
        setCount(res.data.totalHits);
        setRowsPerPage(20);
      })
      .catch((error: AxiosError) =>
        loadPortalsFailureProps(error.response?.data.errorMessage)
      );
  };
  React.useEffect(() => {
    loadPortalsProps();
    getData();
    //eslint-disable-next-line
  }, [
    loadPortalsFailureProps,
    loadPortalsSuccessProps,
    loadPortalsProps,
    page,
    rowsPerPage,
  ]);

  return (
    <Box className="layout-list" display="flex" flexDirection="column">
      <Box className="list-title" display="flex" flexDirection="row">
        <span>{t("portals.title")}</span>
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
        data={portalDataDateTransform()}
        onRowClicked={selectPortal}
        currentPage={page}
        totalItems={count}
        itemsPerPage={rowsPerPage}
        onPageChange={(value: number) => handlePageChange(value)}
      />
      <CreationDialog
        open={props.dialogOpen}
        title={t("portal.creationDialog.title")}
        label={t("portal.creationDialog.name")}
        onCloseDialog={(val) => {
          dialogClosed(val);
        }}
      />
    </Box>
  );
}

const mapStateToProps = (state: AppState) => ({
  portalData: selectPortals(state),
  loading: selectPortalsPending(state),
  error: selectPortalsError(state),
  errorMsg: selectPortalsErrorMsg(state),
  dialogOpen: selectPortalsDialogOpen(state),
});

export default connect(mapStateToProps, {
  portalSelected,
  loadPortals,
  loadPortalsSuccess,
  loadPortalsFailure,
  openCloseCreationDialog,
})(Portals);
