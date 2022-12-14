import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { Box, TextField, Select, MenuItem } from '@material-ui/core';
import './itemMenu-dialog.scss';
import { faTimes, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Switch from '@material-ui/core/Switch';
import {
  MenuController,
  MenuHeaderItem,
  HeaderMenu,
  ItemTranslations,
} from '../../../../shared/models/menuItem.model';
import { useTranslation } from 'react-i18next';
import { getPages } from '../../../pages/services/pages.service';
interface Page {
  id: string;
  label: string;
  uuid: string;
}

interface addItemMenuProps {
  open: boolean;
  themeId: string | undefined;
  item?: HeaderMenu;
  onCloseDialog: (menuItem?: any) => void;
  isHomepage: boolean;
}

export default function AddItemMenuDialog(props: addItemMenuProps) {
  const { t } = useTranslation();
  const maxWidth: DialogProps['maxWidth'] = 'sm';

  const [controller, setController] = useState<any>(
    props.item ? props.item.type : undefined
  );
  const [label, setLabel] = useState<ItemTranslations>(
    props.item ? props.item.label : { en: '', nl: '' }
  );
  const [pages, setPages] = useState<Page[]>([]);
  const [page, setPage] = useState<string | undefined>(
    props.item?.pageId ? props.item.pageId : undefined
  );
  const [folder, setFolder] = useState(props.item?.type === 4 ? true : false);
  const [folderLabel, setFolderLabel] = useState<ItemTranslations>(
    props.item ? props.item.label : { en: '', nl: '' }
  );
  const [folderPageLabel, setFolderPageLabel] = useState<ItemTranslations>({
    en: '',
    nl: '',
  });
  const [folderItem, setFolderItem] = useState<any[]>(
    props.item?.folder ? [...props.item.folder, {}] : [{}]
  );

  const [folderItemController, setFolderItemController] = useState<
    number | undefined
  >(undefined);

  const handleCloseDialog = (menuItem?: any) => {
    props.onCloseDialog(menuItem);
  };

  React.useEffect(() => {
    getPages(props.themeId).then((result: any) => {
      setPages(result.data.content);
    });
    if (props.isHomepage) {
      setController(MenuController.PAGE);
      setLabel({ en: 'Home', nl: 'Home' });
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    handleDisableButton();
    // eslint-disable-next-line
  }, [controller, label, folderItem, folderLabel]);

  const handleSwitchChange = () => {
    setFolder(!folder);
  };

  const handleSaveButton = () => {
    if (!folder) {
      handleCloseDialog({
        id: props.item?.id ? props.item.id : undefined,
        type: controller,
        pageId: page,
        label,
      });
    } else {
      const reducedFolderItem: any[] = folderItem.slice();
      reducedFolderItem.splice(folderItem.length - 1, 1);
      handleCloseDialog({
        id: props.item?.id ? props.item.id : undefined,
        label: props.item?.label ? props.item.label : folderLabel,
        type: 4,
        folder: reducedFolderItem,
      });
    }
  };

  const addFolderITem = () => {
    if (
      folderPageLabel !== { en: '', nl: '' } &&
      folderItemController !== undefined
    ) {
      const reducedFolderItem: any[] = folderItem.slice();
      reducedFolderItem.splice(folderItem.length - 1, 1);
      setFolderItem([
        ...reducedFolderItem,
        {
          label: folderPageLabel,
          type: folderItemController,
          pageId: page,
        },
        {},
      ]);
    }
    setFolderPageLabel({ en: '', nl: '' });
    setFolderItemController(undefined);
    setPage(undefined);
  };

  const deleteFolderPageItem = (index: number) => {
    const copy = folderItem.slice();
    copy.splice(index, 1);
    setFolderItem(copy);
  };

  const handleDisableButton = () => {
    return (
      (label.en !== '' &&
        label.nl !== '' &&
        label.en !== null &&
        label.nl !== null &&
        controller !== undefined) ||
      (props.isHomepage && page !== undefined) ||
      (folderLabel.en !== '' &&
        folderLabel.nl !== '' &&
        folderLabel.en !== null &&
        folderLabel.nl !== null &&
        folderItem.length > 0)
    );
  };

  const getPageLabel = (id: string) => {
    let pageSelected = pages.find((pageItem) => pageItem.uuid === id);
    return pageSelected?.label;
  };

  const getControllerLabel = (type: number) => {
    switch (type) {
      case 3:
        return t('settings.menuEntries.catalog');
      case 1:
        return t('settings.menuEntries.news');
      default:
        break;
    }
  };

  return (
    <Dialog
      id="main-dialog"
      className="layout-dialog"
      fullWidth={true}
      maxWidth={maxWidth}
      open={props.open}
      onClose={() => handleCloseDialog()}
    >
      <Box
        className="layout-dialog-title"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <span>{t('settings.menuItemTitle')}</span>
        <IconButton id="close-button" onClick={() => handleCloseDialog()}>
          <FontAwesomeIcon size="sm" icon={faTimes} />
        </IconButton>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="flex-end" p={1}>
        <Box p={1}>
          <div>Item</div>
        </Box>
        <Box p={1}>
          <Switch
            disabled={props.isHomepage}
            id="folder-switch"
            checked={folder}
            onChange={handleSwitchChange}
            color="primary"
          />
        </Box>
        <Box p={1}>
          <div>Folder</div>
        </Box>
      </Box>
      <Box
        className="layout-dialog-body"
        display="flex"
        flexDirection="column"
        flex={1}
      >
        {!folder && (
          <Box>
            <Box
              className="form-label-selectfield"
              display="flex"
              flexDirection="column"
            >
              <span>{t('settings.menuItemController')}</span>
              <Select
                id="menu-controller"
                disabled={props.isHomepage}
                value={props.isHomepage ? MenuController.PAGE : controller}
                onChange={(evt: any) => setController(evt.target.value)}
                variant="outlined"
              >
                <MenuItem value={MenuController.PAGE}>
                  {t('settings.menuEntries.pages')}
                </MenuItem>
                {/* <MenuItem value={MenuController.NEWS}>
                  {t('settings.menuEntries.news')}
                </MenuItem> */}
                <MenuItem value={MenuController.CATALOG}>
                  {t('settings.menuEntries.catalog')}
                </MenuItem>
                {/* <MenuItem value={MenuController.CALENDAR_NEWS}>
                  {t('settings.menuEntries.calendarNews')}
                </MenuItem> */}
              </Select>
            </Box>
            {controller === 0 && (
              <Box
                className="form-label-selectfield"
                display="flex"
                flexDirection="column"
              >
                <span>{t('settings.menuItemPage')}</span>
                <Select
                  id="menu-pages"
                  value={page}
                  onChange={(evt: any) => setPage(evt.target.value)}
                  variant="outlined"
                >
                  {pages.map((pageItem: any) => (
                    <MenuItem value={pageItem.uuid}>{pageItem.label}</MenuItem>
                  ))}
                </Select>
              </Box>
            )}
            {!props.isHomepage && (
              <>
                <Box
                  className="form-label-textfield"
                  display="flex"
                  flexDirection="column"
                >
                  <span>{t('settings.menuItemLabel')} NL</span>
                  <TextField
                    id="menu-label-nl"
                    value={label.nl}
                    variant="outlined"
                    onChange={(evt: any) =>
                      setLabel({ ...label, nl: evt.target.value })
                    }
                  />
                </Box>{' '}
                <Box
                  className="form-label-textfield"
                  display="flex"
                  flexDirection="column"
                >
                  <span>{t('settings.menuItemLabel')} EN</span>
                  <TextField
                    id="menu-label-en"
                    value={label.en}
                    variant="outlined"
                    onChange={(evt: any) =>
                      setLabel({ ...label, en: evt.target.value })
                    }
                  />
                </Box>
              </>
            )}
          </Box>
        )}
        {folder && (
          <Box>
            <Box
              className="form-label-textfield"
              display="flex"
              flexDirection="column"
            >
              <span>{t('settings.menuItemLabel')} NL</span>
              <TextField
                id="menu-label-nl"
                value={folderLabel.nl}
                variant="outlined"
                onChange={(evt: any) =>
                  setFolderLabel({ ...folderLabel, nl: evt.target.value })
                }
              />
            </Box>{' '}
            <Box
              className="form-label-textfield"
              display="flex"
              flexDirection="column"
            >
              <span>{t('settings.menuItemLabel')} EN</span>
              <TextField
                id="menu-label-en"
                value={folderLabel.en}
                variant="outlined"
                onChange={(evt: any) =>
                  setFolderLabel({ ...folderLabel, en: evt.target.value })
                }
              />
            </Box>
            {folderItem.length > 0 && (
              <Fragment>
                {folderItem.map((item: MenuHeaderItem, index: number) => (
                  <>
                    {index === folderItem.length - 1 ? (
                      <Box display="flex" flexDirection="row">
                        <Box
                          className="form-label-selectfield"
                          display="flex"
                          flexDirection="column"
                          flexGrow={1}
                          p={1}
                        >
                          <span>{t('settings.menuItemController')}</span>
                          <Select
                            id="menu-pages"
                            value={folderItemController}
                            onChange={(evt: any) => {
                              setFolderItemController(evt.target.value);
                            }}
                            variant="outlined"
                          >
                            <MenuItem value={MenuController.PAGE}>
                              {t('settings.menuEntries.pages')}
                            </MenuItem>
                            {/* <MenuItem value={MenuController.NEWS}>
                          {t('settings.menuEntries.news')}
                        </MenuItem> */}
                            <MenuItem value={MenuController.CATALOG}>
                              {t('settings.menuEntries.catalog')}
                            </MenuItem>
                            {/* <MenuItem value={MenuController.CALENDAR_NEWS}>
                          {t('settings.menuEntries.calendarNews')}
                        </MenuItem> */}
                          </Select>
                        </Box>
                        <Box
                          className="form-label-textfield"
                          display="flex"
                          flexDirection="column"
                          flexGrow={1}
                          p={1}
                        >
                          <span>{t('settings.menuItemLabel')} NL</span>
                          <TextField
                            id="menu-label-nl"
                            value={folderPageLabel.nl}
                            variant="outlined"
                            onChange={(evt: any) =>
                              setFolderPageLabel({
                                ...folderPageLabel,
                                nl: evt.target.value,
                              })
                            }
                          />
                        </Box>{' '}
                        <Box
                          className="form-label-textfield"
                          display="flex"
                          flexDirection="column"
                          flexGrow={1}
                          p={1}
                        >
                          <span>{t('settings.menuItemLabel')} EN</span>
                          <TextField
                            id="menu-label-en"
                            value={folderPageLabel.en}
                            variant="outlined"
                            onChange={(evt: any) =>
                              setFolderPageLabel({
                                ...folderPageLabel,
                                en: evt.target.value,
                              })
                            }
                          />
                        </Box>
                        <Box alignSelf="flex-end">
                          <IconButton
                            disabled={
                              folderPageLabel.nl === '' ||
                              folderPageLabel.en === '' ||
                              folderItemController === undefined ||
                              (folderItemController === 0 && page === undefined)
                            }
                            className="trash-icon-dialog"
                            onClick={(e) => addFolderITem()}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </IconButton>
                        </Box>
                      </Box>
                    ) : (
                      <Box display="flex" flexDirection="row" key={index}>
                        <Box
                          className="form-label-selectfield"
                          display="flex"
                          flexDirection="column"
                          flexGrow={1}
                          p={1}
                        >
                          <span>{t('settings.menuItemController')}</span>
                          <Select
                            id="menu-pages"
                            value={index}
                            variant="outlined"
                          >
                            <MenuItem value={index} key={index}>
                              {getPageLabel(item.pageId ? item.pageId : '') ||
                                getControllerLabel(item.type)}
                            </MenuItem>
                          </Select>
                        </Box>
                        <Box
                          className="form-label-textfield"
                          display="flex"
                          flexDirection="column"
                          flexGrow={1}
                          p={1}
                        >
                          <span>{t('settings.menuItemLabel')} NL</span>
                          <TextField
                            id="menu-label-folder-nl"
                            value={item.label.nl}
                            variant="outlined"
                          />
                        </Box>{' '}
                        <Box
                          className="form-label-textfield"
                          display="flex"
                          flexDirection="column"
                          flexGrow={1}
                          p={1}
                        >
                          <span>{t('settings.menuItemLabel')} EN</span>
                          <TextField
                            id="menu-label-folder-en"
                            value={item.label.en}
                            variant="outlined"
                          />
                        </Box>
                        <Box alignSelf="flex-end">
                          <IconButton
                            id="delete-folder"
                            className="trash-icon-dialog"
                            onClick={(evt: any) => deleteFolderPageItem(index)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </IconButton>
                        </Box>
                      </Box>
                    )}
                  </>
                ))}
              </Fragment>
            )}
            {folderItemController === 0 && (
              <Box
                className="form-label-selectfolder form-label-selectfield"
                display="flex"
                flexDirection="column"
              >
                <span>{t('settings.menuItemPage')}</span>
                <Select
                  id="menu-pages"
                  value={page}
                  onChange={(evt: any) => setPage(evt.target.value)}
                  variant="outlined"
                >
                  {pages.map((pageItem: any) => (
                    <MenuItem value={pageItem.uuid} key={pageItem.uuid}>
                      {pageItem.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Box
        className="layout-dialog-actions"
        display="flex"
        flexDirection="row-reverse"
      >
        <Button
          id="save-button"
          disabled={!handleDisableButton()}
          onClick={() => handleSaveButton()}
        >
          {t('buttons.save')}
        </Button>
        <Button id="cancel-button" onClick={() => handleCloseDialog()}>
          {t('buttons.cancel')}
        </Button>
      </Box>
    </Dialog>
  );
}
