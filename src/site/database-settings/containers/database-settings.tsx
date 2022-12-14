import React, { useState } from "react";
import "./database-settings.scss";
import { connect } from "react-redux";
import { AppState } from "../../../core/store/store";
import ContainerTemplate from "../../../shared/components/container-template/container-template";
import {
  Box,
  Button,
  TextField,
  Switch,
  NativeSelect,
  Tooltip,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  loadDatabaseSettings,
  loadDatabaseSettingsSuccess,
  loadDatabaseSettingsFailure,
  saveDatabaseSettings,
} from "../store/actions/database-settings.actions";
import { DatabaseSettings } from "../models/database-settings.model";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  selectDatabaseSettingsLoading,
  selectDatabaseSettingsError,
  selectDatabaseSettings,
  selectDatabaseSettingsErrorMsg,
} from "../store/selectors/database-settings.selectors";
import {
  getDatabaseSettings,
  saveDraftDatabaseSettings,
  revertDatabaseSettings,
  publishDatabaseSettings,
  retrieveDatabaseList,
  deleteDatabase,
} from "../services/database-settings.service";
import { useNotOnMountEffect } from "../../../shared/services/utils";
import { AxiosError } from "axios";
import ConfirmDialog from "../../../shared/components/confirm-dialog/confirm-dialog";

interface DatabaseSettingsProps {
  loadDatabaseSettings: typeof loadDatabaseSettings;
  loadDatabaseSettingsSuccess: typeof loadDatabaseSettingsSuccess;
  loadDatabaseSettingsFailure: typeof loadDatabaseSettingsFailure;
  saveDatabaseSettings: typeof saveDatabaseSettings;
  loading: boolean;
  error: boolean;
  errorMsg: string;
  databaseSettings: DatabaseSettings | undefined;
}

