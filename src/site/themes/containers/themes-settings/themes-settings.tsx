import React, { useState } from 'react';
import './theme-settings.scss';
import { connect } from 'react-redux';
import { AppState } from '../../../../core/store/store';
import {
  Box,
  Button,
  TextField,
  createStyles,
  makeStyles,
  IconButton,
  Switch,
  Grid,
  MenuItem,
  Select,
  Tooltip,
} from '@material-ui/core';
import { ThemeSettings } from '../../models/themes.model';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TwitterPicker } from 'react-color';
import {
  loadThemeSettings,
  loadThemeSettingsSuccess,
  loadThemeSettingsFailure,
  saveThemeSettings,
} from '../../store/actions/theme-settings.actions';
import {
  fetchThemeById,
  revertThemeSettings,
  saveDrafThemeSettings,
  publishThemeSettings,
} from '../../services/theme-settings.service';
import {
  selectThemeSettingsError,
  selectThemeSettingsLoading,
  selectThemeSettings,
} from '../../store/selectors/theme-settings.selectors';
import AddItemMenuDialog from '../../components/itemMenu-dialog/itemMenu-dialog';
import ContainerTemplate from '../../../../shared/components/container-template/container-template';
import MenuSelector from '../../../../shared/components/menu-selector/menu-selector';
import {
  HeaderMenu,
  MenuHeaderItem,
} from '../../../../shared/models/menuItem.model';
import { colors, useNotOnMountEffect } from '../../../../shared/services/utils';
import { themeIsSelected } from '../../store/actions/theme.actions';
import ConfirmDialog from '../../../../shared/components/confirm-dialog/confirm-dialog';
import { deleteTheme } from '../../services/theme.service';
import { AxiosError } from 'axios';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup';
import { ColorPickerComponent } from '../../../../shared/components/color-picker-component/color-picker-component';
interface ThemesSettingsProps {
  loadThemeSettings: typeof loadThemeSettings;
  loadThemeSettingsSuccess: typeof loadThemeSettingsSuccess;
  loadThemeSettingsFailure: typeof loadThemeSettingsFailure;
  saveThemeSettings: typeof saveThemeSettings;
  themeIsSelected: typeof themeIsSelected;
  loading: boolean;
  error: boolean;
  themeSettings: ThemeSettings | undefined;
}

