import React, { useState } from "react";
import "./settings.scss";
import { connect } from "react-redux";
import { AppState } from "../../../../core/store/store";
import { deletePortal } from "../../services/settings.service";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Snackbar,
  Tooltip,
  fade,
} from "@material-ui/core";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import {
  loadPortalSettings,
  loadPortalSettingsSuccess,
  loadPortalSettingsFailure,
  savePortalSettings,
} from "../../store/actions/settings.actions";
import ContainerTemplate from "../../../../shared/components/container-template/container-template";
import {
  selectPortalSettingsLoading,
  selectPortalSettingsError,
  selectPortalSettings,
  selectPortalSettingsErrorMsg,
} from "../../store/selectors/settings.selectors";
import { PortalSettings } from "../../models/portal-settings.model";
import { useParams } from "react-router-dom";
import {
  saveDraftPortalSettings,
  revertPortalSettings,
  getPortalSettings,
  publishPortalSettings,
} from "../../services/settings.service";
import MenuAdditionDialog from "../../components/menu-addition-dialog/menu-addition-dialog";
import { useNotOnMountEffect } from "../../../../shared/services/utils";
import MenuSelector from "../../../../shared/components/menu-selector/menu-selector";
import {
  HeaderMenu,
  MenuHeaderItem,
} from "../../../../shared/models/menuItem.model";
import { portalSelected } from "../../../site/store/actions/site.actions";
import { AxiosError } from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import ConfirmDialog from "../../../../shared/components/confirm-dialog/confirm-dialog";
import { resetThemeSettings } from "../../../themes/store/actions/theme-settings.actions";
import { themeIsSelected } from "../../../themes/store/actions/theme.actions";
import { ColorPickerComponent } from "../../../../shared/components/color-picker-component/color-picker-component";
import { getPages } from "../../../pages/services/pages.service";
interface SettingsProps {
  resetThemeSettings: typeof resetThemeSettings;
  loadPortalSettings: typeof loadPortalSettings;
  themeIsSelected: typeof themeIsSelected;
  portalSelected: typeof portalSelected;
  loadPortalSettingsSuccess: typeof loadPortalSettingsSuccess;
  loadPortalSettingsFailure: typeof loadPortalSettingsFailure;
  savePortalSettings: typeof savePortalSettings;
  loading: boolean;
  error: boolean;
  errorMsg: string;
  portalSettings: PortalSettings | undefined;
}
export function Settings(props: SettingsProps): JSX.Element {
  const { t, i18n } = useTranslation();
  let history = useHistory();
  let { portalUuid } = useParams<{ portalUuid: string }>();
  const [addMenuDialog, setAddMenuDialog] = useState<boolean>(false);
  const [settings, setSettings] = useState<PortalSettings | undefined>(
    props.portalSettings
  );
  const [sampleColorPrimary, setSampleColorPrimary] = useState<string>(
    settings?.colorPrimary || "#003484"
  );
  const [sampleColorSecondary, setSampleColorSecondary] = useState<string>(
    settings?.colorSecondary || "#eb6b0a"
  );
  const [sampleColorMainMenu, setSampleColorMainMenu] = useState<string>(
    settings?.colorMainMenu || "#313131"
  );
  const [open, setOpen] = useState<boolean>(false);
  const [showMainColor, setShowMainColor] = useState<boolean>(false);
  const [showSecondaryColor, setShowSecondaryColor] = useState<boolean>(false);
  const [showMenuMainColor, setShowMenuMainColor] = useState<boolean>(false);
  const [editingMenuItem, setEditingMenuItem] = useState<boolean>(false);
  const [menuItemToEdit, setMenuItemToEdit] = useState<MenuHeaderItem>();
  const [isHomepageEdit, setIsHomepageEdit] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [allowLanguageSwitch, setAllowLanguageSwitch] = useState<boolean>(true);
  React.useEffect(() => {
    props.loadPortalSettings();
    props.resetThemeSettings();
    props.themeIsSelected(false);
    getPortalSettings(portalUuid ? portalUuid : "")
      .then((result: any) => {
        setSettings(result.data);
        props.loadPortalSettingsSuccess(result.data);
      })
      .catch(() => props.loadPortalSettingsFailure());
    getPages(portalUuid ? portalUuid : "", "", 1, 1)
      .then((result: any) => {
        result.data.content.length > 0 && setAllowLanguageSwitch(false);
      })
      .catch((error: AxiosError) => {
        setAllowLanguageSwitch(false);
        console.error("Error while getting pages", error);
      });
    // eslint-disable-next-line
  }, [
    portalUuid,
    loadPortalSettings,
    loadPortalSettingsSuccess,
    loadPortalSettingsFailure,
  ]);
  useNotOnMountEffect(() => {
    setSampleColorPrimary(settings?.colorPrimary || "#003484");
    setSampleColorSecondary(settings?.colorSecondary || "#eb6b0a");
    setSampleColorMainMenu(settings?.colorMainMenu || "#313131");
    saveChanges();
  }, [
    settings?.clientId,
    settings?.colorPrimary,
    settings?.homepage?.label.nl,
    settings?.homepage?.pageId,
    settings?.visibility,
    settings?.colorSecondary,
    settings?.colorMainMenu,
    settings?.colorSecondaryMenu,
    settings?.htmlFavicon,
    settings?.logo,
    settings?.background,
    settings?.menuItems?.length,
    settings?.showRelatedPublications,
    settings?.catalogAsHomePage,
    settings?.languages?.length,
    settings?.showVideos,
    settings?.showAvailableEditions,
    settings?.showELearning,
    settings?.showGroupAccess,
    settings?.showFullTextSearch,
    settings?.showLanguageSelector,
  ]);
  useNotOnMountEffect(() => {
    if (menuItemToEdit?.label) {
      setAddMenuDialog(true);
      setEditingMenuItem(true);
    }
  }, [menuItemToEdit?.label]);
  React.useEffect(() => {
    setOpen(props.error);
  }, [props.error]);
  React.useEffect(() => {
    settings?.languages.includes("nl")
      ? i18n.changeLanguage("nl")
      : i18n.changeLanguage("en");
    // eslint-disable-next-line
  }, [settings]);
  const handleChanges = (key: string, value: any) => {
    if (settings) {
      setSettings({ ...settings, [key]: value });
    }
  };
  const reloadError = () => {
    props.loadPortalSettings();
    getPortalSettings(portalUuid ? portalUuid : "")
      .then((result: any) => {
        setSettings(result.data);
        props.loadPortalSettingsSuccess(result.data);
      })
      .catch(() => props.loadPortalSettingsFailure());
  };
  const saveChanges = () => {
    if (settings) {
      saveDraftPortalSettings(settings)
        .then((result: any) => {
          setSettings(result.data);
          props.savePortalSettings(settings);
          props.portalSelected(result.data);
          props.loadPortalSettingsSuccess(result.data);
        })
        .catch((error: AxiosError) => {
          props.loadPortalSettingsFailure(error.response?.data.errorMessage);
        });
    }
  };
  const snackBarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const saveMenu = (menu: HeaderMenu[]) => {
    if (settings) {
      const saveMenuSettings: PortalSettings = { ...settings, menuItems: menu };
      setSettings({
        ...settings,
        menuItems: [...saveMenuSettings.menuItems],
      });
      saveDraftPortalSettings(saveMenuSettings)
        .then((result: any) => {
          setSettings(result.data);
          props.savePortalSettings(saveMenuSettings);
          props.loadPortalSettingsSuccess(result.data);
        })
        .catch(() => props.loadPortalSettingsFailure());
    }
  };
  const revertChanges = () => {
    if (settings) {
      props.savePortalSettings(settings);
      revertPortalSettings(portalUuid ? portalUuid : "")
        .then((result: any) => {
          setSettings(result.data);
          props.portalSelected(result.data);
          props.loadPortalSettingsSuccess(result.data);
        })
        .catch(() => props.loadPortalSettingsFailure());
    }
  };
  const publishChanges = () => {
    if (settings) {
      props.savePortalSettings(settings);
      publishPortalSettings(portalUuid ? portalUuid : "");
      setSettings({ ...settings, canRevert: false });
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
  const setColor = (key: string, value: string) => {
    handleChanges(key, value);
    // setShowMainColor(false);
    // setShowSecondaryColor(false);
    // setShowMenuMainColor(false);
  };
  const handleBackButton = () => {
    history.push(`/site/portals`);
    props.portalSelected(undefined);
  };
  const closeConfirm = (confirm: boolean) => {
    setOpenConfirm(false);
    if (confirm) {
      props.loadPortalSettings();
      deletePortal(portalUuid)
        .then(handleBackButton)
        .catch((error: AxiosError) => {
          props.loadPortalSettingsFailure(error.response?.data.errorMessage);
        });
    }
  };
  const reorder = (
    list: HeaderMenu[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    saveMenu(result);
  };
  const removeMenuItem = (id: string) => {
    if (settings) {
      setSettings({
        ...settings,
        menuItems: [...settings.menuItems.filter((item) => item.id !== id)],
      });
    }
  };
  const editMenuItem = (id: string) => {
    if (settings) {
      let item = settings?.menuItems.find((itemI) => itemI.id === id);
      setMenuItemToEdit(item);
    }
  };
  const selectHomepage = (item: any | undefined) => {
    setIsHomepageEdit(true);
    item ? setMenuItemToEdit(item) : setAddMenuDialog(true);
  };
  const handleAddMenuItem = (menuItem: MenuHeaderItem) => {
    setMenuItemToEdit(undefined);
    setAddMenuDialog(false);
    setEditingMenuItem(false);
    if (isHomepageEdit && menuItem) {
      handleChanges("homepage", menuItem);
    }
    setIsHomepageEdit(false);
    if (menuItem && menuItem.id === undefined && settings && !isHomepageEdit) {
      setSettings({
        ...settings,
        menuItems: [
          ...(settings?.menuItems ? settings.menuItems : []),
          menuItem,
        ],
      });
    }
    if (menuItem && menuItem.id !== undefined && settings && !isHomepageEdit) {
      let index = settings.menuItems.findIndex(
        (item) => item.id === menuItem.id
      );
      let copy = settings.menuItems;
      copy.splice(index, 1, menuItem);
      const editSettings: PortalSettings = {
        ...settings,
        menuItems: copy,
      };
      // props.loadPortalSettings();
      saveDraftPortalSettings(editSettings).then((result: any) => {
        setSettings(result.data);
        props.savePortalSettings(editSettings);
        props.loadPortalSettingsSuccess(result.data);
      });
    }
  };
  interface Props extends SwitchProps {
    classes: Partial<Record<SwitchClassKey, string>>;
  }
  const LanguageSwitch = withStyles((theme: Theme) =>
    createStyles({
      switchBase: {
        color: "#3F51B5",
        "&$checked": {
          color: "#3F51B5",
          "&:hover": {
            backgroundColor: fade(theme.palette.grey[600], 0.08),
          },
          "& + $track": {
            backgroundColor: "#3F51B5",
            opacity: 0.5,
          },
        },
      },
      track: {
        backgroundColor: "#3F51B5",
        opacity: 0.5,
      },
      checked: {},
    })
  )(({ classes, ...props }: Props) => {
    return (
      <Switch
        classes={{
          switchBase: classes.switchBase,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });
  return (
    <ContainerTemplate
      loading={props.loading}
      error={props.error}
      errorMsg={props.errorMsg}
      reload={true}
      onReload={reloadError}
    >
      <Box
        className="settings-body"
        display="flex"
        flexDirection="column"
        flex={1}
      >
        <Snackbar open={open} autoHideDuration={6000} onClose={snackBarClose}>
          <MuiAlert
            elevation={6}
            variant="filled"
            {...props}
            onClose={snackBarClose}
            severity="error"
          >
            {props.errorMsg}
          </MuiAlert>
        </Snackbar>
        <Box
          display="flex"
          className="header-settings"
          flexDirection="row"
          alignItems="center"
        >
          <span>{t("settings.title")}</span>
          <Box
            display="flex"
            flexDirection="row"
            flex={1}
            justifyContent="flex-end"
          >
            {settings?.languages && (
              <>
                <Box display="flex" flex={1}></Box>
                <Box display="flex" flexDirection="row" alignItems="center">
                  EN
                  {allowLanguageSwitch ? (
                    <LanguageSwitch
                      id="language-switch"
                      checked={
                        settings?.languages.includes("nl") ? true : false
                      }
                      onChange={(evt: any) =>
                        handleChanges(
                          "languages",
                          evt.target.checked ? ["nl", "en"] : ["en"]
                        )
                      }
                    />
                  ) : (
                    <Switch
                      id="language-switch"
                      disabled={true}
                      checked={
                        settings?.languages.includes("nl") ? true : false
                      }
                      color="primary"
                    />
                  )}
                  NL
                </Box>
              </>
            )}
            <Box display="flex" flex={1}></Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              {t("buttons.hidden")}
              <Switch
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
                !(settings?.name && settings?.domain && settings?.homepage)
              }
              className="main-green-button"
              variant="contained"
              onClick={() => publishChanges()}
            >
              {t("buttons.publish")}
            </Button>
          </Box>
        </Box>
        <Box
          className="form-label-textfield"
          display="flex"
          flexDirection="column"
        >
          <span>{t("settings.name")} *</span>
          <TextField
            id="settings-name"
            variant="outlined"
            error={!settings?.name}
            value={settings?.name || ""}
            helperText={settings?.name ? "" : t("placeholders.requiredField")}
            onChange={(evt: any) => handleChanges("name", evt.target.value)}
            onBlur={() => saveChanges()}
          />
        </Box>
        <Box
          className="form-label-textfield"
          display="flex"
          flexDirection="column"
        >
          <span>{t("settings.domain")} *</span>
          <TextField
            id="settings-url"
            variant="outlined"
            error={!settings?.domain}
            helperText={settings?.domain ? "" : t("placeholders.requiredField")}
            value={settings?.domain || ""}
            onChange={(evt: any) => handleChanges("domain", evt.target.value)}
            onBlur={() => saveChanges()}
          />
        </Box>
        <Box
          className="form-label-textfield"
          display="flex"
          flexDirection="column"
        >
          <span>{t("settings.clientId")}</span>
          <TextField
            id="settings-clientId"
            variant="outlined"
            value={settings?.clientId || ""}
            onChange={(evt: any) => handleChanges("clientId", evt.target.value)}
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
              id="portal-favicon-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={(evt: any) =>
                setImageBase64("htmlFavicon", evt.target.files[0])
              }
            />
            <label htmlFor="portal-favicon-button-file">
              <Button
                className="main-blue-button"
                variant="contained"
                component="span"
              >
                {t("settings.favicon")}
              </Button>
            </label>
            <Button
              id="favicon-button"
              data-cy="favicon-revert-button"
              className="main-red-button"
              variant="contained"
              onClick={() => handleChanges("htmlFavicon", "")}
            >
              {t("buttons.remove")}
            </Button>
          </Box>
          {settings?.htmlFavicon ? (
            <img
              id="settings-favicon"
              data-cy="favicon"
              className="favicon"
              src={settings.htmlFavicon}
              alt="favicon"
            />
          ) : (
            <Box display="flex" flexDirection="row" alignItems="center">
              <div className="favicon" data-cy="favicon"></div>
              <span className="favicon-image-size">16x16 px</span>
            </Box>
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
              accept=".png, .jpg, .jpeg"
              id="portal-logo-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={(evt: any) =>
                setImageBase64("logo", evt.target.files[0])
              }
            />
            <label htmlFor="portal-logo-button-file">
              <Button
                className="main-blue-button"
                variant="contained"
                component="span"
              >
                {t("settings.logo")}
              </Button>
            </label>
            <Button
              id="logo-button"
              data-cy="logo-revert-button"
              className="main-red-button"
              variant="contained"
              onClick={() => handleChanges("logo", "")}
            >
              {t("buttons.remove")}
            </Button>
          </Box>
          {settings?.logo ? (
            <div
              id="settings-logo"
              data-cy="logo"
              className="logo"
              style={{
                width: "250px",
                height: "100px",
                backgroundImage: `url("${settings?.logo}")`,
              }}
            ></div>
          ) : (
            <div
              className="logo"
              style={{ width: "250px", height: "100px" }}
              data-cy="logo"
            >
              <p className="logo-image-size">250x100 px</p>
            </div>
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
              accept=".png, .jpg, .jpeg"
              id="portal-background-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={(evt: any) =>
                setImageBase64("background", evt.target.files[0])
              }
            />
            <label htmlFor="portal-background-button-file">
              <Button
                className="main-blue-button"
                variant="contained"
                component="span"
              >
                {t("settings.background")}
              </Button>
            </label>
            <Button
              id="background-button"
              className="main-red-button"
              variant="contained"
              onClick={() => handleChanges("background", "")}
            >
              {t("buttons.remove")}
            </Button>
          </Box>
          {settings?.background ? (
            <div
              id="settings-background"
              data-cy="logo"
              className="logo"
              style={{
                width: "700px",
                height: "250px",
                backgroundImage: `url("${settings?.background}")`,
              }}
            ></div>
          ) : (
            <div className="logo" style={{ width: "700px", height: "250px" }}>
              <p className="logo-image-size">1400x500 px</p>
            </div>
          )}
        </Box>
        <span>{t("settings.colorSettings")}</span>
        <Box className="color-section" display="flex" flexDirection="row">
          <Box
            className="form-label-textfield"
            display="flex"
            flexDirection="column"
          >
            <span>{t("settings.primaryColor")}</span>
            <Button
              id="main-color-button"
              onClick={() => {
                setShowMainColor(!showMainColor);
                setShowSecondaryColor(false);
                setShowMenuMainColor(false);
              }}
              variant="contained"
              className="color-button"
            >
              <div
                data-cy="main-color-button"
                style={{
                  backgroundColor: sampleColorPrimary
                    ? sampleColorPrimary
                    : "#003484",
                }}
              />
            </Button>
            {showMainColor && (
              <div id="main-color" data-cy="main-color-palette">
                <ColorPickerComponent
                  paddingLeft={15}
                  width={250}
                  sampleColor={sampleColorPrimary}
                  setSampleColor={setSampleColorPrimary}
                  color={settings?.colorPrimary}
                  setColor={(color: any) => {
                    setColor("colorPrimary", color);
                  }}
                />
              </div>
            )}
          </Box>
          <Box
            className="form-label-textfield"
            display="flex"
            flexDirection="column"
          >
            <span>{t("settings.secondaryColor")}</span>
            <Button
              id="secondary-color-button"
              onClick={() => {
                setShowSecondaryColor(!showSecondaryColor);
                setShowMainColor(false);
                setShowMenuMainColor(false);
              }}
              variant="contained"
              className="color-button"
            >
              <div
                style={{
                  backgroundColor: sampleColorSecondary
                    ? sampleColorSecondary
                    : "#eb6b0a",
                }}
                data-cy="secondary-color-button"
              />
            </Button>
            {showSecondaryColor && (
              <div id="secondary-color" data-cy="secondary-color-palette">
                <ColorPickerComponent
                  paddingLeft={15}
                  width={250}
                  sampleColor={sampleColorSecondary}
                  setSampleColor={setSampleColorSecondary}
                  color={settings?.colorSecondary}
                  setColor={(color: any) => {
                    setColor("colorSecondary", color);
                  }}
                />
              </div>
            )}
          </Box>
          <Box
            className="form-label-textfield"
            display="flex"
            flexDirection="column"
          >
            <span>{t("settings.mainMenuColor")}</span>
            <Button
              id="main-menu-button"
              onClick={() => {
                setShowMenuMainColor(!showMenuMainColor);
                setShowMainColor(false);
                setShowSecondaryColor(false);
              }}
              variant="contained"
              className="color-button"
            >
              <div
                data-cy="main-menu-button"
                style={{
                  backgroundColor: sampleColorMainMenu
                    ? sampleColorMainMenu
                    : "#313131",
                }}
              />
            </Button>
            {showMenuMainColor && (
              <div id="menu-main" data-cy="menu-main-color-palette">
                <ColorPickerComponent
                  paddingLeft={15}
                  width={250}
                  sampleColor={sampleColorMainMenu}
                  setSampleColor={setSampleColorMainMenu}
                  color={settings?.colorMainMenu}
                  setColor={(color: any) => {
                    setColor("colorMainMenu", color);
                  }}
                />
              </div>
            )}
          </Box>
        </Box>
        <span>{t("settings.fontSettings")}</span>
        <Box
          className="form-label-selectfield"
          display="flex"
          flexDirection="column"
        >
          <span>{t("settings.primaryFont")}</span>
          <Select
            id="settings-font-primary"
            className="material-select"
            variant="outlined"
            value={settings?.fontPrimary || "objektiv-mk2"}
            onChange={(evt: any) =>
              handleChanges("fontPrimary", evt.target.value)
            }
            onBlur={() => saveChanges()}
          >
            <MenuItem value={"objektiv-mk2"}>Objectiv-mk2</MenuItem>
            <MenuItem value={"Roboto"}>Roboto</MenuItem>
            <MenuItem value={"Helvetica"}>Helvetica</MenuItem>
          </Select>
        </Box>
        <Box
          className="form-label-selectfield"
          display="flex"
          flexDirection="column"
        >
          <span>{t("settings.secondaryFont")}</span>
          <Select
            id="settings-font-secondary"
            className="material-select"
            variant="outlined"
            value={settings?.fontSecondary || "objektiv-mk2"}
            onChange={(evt: any) =>
              handleChanges("fontSecondary", evt.target.value)
            }
            onBlur={() => saveChanges()}
          >
            <MenuItem value={"objektiv-mk2"}>Objectiv-mk2</MenuItem>
            <MenuItem value={"Roboto"}>Roboto</MenuItem>
            <MenuItem value={"Helvetica"}>Helvetica</MenuItem>
          </Select>
        </Box>
        <span>{t("settings.portalMenu")}</span>
        <Box className="menu-selector">
          <MenuSelector
            homepage={settings?.homepage}
            catalogAsHomePage={settings?.catalogAsHomePage}
            handleChanges={handleChanges}
            items={settings?.menuItems}
            onReorderItems={reorder}
            onDeleteItem={removeMenuItem}
            onAddItem={() => setAddMenuDialog(true)}
            onEditItem={editMenuItem}
            onSelectHomepage={selectHomepage}
          />
          {addMenuDialog && (
            <MenuAdditionDialog
              open={addMenuDialog}
              isHomepage={isHomepageEdit}
              portalUuid={portalUuid}
              onCloseDialog={handleAddMenuItem}
              item={editingMenuItem ? menuItemToEdit : undefined}
            />
          )}
        </Box>
        <span>{t("settings.menuItemsOnBookPages")}</span>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          className="fontSize related-publications"
        >
          {t("settings.relatedPublications")}
          <div>
            {t("settings.hidden")}
            <Switch
              data-cy="visibility-button"
              checked={settings?.showRelatedPublications}
              onChange={(evt: any) =>
                handleChanges("showRelatedPublications", evt.target.checked)
              }
              color="primary"
            />
            {t("settings.visible")}
          </div>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          className="fontSize videos"
        >
          {t("settings.videos")}
          <div>
            {t("settings.hidden")}
            <Switch
              data-cy="visibility-button"
              checked={settings?.showVideos}
              onChange={(evt: any) =>
                handleChanges("showVideos", evt.target.checked)
              }
              color="primary"
            />
            {t("settings.visible")}
          </div>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          className="fontSize available-editions"
        >
          {t("settings.availableEditions")}
          <div>
            {t("settings.hidden")}
            <Switch
              data-cy="visibility-button"
              checked={settings?.showAvailableEditions}
              onChange={(evt: any) =>
                handleChanges("showAvailableEditions", evt.target.checked)
              }
              color="primary"
            />
            {t("settings.visible")}
          </div>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          className="fontSize eLearning"
        >
          {t("settings.eLearning")}
          <div>
            {t("settings.hidden")}
            <Switch
              data-cy="visibility-button"
              checked={settings?.showELearning}
              onChange={(evt: any) =>
                handleChanges("showELearning", evt.target.checked)
              }
              color="primary"
            />
            {t("settings.visible")}
          </div>
        </Box>
        <span>{t("settings.interfaceElements")}</span>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          className="fontSize group-access"
        >
          {t("settings.groupAccess")}
          <div>
            {t("settings.hidden")}
            <Switch
              data-cy="visibility-button"
              checked={settings?.showGroupAccess}
              onChange={(evt: any) =>
                handleChanges("showGroupAccess", evt.target.checked)
              }
              color="primary"
            />
            {t("settings.visible")}
          </div>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          className="fontSize fullTextSearch"
        >
          {t("settings.fullTextSearch")}
          <div>
            {t("settings.hidden")}
            <Switch
              data-cy="visibility-button"
              checked={settings?.showFullTextSearch}
              onChange={(evt: any) =>
                handleChanges("showFullTextSearch", evt.target.checked)
              }
              color="primary"
            />
            {t("settings.visible")}
          </div>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          className="fontSize language-selector"
        >
          {t("settings.languageSelector")}
          <div>
            {t("settings.hidden")}
            <Switch
              data-cy="visibility-button"
              checked={settings?.showLanguageSelector}
              onChange={(evt: any) =>
                handleChanges("showLanguageSelector", evt.target.checked)
              }
              color="primary"
            />
            {t("settings.visible")}
          </div>
        </Box>
        <span>{t("settings.removePortal")}</span>
        <Box>
          <Tooltip
            title={
              settings?.visibility ? "Portal must be hidden" : "Delete Portal"
            }
            placement="top"
          >
            <span>
              <Button
                variant="contained"
                className="main-red-button"
                disabled={settings?.visibility}
                onClick={() => setOpenConfirm(true)}
              >
                {t("buttons.deletePermanent")}
              </Button>
            </span>
          </Tooltip>
        </Box>
        <ConfirmDialog
          open={openConfirm}
          bodyMessage={t("settings.deleteMessage")}
          onClose={closeConfirm}
        />
      </Box>
    </ContainerTemplate>
  );
}
const mapStateToProps = (state: AppState) => ({
  loading: selectPortalSettingsLoading(state),
  error: selectPortalSettingsError(state),
  errorMsg: selectPortalSettingsErrorMsg(state),
  portalSettings: selectPortalSettings(state),
});
export default connect(mapStateToProps, {
  resetThemeSettings,
  themeIsSelected,
  loadPortalSettings,
  loadPortalSettingsSuccess,
  loadPortalSettingsFailure,
  savePortalSettings,
  portalSelected,
})(Settings);