export function DatabaseSettingsComponent(
  props: DatabaseSettingsProps
): JSX.Element {
  const { t } = useTranslation();
  let history = useHistory();
  let { databaseId } = useParams<{ databaseId: string }>();
  const {
    loadDatabaseSettings: loadDatabaseSettingsProps,
    loadDatabaseSettingsSuccess: loadDatabaseSettingsSuccessProps,
    loadDatabaseSettingsFailure: loadDatabaseSettingsFailureProps,
  } = props;
  const [settings, setSettings] = useState<DatabaseSettings | undefined>(
    props.databaseSettings
  );
  const [ean, setEan] = useState<string>();
  const [databaseList, setDatabaseList] = useState<any[]>([]);
  const [databaseSelected, setDatabaseSelected] = useState<{
    url: string;
    id: string;
  }>();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  React.useEffect(() => {
    loadDatabaseSettingsProps();
    getDatabaseSettings(databaseId ? databaseId : "")
      .then((result: any) => {
        setSettings(result.data);
        loadDatabaseSettingsSuccessProps(result.data);
      })
      .catch((error: AxiosError) =>
        loadDatabaseSettingsFailureProps(error.response?.data.errorMessage)
      );
  }, [
    databaseId,
    loadDatabaseSettingsProps,
    loadDatabaseSettingsSuccessProps,
    loadDatabaseSettingsFailureProps,
  ]);

  React.useEffect(() => {
    retrieveDatabaseList(props.databaseSettings?.boomDatabaseId).then((res: any) => {
      setDatabaseList(res.data);
    });
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (settings?.boomDatabaseId && databaseList.length > 0) {
      let selectedDatabase = databaseList.find(
        (database: any) => database.id === settings.boomDatabaseId
      );
      setDatabaseSelected(selectedDatabase);
    }
    // eslint-disable-next-line
  }, [databaseList.length, settings]);

  React.useEffect(() => {
    if (databaseSelected) {
      handleChanges("url", databaseSelected.url);
    } else {
      handleChanges("url", "");
    }
    // eslint-disable-next-line
  }, [databaseSelected]);

  useNotOnMountEffect(() => {
    saveChanges();
  }, [
    settings?.visibility,
    settings?.eans?.length,
    settings?.cover,
    settings?.css,
    settings?.boomDatabaseId,
    settings?.url,
    settings?.openAccess,
  ]);

  const handleChanges = (key: string, value: any) => {
    if (settings) {
      setSettings({ ...settings, [key]: value });
    }
  };

  const setImageBase64 = (key: string, file: File) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (typeof reader.result === "string") {
        handleChanges(key, reader.result);
      }
    };
  };

  const saveChanges = () => {
    if (settings) {
      // loadDatabaseSettingsProps();
      saveDraftDatabaseSettings(settings)
        .then((result: any) => {
          props.saveDatabaseSettings(settings);
          // setSettings(result.data);
          loadDatabaseSettingsSuccessProps(result.data);
        })
        .catch((error: AxiosError) => {
          loadDatabaseSettingsFailureProps(error.response?.data.errorMessage);
        });
    }
  };

  const revertChanges = () => {
    if (settings) {
      props.saveDatabaseSettings(settings);
      revertDatabaseSettings(databaseId ? databaseId : "").then(
        (result: any) => {
          setSettings(result.data);
          loadDatabaseSettingsSuccessProps(result.data);
        }
      );
    }
  };

  const publishChanges = () => {
    if (settings) {
      props.saveDatabaseSettings(settings);
      publishDatabaseSettings(databaseId ? databaseId : "");
      setSettings({ ...settings, canRevert: false });
    }
  };

  const handleDatabaseChange = (event: React.ChangeEvent<{ value: any }>) => {
    let selectedDatabase = databaseList.find(
      (database: any) => database.id === event.target.value
    );
    if (selectedDatabase) {
      setDatabaseSelected(selectedDatabase);
      handleChanges("boomDatabaseId", selectedDatabase.id);
    } else {
      setDatabaseSelected({
        url: "",
        id: "",
      });
      handleChanges("boomDatabaseId", "");
    }
  };

  const handleDeleteEan = (index: number) => {
    if (settings) {
      let copyEansList = settings.eans;
      copyEansList.splice(index, 1);
      setSettings({ ...settings, eans: copyEansList });
    }
  };

  const handleAddEan = () => {
    if (settings && ean) {
      setSettings({
        ...settings,
        eans: [...(settings.eans ? settings.eans : []), ean],
      });
      setEan(undefined);
    }
  };

  const reloadError = () => {
    loadDatabaseSettingsProps();
    getDatabaseSettings(databaseId ? databaseId : "")
      .then((result: any) => {
        setSettings(result.data);
        loadDatabaseSettingsSuccessProps(result.data);
      })
      .catch((error: AxiosError) =>
        loadDatabaseSettingsFailureProps(error.response?.data.errorMessage)
      );
  };

  const handleBackButton = () => {
    history.push(`/site/databases`);
    setDatabaseSelected({
        url: "",
        id: "",
      });
  };

  const closeConfirm = (confirm: boolean) => {
    setOpenConfirm(false);
    if (confirm) {
      props.loadDatabaseSettings();
      deleteDatabase(databaseId).then(handleBackButton)
      .catch((error: AxiosError) => {
        props.loadDatabaseSettingsFailure(error.response?.data.errorMessage)
      });
    }
  };

  return (
    <ContainerTemplate
      id="container-template"
      loading={props.loading}
      error={props.error}
      errorMsg={props.errorMsg}
      reload={true}
      onReload={reloadError}
    >
      <Box
        display="flex"
        flexDirection="column"
        flex={1}
        className="database-settings-body"
      >
        <Box
          display="flex"
          className="header-settings"
          flexDirection="row"
          alignItems="center"
        >
          <span>{t("databaseSettings.databaseSettings")}</span>
          <Box
            display="flex"
            flexDirection="row"
            flex={1}
            justifyContent="flex-end"
          >
            <Box display="flex" flex={1}></Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              {t("buttons.hidden")}
              <Switch
                id="visibility-switch"
                data-cy="visibility-button"
                checked={settings?.visibility}
                onChange={(evt: any) =>
                  handleChanges("visibility", evt.target.checked)
                }
                color="primary"
              />
              {t("buttons.visible")}
            </Box>
          </Box>
          <Box className="main-buttons">
            {settings?.canRevert && (
              <Button
                id="revert-button"
                className="main-red-button"
                variant="contained"
                onClick={() => revertChanges()}
              >
                {t("buttons.revert")}
              </Button>
            )}
            <Button
              id="preview-button"
              className="main-blue-button"
              variant="contained"
            >
              {t("buttons.preview")}
            </Button>
            <Button
              id="publish-changes-button"
              data-cy="publish-button"
              disabled={
                !(
                  settings?.boomDatabaseId &&
                  settings?.name &&
                  settings?.cover &&
                  settings?.eans &&
                  settings?.url
                )
              }
              className="main-green-button"
              variant="contained"
              onClick={() => publishChanges()}
            >
              {t("buttons.publish")}
            </Button>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column">
          <div className="title">{t("databaseSettings.databaseName")} </div>
          <TextField
            className="input-name"
            id="settings-name"
            variant="outlined"
            value={settings?.name || ""}
            onChange={(evt: any) => handleChanges("name", evt.target.value)}
            onBlur={() => saveChanges()}
          />
        </Box>

        <Box display="flex" flexDirection="column">
          <div className="title">{t("databaseSettings.databaseSelector")}</div>
          <div>
            <Box
              display="flex"
              flex-direction="column"
              className="database-selector"
            >
              <Box>
                <NativeSelect
                  id="database-selector"
                  className={
                    settings?.boomDatabaseId
                      ? "select-database"
                      : "select-database-required required-selector"
                  }
                  value={databaseSelected?.id}
                  onChange={handleDatabaseChange}
                >
                  <option>{t("databaseSettings.selector")}</option>

                  {databaseList?.map((database: any, i: number) => (
                    <option id="database-display" key={i} value={database.id}>
                      {database.title}
                    </option>
                  ))}
                </NativeSelect>
                <span className="error-text">
                  {settings?.boomDatabaseId
                    ? ""
                    : t("placeholders.requiredField")}
                </span>
              </Box>
            </Box>
          </div>
        </Box>

        <Box display="flex" flexDirection="column">
          <div className="title">{t("databaseSettings.databaseUrl")} </div>
          <TextField
            disabled
            className="input-name"
            id="settings-url"
            variant="outlined"
            value={settings?.url || ""}
          />
        </Box>
        <Box display="flex" flexDirection="column">
          <div className="title">{t("databaseSettings.description")} </div>
          <TextField
            className="discription-field"
            id="description-input"
            variant="outlined"
            multiline
            rows={3}
            value={settings?.description || ""}
            onChange={(evt: any) =>
              handleChanges("description", evt.target.value)
            }
            onBlur={() => saveChanges()}
          />
        </Box>

        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            className="file-buttons"
            alignItems="center"
          >
            <input
              accept=".png, .jpg, .jpeg"
              id="database-cover-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={(evt: any) =>
                setImageBase64("cover", evt.target.files[0])
              }
            />
            <label htmlFor="database-cover-button-file">
              <Button
                className="main-blue-button"
                variant="contained"
                component="span"
              >
                {t("databaseSettings.databaseCover")}
              </Button>
            </label>
            <Button
              id="cover-button"
              data-cy="cover-revert-button"
              className="main-red-button"
              variant="contained"
              onClick={() => handleChanges("cover", "")}
            >
              {t("buttons.revert")}
            </Button>
            <span className="error-text">
              {settings?.cover ? "" : t("placeholders.requiredField")}
            </span>
          </Box>

          {settings?.cover ? (
            <img
              id="settings-cover"
              data-cy="cover"
              className="cover"
              src={settings.cover}
              alt="favicon"
            />
          ) : (
            <div className="cover-shadow" data-cy="cover"></div>
          )}
        </Box>
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            className="file-buttons"
            alignItems="center"
          >
            <input
              accept=".css"
              id="database-css-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={(evt: any) => setImageBase64("css", evt.target.files[0])}
            />
            <label htmlFor="database-css-button-file">
              <Button
                className="main-blue-button"
                variant="contained"
                component="span"
              >
                {t("databaseSettings.databaseCssFile")}
              </Button>
            </label>
            <Button
              id="cover-button"
              data-cy="cover-revert-button"
              className="main-red-button"
              variant="contained"
              onClick={() => handleChanges("css", "")}
            >
              {t("buttons.revert")}
            </Button>
          </Box>

          {settings?.css ? (
            <img className="css-icon" src="/assets/css-file.png" alt="css" />
          ) : (
            <div className="css-cover-shadow" data-cy="cover">
              Add css file
            </div>
          )}
        </Box>

        <Box display="flex" flexDirection="row">
          <div className="title">{t("journalSettings.openAccess")} </div>
          <div className="open-access">
            <Switch
                id="open-access-switch"
                data-cy="open-access-button"
                checked={settings?.openAccess}
                onChange={(evt: any) =>
                  handleChanges("openAccess", evt.target.checked)
                }
                color="primary"
              />
          </div>
        </Box>
        
        <Box display="flex" flexDirection="column">
          <div className="title">{t("databaseSettings.licenses")} </div>

          <div>
            {settings?.eans &&
              settings?.eans.map((eanItem: string, i: number) => (
                <Box
                  key={i}
                  display="flex"
                  flex-direction="column"
                  className="eans-list"
                >
                  <Box flexGrow={1}>{eanItem}</Box>
                  <Box>
                    <Button
                      id="deleteEan-button"
                      onClick={(e) => handleDeleteEan(i)}
                    >
                      <FontAwesomeIcon className="trash-icon" icon={faTrash} />
                    </Button>
                  </Box>
                </Box>
              ))}

            <Box
              display="flex"
              flex-direction="column"
              className="years-select"
            >
              <Box display="flex" flexDirection="column">
                <TextField
                  className="input-name license"
                  id="ean-name"
                  variant="outlined"
                  value={ean}
                  onChange={(evt: any) => setEan(evt.target.value)}
                  error={settings?.eans?.length === 0}
                />
              </Box>
              <Box>
                <Button
                  id="addEan-button"
                  data-cy="addEan-button"
                  onClick={handleAddEan}
                >
                  <FontAwesomeIcon className="trash-icon" icon={faPlus} />
                </Button>
              </Box>
            </Box>
            <span className="error-text">
              {settings?.eans?.length !== 0
                ? ""
                : t("placeholders.requiredField")}
            </span>
          </div>
        </Box>
        <Box>
          <div className="title">{t("databaseSettings.deleteDatabase")}</div>
        </Box>
        <Box>
          <Tooltip title={(settings?.visibility) ? "Database must be hidden" : "Delete Database" }  placement="top">
            <span>
              <Button variant="contained" className="main-red-button delete-button" 
                onClick={() => setOpenConfirm(true)}
                disabled={
                  (settings?.visibility)
                }
              >
                {t("buttons.deletePermanent")}
              </Button>
            </span>
          </Tooltip>
        </Box>
        <ConfirmDialog
          open={openConfirm}
          bodyMessage={t("themeSettings.deleteMessage")}
          onClose={closeConfirm}
        />
      </Box>
    </ContainerTemplate>
  );
}

const mapStateToProps = (state: AppState) => ({
  loading: selectDatabaseSettingsLoading(state),
  error: selectDatabaseSettingsError(state),
  errorMsg: selectDatabaseSettingsErrorMsg(state),
  databaseSettings: selectDatabaseSettings(state),
});

export default connect(mapStateToProps, {
  loadDatabaseSettings,
  loadDatabaseSettingsSuccess,
  loadDatabaseSettingsFailure,
  saveDatabaseSettings,
})(DatabaseSettingsComponent);