export function ThemesSettingsComponent(
  props: ThemesSettingsProps
): JSX.Element {
  const { t } = useTranslation();
  let history = useHistory();
  let { themeId, portalUuid } = useParams<{
    themeId: string;
    portalUuid: string;
  }>();

  const [addMenuDialog, setAddMenuDialog] = useState<boolean>(false);
  const [settings, setSettings] = useState<ThemeSettings | undefined>(
    props.themeSettings
  );
  const [sampleColorPrimary, setSampleColorPrimary] = useState<string>(settings?.colorPrimary || '#003484');
  const [sampleColorSecondary, setSampleColorSecondary] = useState<string>(settings?.colorSecondary || '#eb6b0a');
  const [sampleColorMainMenu, setSampleColorMainMenu] = useState<string>(settings?.colorMainMenu || '#313131');
  const [sampleHeaderColour, setSampleHeaderColour] = useState<string>(settings?.headerColour || 'transparent');
  const [showMainColor, setShowMainColor] = useState<boolean>(false);
  const [showHeaderColor, setShowHeaderColor] = useState<boolean>(false);
  const [showSecondaryColor, setShowSecondaryColor] = useState<boolean>(false);
  const [showMenuMainColor, setShowMenuMainColor] = useState<boolean>(false);
  const [editingMenuItem, setEditingMenuItem] = useState<boolean>(false);
  const [menuItemToEdit, setMenuItemToEdit] = useState<MenuHeaderItem>();
  const [isHomepageEdit, setIsHomepageEdit] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        '& > *': {
          width: 550,
        },
      },
      colorPickerButton: {
        height: 25,
        width: 200,
        background:
          sampleHeaderColour === 'transparent' ||
          sampleHeaderColour === null
            ? 'url(/assets/transparent-background.png)'
            : sampleHeaderColour,
        backgroundSize: 'cover',
        borderRadius: 4,
      },
    })
  );
  const classes = useStyles();

  React.useEffect(() => {
    props.loadThemeSettings();
    fetchThemeById(themeId ? themeId : '')
      .then((res: any) => {
        setSettings(res.data);
        props.loadThemeSettingsSuccess(res.data);
      })
      .catch((error: AxiosError) =>
        props.loadThemeSettingsFailure(error.response?.data.errorMessage)
      );
    // eslint-disable-next-line
  }, [themeId]);

  useNotOnMountEffect(() => {
    setSampleColorPrimary(settings?.colorPrimary || '#003484');
    setSampleColorSecondary(settings?.colorSecondary || '#eb6b0a');
    setSampleColorMainMenu(settings?.colorMainMenu || '#313131');
    setSampleHeaderColour(settings?.headerColour || 'transparent');
    saveChanges();
  }, [
    settings?.homepage?.label.nl,
    settings?.homepage?.pageId,
    settings?.previewImage,
    settings?.visibility,
    settings?.titleSize,
    settings?.headerColour,
    settings?.colorMainMenu,
    settings?.colorPrimary,
    settings?.colorSecondary,
    settings?.fontPrimary,
    settings?.fontSecondary,
    settings?.headerImage,
    settings?.logoImage,
    settings?.menuItems?.length,
  ]);

  useNotOnMountEffect(() => {
    if (menuItemToEdit?.label) {
      setAddMenuDialog(true);
      setEditingMenuItem(true);
    }
  }, [menuItemToEdit?.label]);

  const saveChanges = () => {
    if (settings) {
      saveDrafThemeSettings(settings)
        .then((result: any) => {
          setSettings(result.data);
          props.saveThemeSettings(settings);
          props.loadThemeSettingsSuccess(result.data);
        })
        .catch((error: AxiosError) =>
          props.loadThemeSettingsFailure(error.response?.data.errorMessage)
        );
    }
  };

  const saveMenu = (menu: HeaderMenu[]) => {
    if (settings) {
      const saveMenuSettings: ThemeSettings = {
        ...settings,
        menuItems: menu,
      };
      setSettings({
        ...settings,
        menuItems: [...saveMenuSettings.menuItems],
      });
      // props.loadThemeSettings();
      saveDrafThemeSettings(saveMenuSettings).then((result: any) => {
        setSettings(result.data);
        props.saveThemeSettings(settings);
        props.loadThemeSettingsSuccess(result.data);
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
        menuItems: settings.menuItems?.filter((item) => item.id !== id),
      });
    }
  };
  const editMenuItem = (id: string) => {
    if (settings) {
      let item = settings?.menuItems?.find((itemI) => itemI.id === id);
      setMenuItemToEdit(item);
    }
  };

  const selectHomepage = (item: any | undefined) => {
    setIsHomepageEdit(true);
    item ? setMenuItemToEdit(item) : setAddMenuDialog(true);
  };

  const handleAddMenuItem = (menuItem: any) => {
    setMenuItemToEdit(undefined);
    setAddMenuDialog(false);
    setEditingMenuItem(false);

    if (isHomepageEdit && menuItem) {
      handleChanges('homepage', menuItem);
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
      const editSettings: ThemeSettings = {
        ...settings,
        menuItems: copy,
      };

      saveDrafThemeSettings(editSettings).then((result: any) => {
        setSettings(result.data);
        props.saveThemeSettings(editSettings);
        props.loadThemeSettingsSuccess(result.data);
      });
    }
  };

  const handleChanges = (key: string, value: any) => {
    if (settings) {
      setSettings({ ...settings, [key]: value });
    }
  };

  const setImageBase64 = (key: string, file: File) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (typeof reader.result === 'string') {
        handleChanges(key, reader.result);
      }
    };
  };

  const revertChanges = () => {
    if (settings) {
      props.saveThemeSettings(settings);
      revertThemeSettings(themeId ? themeId : '').then((result: any) => {
        props.loadThemeSettingsSuccess(result.data);
        setSettings({ ...result.data, canRevert: false });
      });
    }
  };

  const publishChanges = () => {
    if (settings) {
      props.saveThemeSettings(settings);
      publishThemeSettings(themeId ? themeId : '');
      setSettings({ ...settings, canRevert: false });
    }
  };

  const setColor = (key: string, value: string) => {
    handleChanges(key, value);
    // setShowMainColor(false);
    // setShowSecondaryColor(false);
    // setShowMenuMainColor(false);
    // setShowHeaderColor(false);
  };

  const handleBackButton = () => {
    history.push(`/site/${portalUuid}/themes`);
    props.themeIsSelected(false);
  };

  const closeConfirm = (confirm: boolean) => {
    setOpenConfirm(false);
    if (confirm) {
      props.loadThemeSettings();
      deleteTheme(themeId)
        .then(handleBackButton)
        .catch((error: AxiosError) => {
          setErrorMsg(error.response?.data.errorMessage);
          props.loadThemeSettingsFailure(error.response?.data.errorMessage);
        });
    }
  };

  const reloadError = () => {
    props.loadThemeSettings();
    fetchThemeById(themeId ? themeId : '')
      .then((res: any) => {
        setSettings(res.data);
        props.loadThemeSettingsSuccess(res.data);
      })
      .catch((error: AxiosError) => {
        props.loadThemeSettingsFailure(error.response?.data.errorMessage);
      });
  };

  return (
    <ContainerTemplate
      id="container-template"
      loading={props.loading}
      error={props.error}
      errorMsg={errorMsg}
      reload={true}
      onReload={reloadError}
    >
      <Box className="theme-settings" flexDirection="column" flex={1}>
        <Box
          display="flex"
          className="settings-header"
          flexDirection="row"
          alignItems="center"
          flex={1}
        >
          <IconButton id="back-button" onClick={handleBackButton}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </IconButton>

          <Box className="header-title">{settings?.name}</Box>

          <Box
            display="flex"
            flexDirection="row"
            flex={1}
            justifyContent="flex-end"
          >
            <Box display="flex" flexDirection="row" alignItems="center">
              {t('themes.creationDialog.hidden')}
              <Switch
                id="visibility-switch"
                data-cy="visibility-switch"
                checked={settings?.visibility}
                onChange={(evt: any) =>
                  handleChanges('visibility', !settings?.visibility)
                }
                color="primary"
              />
              {t('themes.creationDialog.visible')}
            </Box>
          </Box>

          {settings?.canRevert && (
            <Button
              id="revert-button"
              data-cy="revert-button"
              className="main-red-button"
              variant="contained"
              onClick={() => revertChanges()}
            >
              {t('buttons.revert')}
            </Button>
          )}

          <Button
            id="preview-button"
            className="main-blue-button"
            variant="contained"
          >
            {t('buttons.preview')}
          </Button>

          <Button
            id="publish-changes-button"
            data-cy="publish-button"
            disabled={
              !(settings?.name && settings?.permalink && settings?.homepage)
            }
            className="main-green-button"
            variant="contained"
            onClick={() => publishChanges()}
          >
            {t('buttons.publish')}
          </Button>
        </Box>

        <Box display="flex" flexDirection="row" alignItems="flex-end" flex={1}>
          <Box flexDirection="column" flex={1}>
            <div className="input-title">{t('themeSettings.themeName')} </div>
            <TextField
              className="input-name"
              id="name"
              data-cy="theme-name"
              variant="outlined"
              value={settings?.name}
              error={!settings?.name}
              helperText={settings?.name ? '' : t('placeholders.requiredField')}
              onChange={(evt: any) => handleChanges('name', evt.target.value)}
              onBlur={() => saveChanges()}
            />
          </Box>
          <Box flexDirection="column" className="size-buttons">
            <div className="input-title">{t('themeSettings.size')} </div>
            <ToggleButtonGroup
              value={settings?.titleSize}
              exclusive
              onChange={(evt: any, value: any) =>
                handleChanges('titleSize', value)
              }
            >
              <ToggleButton value="32px" aria-label="left aligned">
                S
              </ToggleButton>
              <ToggleButton value="48px" aria-label="centered">
                M
              </ToggleButton>
              <ToggleButton value="64px" aria-label="right aligned">
                L
              </ToggleButton>
              <ToggleButton
                value="0px"
                aria-label="right aligned"
                className="hide-toggle"
              >
                Hide
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <div className="input-title">{t('themeSettings.themeLink')} </div>
          <TextField
            className="input-name"
            id="link"
            data-cy="theme-link"
            variant="outlined"
            error={!settings?.permalink}
            helperText={
              settings?.permalink ? '' : t('placeholders.requiredField')
            }
            value={settings?.permalink}
            onChange={(evt: any) =>
              handleChanges('permalink', evt.target.value)
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
              id="contained-button-file"
              data-cy="header-img"
              type="file"
              style={{ display: 'none' }}
              onChange={(evt: any) =>
                setImageBase64('headerImage', evt.target.files[0])
              }
            />
            <label htmlFor="contained-button-file">
              <Button
                className="main-blue-button"
                variant="contained"
                component="span"
              >
                {t('themeSettings.addHeaderImage')}
              </Button>
            </label>
            <Button
              id="favicon-button"
              className="main-red-button"
              variant="contained"
              onClick={() => handleChanges('headerImage', '')}
            >
              {t('buttons.remove')}
            </Button>
          </Box>
          {settings?.headerImage ? (
            <div
              id="settings-header-image"
              data-cy="logo"
              className="size-helper"
              style={{
                width: '900px',
                height: '90px',
                backgroundImage: `url("${settings?.headerImage}")`,
              }}
            ></div>
          ) : (
            <div
              className="size-helper"
              style={{ width: '900px', height: '90px' }}
              data-cy="logo"
            >
              <p className="preview-image-size">1200x120 px</p>
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
              id="logo-button-file"
              data-cy="ogo-img"
              type="file"
              style={{ display: 'none' }}
              onChange={(evt: any) =>
                setImageBase64('logoImage', evt.target.files[0])
              }
            />
            <label htmlFor="logo-button-file">
              <Button
                className="main-blue-button"
                variant="contained"
                component="span"
              >
                {t('themeSettings.addLogoImage')}
              </Button>
            </label>
            <Button
              id="favicon-button"
              className="main-red-button"
              variant="contained"
              onClick={() => handleChanges('logoImage', '')}
            >
              {t('buttons.remove')}
            </Button>
          </Box>
          {settings?.logoImage ? (
            <div
              id="settings-logo-image"
              data-cy="logo"
              className="size-helper"
              style={{
                width: '500px',
                height: '60px',
                backgroundImage: `url("${settings?.logoImage}")`,
              }}
            ></div>
          ) : (
            <div
              className="size-helper"
              style={{ width: '500px', height: '60px' }}
              data-cy="logo"
            >
              <p className="preview-image-size">
                ↑{'\n'}60 px{'\n'}↓
              </p>
            </div>
          )}
        </Box>

        <Box display="flex" flexDirection="column">
          <div className="input-title">{t('themeSettings.description')} </div>
          <TextField
            className="discription-field"
            id="description-input"
            variant="outlined"
            multiline
            value={settings?.description}
            error={!settings?.description}
            helperText={
              settings?.description ? '' : t('placeholders.requiredField')
            }
            onChange={(evt: any) =>
              handleChanges('description', evt.target.value)
            }
            onBlur={() => saveChanges()}
          />
        </Box>

        <div className="input-title">{t('themeSettings.colorSettings')} </div>
        <Box className="color-section" display="flex" flexDirection="row">
          <Box
            className="form-label-textfield"
            display="flex"
            flexDirection="column"
          >
            <span>{t('settings.primaryColor')}</span>
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
                    : '#003484',
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
                  color={
                    settings?.colorPrimary
                  }
                  setColor={(color: any) => {
                    setColor('colorPrimary', color);
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
            <span>{t('settings.secondaryColor')}</span>
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
                    : '#eb6b0a',
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
                  color={
                    settings?.colorSecondary
                  }
                  setColor={(color: any) => {
                    setColor('colorSecondary', color);
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
            <span>{t('settings.mainMenuColor')}</span>
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
                    : '#313131',
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
                  color={
                    settings?.colorMainMenu
                  }
                  setColor={(color: any) => {
                    setColor('colorMainMenu', color);
                  }}
                />
              </div>
            )}
          </Box>
        </Box>

        <div className="input-title">{t('settings.fontSettings')} </div>
        <Box
          className="form-label-selectfield"
          display="flex"
          flexDirection="column"
        >
          <span>{t('settings.primaryFont')}</span>
          <Select
            id="settings-font-primary"
            className="material-select"
            variant="outlined"
            value={settings?.fontPrimary || 'objektiv-mk2'}
            onChange={(evt: any) =>
              handleChanges('fontPrimary', evt.target.value)
            }
            onBlur={() => saveChanges()}
          >
            <MenuItem value={'objektiv-mk2'}>Objectiv-mk2</MenuItem>
            <MenuItem value={'Roboto'}>Roboto</MenuItem>
            <MenuItem value={'Helvetica'}>Helvetica</MenuItem>
          </Select>
        </Box>
        <Box
          className="form-label-selectfield"
          display="flex"
          flexDirection="column"
        >
          <span>{t('settings.secondaryFont')}</span>
          <Select
            id="settings-font-secondary"
            className="material-select"
            variant="outlined"
            value={settings?.fontSecondary || 'objektiv-mk2'}
            onChange={(evt: any) =>
              handleChanges('fontSecondary', evt.target.value)
            }
            onBlur={() => saveChanges()}
          >
            <MenuItem value={'objektiv-mk2'}>Objectiv-mk2</MenuItem>
            <MenuItem value={'Roboto'}>Roboto</MenuItem>
            <MenuItem value={'Helvetica'}>Helvetica</MenuItem>
          </Select>
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
              id="preview"
              data-cy="preview-image"
              type="file"
              style={{ display: 'none' }}
              onChange={(evt: any) =>
                setImageBase64('previewImage', evt.target.files[0])
              }
            />
            <label htmlFor="preview">
              <Button
                className="main-blue-button"
                variant="contained"
                component="span"
              >
                {t('themeSettings.addPreviewImage')}
              </Button>
            </label>
            <Button
              id="favicon-button"
              className="main-red-button"
              variant="contained"
              onClick={() => handleChanges('previewImage', '')}
            >
              {t('buttons.remove')}
            </Button>
          </Box>
          {settings?.previewImage ? (
            <Grid container direction="row" alignItems="center">
              <div className="preview-container">
                <p className="preview-image-title">(theme index page)</p>
                <div
                  id="settings-preview-image"
                  data-cy="logo"
                  className="size-helper"
                  style={{
                    width: '308px',
                    height: '216px',
                    backgroundImage: `url("${settings?.previewImage}")`,
                  }}
                ></div>
              </div>
              <div className="preview-container">
                <p className="preview-image-title">(theme carousel)</p>
                <div
                  id="settings-preview-carousel-image"
                  data-cy="logo"
                  className="size-helper"
                  style={{
                    width: '244px',
                    height: '90px',
                    backgroundImage: `url("${settings?.previewImage}")`,
                  }}
                ></div>
              </div>
            </Grid>
          ) : (
            <Grid container direction="row" alignItems="center">
              <div className="preview-container">
                <p className="preview-image-title">(theme index page)</p>
                <div
                  data-cy="logo"
                  className="size-helper"
                  style={{
                    width: '308px',
                    height: '216px',
                  }}
                >
                  <p className="preview-image-size">308x216 px</p>
                </div>
              </div>
              <div className="preview-container">
                <p className="preview-image-title">(theme carousel)</p>
                <div
                  data-cy="logo"
                  className="size-helper"
                  style={{
                    width: '244px',
                    height: '90px',
                  }}
                >
                  <p className="preview-image-size">244x90 px</p>
                </div>
              </div>
            </Grid>
          )}
        </Box>
        <Box>
          <div className="input-title">
            {t('themeSettings.headerBackground')}
          </div>
        </Box>
        <Box>
          <Box flexDirection="row" display="flex" alignItems="flex-end">
            <Box
              flexDirection="column"
              display="flex"
              className="form-label-textfield"
            >
              <Button
                id="background-color"
                onClick={() => setShowHeaderColor(!showHeaderColor)}
                variant="contained"
                className="color-button"
              >
                <div
                  className={classes.colorPickerButton}
                  data-cy="background-color-button"
                ></div>
              </Button>
            </Box>
            <Box
              className="layout-remove-background-color"
              display="flex"
              flexDirection="row"
            >
              <Button
                onClick={() => {
                  setSampleHeaderColour('transparent');
                  setColor('headerColour', 'transparent')}}
                disabled={
                  settings?.headerColour === 'transparent' ||
                  settings?.headerColour === null
                    ? true
                    : false
                }
              >
                {t('buttons.remove')}
              </Button>
            </Box>
          </Box>
          {showHeaderColor && (
            <ColorPickerComponent
            paddingLeft={15}
            width={250}
            sampleColor={sampleHeaderColour}
            setSampleColor={setSampleHeaderColour}
            color={
              settings?.headerColour
            }
            setColor={(color: any) => {
              setColor('headerColour', color);
            }}
          />
          )}
        </Box>
        <Box>
          <div className="input-title">{t('themeSettings.themeMenu')}</div>
        </Box>
        <Box className="menu-selector">
          <MenuSelector
            homepage={settings?.homepage}
            items={settings?.menuItems}
            onReorderItems={reorder}
            onDeleteItem={removeMenuItem}
            onAddItem={() => setAddMenuDialog(true)}
            onEditItem={editMenuItem}
            onSelectHomepage={selectHomepage}
          />
          {addMenuDialog && (
            <AddItemMenuDialog
              open={addMenuDialog}
              isHomepage={isHomepageEdit}
              themeId={themeId}
              onCloseDialog={handleAddMenuItem}
              item={editingMenuItem ? menuItemToEdit : undefined}
            />
          )}
        </Box>
        <Box flexGrow={1}>
          <div className="input-title">{t('themeSettings.deteleTheme')}</div>
        </Box>
        <Box>
          <Tooltip
            title={
              settings?.visibility ? 'Theme must be hidden' : 'Delete Theme'
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
                {t('buttons.deletePermanent')}
              </Button>
            </span>
          </Tooltip>
        </Box>
        <ConfirmDialog
          open={openConfirm}
          bodyMessage={t('themeSettings.deleteMessage')}
          onClose={closeConfirm}
        />
      </Box>
    </ContainerTemplate>
  );
}

const mapStateToProps = (state: AppState) => ({
  themeSettings: selectThemeSettings(state),
  error: selectThemeSettingsError(state),
  loading: selectThemeSettingsLoading(state),
});

export default connect(mapStateToProps, {
  loadThemeSettings,
  loadThemeSettingsSuccess,
  loadThemeSettingsFailure,
  saveThemeSettings,
  themeIsSelected,
})(ThemesSettingsComponent);
