import React, { useState } from 'react';
import './calendar-new-settings.scss';
import { connect } from 'react-redux';
import { AppState } from '../../../core/store/store';
import ContainerTemplate from '../../../shared/components/container-template/container-template';
import {
  Box,
  IconButton,
  Button,
  TextField,
  makeStyles,
  createStyles,
  Switch,
  MenuItem,
  Select,
  Tooltip,
  NativeSelect,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  loadCalendarNewSettings,
  loadCalendarNewSettingsSuccess,
  loadCalendarNewSettingsFailure,
  saveCalendarNewSettings,
} from '../store/actions/calendar-new-settings.actions';
import { CalendarNewSettings } from '../models/calendar-new-settings.model';
import {
  faAngleLeft,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { TwitterPicker } from 'react-color';
import {
  selectCalendarNewSettingsLoading,
  selectCalendarNewSettingsError,
  selectCalendarNewSettings,
  selectCalendarNewSettingsErrorMsg,
} from '../store/selectors/calendar-new-settings.selectors';
import {
  getCalendarNewSettings,
  saveDraftCalendarNewSettings,
  revertCalendarNewSettings,
  publishCalendarNewSettings,
  deleteCalendarNew,
  retrieveDatabaseList,
} from '../services/calendar-new-settings.service';
import { colors, useNotOnMountEffect } from '../../../shared/services/utils';
import AddItemMenuDialog from '../components/itemMenu-dialog/itemMenu-dialog';
import MenuSelector from '../../../shared/components/menu-selector/menu-selector';
import { HeaderMenu } from '../../../shared/models/menuItem.model';
import { AxiosError } from 'axios';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup';
import ConfirmDialog from '../../../shared/components/confirm-dialog/confirm-dialog';
import { calendarNewSelected } from '../../site/store/actions/site.actions';
import { ColorPickerComponent } from '../../../shared/components/color-picker-component/color-picker-component';

interface CalendarNewSettingsProps {
  loadCalendarNewSettings: typeof loadCalendarNewSettings;
  loadCalendarNewSettingsSuccess: typeof loadCalendarNewSettingsSuccess;
  loadCalendarNewSettingsFailure: typeof loadCalendarNewSettingsFailure;
  saveCalendarNewSettings: typeof saveCalendarNewSettings;
  calendarNewSelected: typeof calendarNewSelected;
  loading: boolean;
  error: boolean;
  errorMsg: string;
  calendarNewSettings: CalendarNewSettings | undefined;
}

export function CalendarNewSettingsComponent(
  props: CalendarNewSettingsProps
): JSX.Element {
  const { t } = useTranslation();
  let { calendarNewId } = useParams<{ calendarNewId: string }>();
  let history = useHistory();
  const [addMenuDialog, setAddMenuDialog] = useState<boolean>(false);
  const {
    loadCalendarNewSettings: loadCalendarNewSettingsProps,
    loadCalendarNewSettingsSuccess: loadCalendarNewSettingsSuccessProps,
    loadCalendarNewSettingsFailure: loadCalendarNewSettingsFailureProps,
  } = props;
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [settings, setSettings] = useState<CalendarNewSettings | undefined>(
    props.calendarNewSettings
  );
  const [sampleColorPrimary, setSampleColorPrimary] = useState<string>(settings?.colorPrimary || '#003484');
  const [sampleColorSecondary, setSampleColorSecondary] = useState<string>(settings?.colorSecondary || '#eb6b0a');
  const [sampleColorMainMenu, setSampleColorMainMenu] = useState<string>(settings?.colorMainMenu || '#313131');
  const [sampleColour, setSampleColour] = useState<string>(settings?.colour || 'transparent');
  const [menuItemToEdit, setMenuItemToEdit] = useState<HeaderMenu>();
  const [editingMEnuItem, setEditingMEnuItem] = useState<boolean>(false);
  const [ean, setEan] = useState<string>('');
  const [isHomepageEdit, setIsHomepageEdit] = useState<boolean>(false);
  const [showMainColor, setShowMainColor] = useState<boolean>(false);
  const [showSecondaryColor, setShowSecondaryColor] = useState<boolean>(false);
  const [showMenuMainColor, setShowMenuMainColor] = useState<boolean>(false);
  const [databaseList, setDatabaseList] = useState<any[]>([]);
  const [databaseSelected, setDatabaseSelected] = useState<{
    url: string;
    id: string;
  }>();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  React.useEffect(() => {
    loadCalendarNewSettingsProps();
    getCalendarNewSettings(calendarNewId ? calendarNewId : '')
      .then((result: any) => {
        setSettings(result.data);
        loadCalendarNewSettingsSuccessProps(result.data);
      })
      .catch((error: AxiosError) =>
        loadCalendarNewSettingsFailureProps(error.response?.data.errorMessage)
      );
  }, [
    calendarNewId,
    loadCalendarNewSettingsProps,
    loadCalendarNewSettingsSuccessProps,
    loadCalendarNewSettingsFailureProps,
  ]);

  React.useEffect(() => {
    retrieveDatabaseList(props.calendarNewSettings?.boomCalendarNewsId).then(
      (res: any) => {
        setDatabaseList(res.data);
      }
    );
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (settings?.boomCalendarNewsId && databaseList.length > 0) {
      let selectedDatabase = databaseList.find(
        (database: any) => database.id === settings.boomCalendarNewsId
      );
      setDatabaseSelected(selectedDatabase);
    }
    // eslint-disable-next-line
  }, [databaseList.length, settings]);

  useNotOnMountEffect(() => {
    setSampleColorPrimary(settings?.colorPrimary || '#003484');
    setSampleColorSecondary(settings?.colorSecondary || '#eb6b0a');
    setSampleColorMainMenu(settings?.colorMainMenu || '#313131');
    setSampleColour(settings?.colour || 'transparent');
    saveChanges();
  }, [
    settings?.colour,
    settings?.visibility,
    settings?.menuItems.length,
    settings?.eans?.length,
    settings?.cover,
    settings?.homepage?.label.nl,
    settings?.homepage?.pageId,
    settings?.titleSize,
    settings?.colorMainMenu,
    settings?.colorPrimary,
    settings?.colorSecondary,
    settings?.fontPrimary,
    settings?.fontSecondary,
    settings?.boomCalendarNewsId,
  ]);

  useNotOnMountEffect(() => {
    if (menuItemToEdit?.label) {
      setAddMenuDialog(true);
      setEditingMEnuItem(true);
    }
  }, [menuItemToEdit]);

  const handleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleChanges = (key: string, value: any) => {
    if (settings) {
      setSettings({ ...settings, [key]: value });
    }
  };

  const setColor = (key: string, value: string) => {
    handleChanges(key, value);
    // setShowColorPicker(false);
    // setShowMainColor(false);
    // setShowMenuMainColor(false);
    // setShowSecondaryColor(false);
  };

  const closeConfirm = (confirm: boolean) => {
    setOpenConfirm(false);
    if (confirm) {
      props.loadCalendarNewSettings();
      deleteCalendarNew(calendarNewId)
        .then(handleBackButton)
        .catch((error: AxiosError) => {
          props.loadCalendarNewSettingsFailure(
            error.response?.data.errorMessage
          );
        });
    }
  };

  const useStyles = makeStyles(() =>
    createStyles({
      headerColorButton: {
        height: 25,
        width: 200,
        background:
          sampleColour === 'transparent' || sampleColour === null
            ? 'url(/assets/transparent-background.png)'
            : sampleColour,
        backgroundSize: 'cover',
        borderRadius: 4,
      },
    })
  );

  const classes = useStyles();

  const handleAddMenuItem = (menuItem: any) => {
    setMenuItemToEdit(undefined);
    setAddMenuDialog(false);
    setEditingMEnuItem(false);

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
      const editSettings: CalendarNewSettings = {
        ...settings,
        menuItems: copy,
      };
      // loadCalendarNewSettingsProps();
      saveDraftCalendarNewSettings(editSettings).then((result: any) => {
        setSettings(result.data);
        props.saveCalendarNewSettings(editSettings);
        loadCalendarNewSettingsSuccessProps(result.data);
      });
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

  const saveChanges = () => {
    if (settings) {
      // loadCalendarNewSettingsProps();
      saveDraftCalendarNewSettings(settings)
        .then((result: any) => {
          props.saveCalendarNewSettings(settings);
          setSettings(result.data);
          loadCalendarNewSettingsSuccessProps(result.data);
        })
        .catch((error: AxiosError) => {
          loadCalendarNewSettingsFailureProps(
            error.response?.data.errorMessage
          );
        });
    }
  };

  const saveMenu = (menu: HeaderMenu[]) => {
    if (settings) {
      const saveMenuSettings: CalendarNewSettings = {
        ...settings,
        menuItems: menu,
      };
      setSettings({
        ...settings,
        menuItems: [...saveMenuSettings.menuItems],
      });
      // loadCalendarNewSettingsProps();
      saveDraftCalendarNewSettings(saveMenuSettings).then((result: any) => {
        setSettings(result.data);
        props.saveCalendarNewSettings(settings);
        loadCalendarNewSettingsSuccessProps(result.data);
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
    setMenuItemToEdit(undefined);
    if (settings) {
      let item = settings?.menuItems.find((itemItem) => itemItem.id === id);
      setMenuItemToEdit(item);
    }
  };

  const revertChanges = () => {
    if (settings) {
      props.saveCalendarNewSettings(settings);
      revertCalendarNewSettings(calendarNewId ? calendarNewId : '').then(
        (result: any) => {
          setSettings(result.data);
          loadCalendarNewSettingsSuccessProps(result.data);
        }
      );
    }
  };

  const publishChanges = () => {
    if (settings) {
      props.saveCalendarNewSettings(settings);
      publishCalendarNewSettings(calendarNewId ? calendarNewId : '');
      setSettings({ ...settings, canRevert: false });
    }
  };

  const handleDatabaseChange = (event: React.ChangeEvent<{ value: any }>) => {
    let selectedDatabase = databaseList.find(
      (database: any) => database.id === event.target.value
    );
    if (selectedDatabase) {
      setDatabaseSelected(selectedDatabase);
      handleChanges('boomCalendarNewsId', selectedDatabase.id);
    } else {
      setDatabaseSelected({
        url: '',
        id: '',
      });
      handleChanges('boomCalendarNewsId', '');
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
      setEan('');
    }
  };

  const handleBackButton = () => {
    props.calendarNewSelected(undefined);
    history.push('/site/calendarNews');
  };

  const selectHomepage = (item: any | undefined) => {
    setIsHomepageEdit(true);
    item ? setMenuItemToEdit(item) : setAddMenuDialog(true);
  };

  const reloadError = () => {
    loadCalendarNewSettingsProps();
    getCalendarNewSettings(calendarNewId ? calendarNewId : '')
      .then((result: any) => {
        setSettings(result.data);
        loadCalendarNewSettingsSuccessProps(result.data);
      })
      .catch((error: AxiosError) =>
        loadCalendarNewSettingsFailureProps(error.response?.data.errorMessage)
      );
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
        className="journal-settings-body"
      >
        <Box
          display="flex"
          className="header-settings"
          flexDirection="row"
          alignItems="center"
        >
          <Box>
            <IconButton onClick={handleBackButton}>
              <FontAwesomeIcon className="back-icon" icon={faAngleLeft} />
            </IconButton>
          </Box>
          <span>{t('calendarNewSettings.calendarNewSettings')}</span>
          <Box
            display="flex"
            flexDirection="row"
            flex={1}
            justifyContent="flex-end"
          >
            <Box display="flex" flex={1}></Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              {t('buttons.hidden')}
              <Switch
                id="visibility-switch"
                data-cy="visibility-button"
                checked={settings?.visibility}
                onChange={(evt: any) =>
                  handleChanges('visibility', evt.target.checked)
                }
                color="primary"
              />
              {t('buttons.visible')}
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
              disabled={!(settings?.name && settings?.cover && settings?.eans)}
              className="main-green-button"
              variant="contained"
              onClick={() => publishChanges()}
            >
              {t('buttons.publish')}
            </Button>
          </Box>
        </Box>

        <Box display="flex" flexDirection="row" alignItems="flex-end" flex={1}>
          <Box flexDirection="column" flex={1}>
            <div className="title">
              {t('calendarNewSettings.calendarNewName')}
            </div>
            <TextField
              className="input-name"
              id="settings-name"
              variant="outlined"
              value={settings?.name}
              onChange={(evt: any) => handleChanges('name', evt.target.value)}
              onBlur={() => saveChanges()}
            />
          </Box>
          <Box flexDirection="column" className="size-buttons">
            <div className="title">{t('themeSettings.size')} </div>
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
            </ToggleButtonGroup>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column">
          <div className="title">{t('databaseSettings.databaseSelector')}</div>
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
                    settings?.boomCalendarNewsId
                      ? 'select-database'
                      : 'select-database-required required-selector'
                  }
                  value={databaseSelected?.id}
                  onChange={handleDatabaseChange}
                >
                  <option>{t('databaseSettings.selector')}</option>

                  {databaseList?.map((database: any, i: number) => (
                    <option id="database-display" key={i} value={database.id}>
                      {database.title}
                    </option>
                  ))}
                </NativeSelect>
                <span className="error-text">
                  {settings?.boomCalendarNewsId
                    ? ''
                    : t('placeholders.requiredField')}
                </span>
              </Box>
            </Box>
          </div>
        </Box>

        <Box display="flex" flexDirection="column">
          <div className="title">{t('calendarNewSettings.description')} </div>
          <TextField
            className="discription-field"
            id="description-input"
            variant="outlined"
            multiline
            rows={3}
            value={settings?.description || ''}
            onChange={(evt: any) =>
              handleChanges('description', evt.target.value)
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
              id="journal-cover-button-file"
              type="file"
              style={{ display: 'none' }}
              onChange={(evt: any) =>
                setImageBase64('cover', evt.target.files[0])
              }
            />
            <label htmlFor="journal-cover-button-file">
              <Button
                className="main-blue-button"
                variant="contained"
                component="span"
              >
                {t('calendarNewSettings.calendarNewCover')}
              </Button>
            </label>
            <Button
              id="cover-button"
              data-cy="cover-revert-button"
              className="main-red-button"
              variant="contained"
              onClick={() => handleChanges('cover', '')}
            >
              {t('buttons.remove')}
            </Button>
            <span className="error-text">
              {settings?.cover ? '' : t('placeholders.requiredField')}
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
            <div className="cover-shadow" data-cy="cover">
              <p className="image-size">180x250 px</p>
            </div>
          )}
        </Box>

        <div className="title">{t('themeSettings.colorSettings')} </div>
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

        <div className="title">{t('settings.fontSettings')} </div>
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

        <Box>
          <div className="title">
            {t('calendarNewSettings.headerBackground')}
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
                onClick={handleColorPicker}
                variant="contained"
                className="backgroundcolor-button"
              >
                <div
                  className={classes.headerColorButton}
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
                  setSampleColour('transparent');
                  setColor('colour', 'transparent')}}
                disabled={
                  settings?.colour === 'transparent' ||
                  settings?.colour === null
                    ? true
                    : false
                }
              >
                {t('buttons.remove')}
              </Button>
            </Box>
          </Box>
          {showColorPicker && (
            <ColorPickerComponent
            paddingLeft={15}
            width={250}
            sampleColor={sampleColour}
            setSampleColor={setSampleColour}
            color={
              settings?.colour
            }
            setColor={(color: any) => {
              setColor('colour', color);
            }}
          />
          )}
        </Box>
        <Box>
          <div className="title">
            {t('calendarNewSettings.calendarNewMenu')}
          </div>
        </Box>
        <Box className="journal-menu-selector">
          <MenuSelector
            homepage={settings?.homepage}
            items={settings?.menuItems}
            onReorderItems={reorder}
            onDeleteItem={removeMenuItem}
            onEditItem={editMenuItem}
            onAddItem={() => setAddMenuDialog(true)}
            onSelectHomepage={selectHomepage}
          />
          {addMenuDialog && (
            <AddItemMenuDialog
              open={addMenuDialog}
              isHomepage={isHomepageEdit}
              calendarNewId={calendarNewId}
              onCloseDialog={handleAddMenuItem}
              item={editingMEnuItem ? menuItemToEdit : undefined}
            />
          )}
        </Box>

        <Box display="flex" flexDirection="column">
          <div className="title">{t('calendarNewSettings.licenses')} </div>

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
                      onClick={() => handleDeleteEan(i)}
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
                  id="addYear-button"
                  data-cy="addYear-button"
                  onClick={handleAddEan}
                >
                  <FontAwesomeIcon className="trash-icon" icon={faPlus} />
                </Button>
              </Box>
            </Box>
            <span className="error-text">
              {settings?.eans?.length !== 0
                ? ''
                : t('placeholders.requiredField')}
            </span>
          </div>
        </Box>
        <Box>
          <div className="title">
            {t('calendarNewSettings.deleteCalendarNew')}
          </div>
        </Box>
        <Box>
          <Tooltip
            title={
              settings?.visibility
                ? 'Database must be hidden'
                : 'Delete Journal'
            }
            placement="top"
          >
            <span>
              <Button
                variant="contained"
                className="main-red-button delete-button"
                onClick={() => setOpenConfirm(true)}
                disabled={settings?.visibility}
              >
                {t('buttons.deletePermanent')}
              </Button>
            </span>
          </Tooltip>
        </Box>
        <ConfirmDialog
          open={openConfirm}
          bodyMessage={t('calendarNewSettings.deleteMessage')}
          onClose={closeConfirm}
        />
      </Box>
    </ContainerTemplate>
  );
}

const mapStateToProps = (state: AppState) => ({
  loading: selectCalendarNewSettingsLoading(state),
  error: selectCalendarNewSettingsError(state),
  errorMsg: selectCalendarNewSettingsErrorMsg(state),
  calendarNewSettings: selectCalendarNewSettings(state),
});

export default connect(mapStateToProps, {
  calendarNewSelected,
  loadCalendarNewSettings,
  loadCalendarNewSettingsSuccess,
  loadCalendarNewSettingsFailure,
  saveCalendarNewSettings,
})(CalendarNewSettingsComponent);
