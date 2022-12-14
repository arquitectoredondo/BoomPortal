import React, { useState, Fragment } from 'react';
import './banner-widget-form.scss';
import {
  Box,
  Button,
  Switch,
  MenuItem,
  Select,
  TextField,
  makeStyles,
  createStyles,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { MenuController } from '../../../models/menuItem.model';
import { useTranslation } from 'react-i18next';
import { TwitterPicker } from 'react-color';
import { colors } from '../../../../shared/services/utils';
import BorderBottomIcon from '@material-ui/icons/BorderBottom';
import BorderRightIcon from '@material-ui/icons/BorderRight';
import BorderLeftIcon from '@material-ui/icons/BorderLeft';
import BorderTopIcon from '@material-ui/icons/BorderTop';
import {
  getAllPages,
  retrieveMenuThemes,
} from '../../../../site/settings/services/settings.service';
import { useParams } from 'react-router-dom';
import { PageWidget } from '../../../models/layout.model';
import { getNews } from '../../../../site/news/services/news.service';
import { ColorPickerComponent } from '../../color-picker-component/color-picker-component';

interface BannerWidgetFormProps {
  id?: string;
  type: string;
  onSave: (form: any) => void;
  onCancel: () => void;
  bannerData?: PageWidget;
}

interface newsMenu {
  canRevert: boolean;
  createdBy: string;
  publicationDate: string;
  title: string;
  uuid: string;
  visible: boolean;
}

interface themeMenu {
  canRevert: boolean;
  createdBy: string;
  editedBy: string;
  name: string;
  permalink: string;
  publishDate: string;
  publishedBy: string;
  revertedBy: string;
  uuid: string;
  visibility: boolean;
}

export default function BannerWidgetForm(
  props: BannerWidgetFormProps
): JSX.Element {
  const { t, i18n } = useTranslation();
  let { portalUuid } = useParams<{ portalUuid: string }>();
  const [internalSwitch, setInternalSwitch] = useState(false);
  const [scalableImageSwitch, setScalableImageSwitch] = useState<
    boolean | undefined
  >(false);
  const [controller, setController] = useState<number | undefined | string>(
    props.bannerData?.type || 0
  );
  const [label, setLabel] = useState<
    { [ln: string]: string | undefined } | undefined
  >({ en: '', nl: '' });
  const [text, setText] = useState<
    { [ln: string]: string | undefined } | undefined
  >({ en: '', nl: '' });
  const [url, setUrl] = useState<string | undefined>('');
  const [pages, setPages] = useState<any>([]);
  const [themes, setThemes] = useState<any>([]);
  const [newsList, setNewsList] = useState<any>([]);
  const [page, setPage] = useState<string | undefined>(
    props.bannerData?.url ? props.bannerData.url : ''
  );
  const [theme, setTheme] = useState<string | undefined>(
    props.bannerData?.url ? props.bannerData.url : ''
  );
  const [news, setNews] = useState<string | undefined>(
    props.bannerData?.pageId ? props.bannerData.pageId : ''
  );
  const [title, setTitle] = useState<
    { [ln: string]: string | undefined } | undefined
  >({ en: undefined, nl: undefined });
  const [image, setImage] = useState<string | undefined>(
    props.bannerData?.image ? props.bannerData.image : ''
  );
  const [showFontColor, setShowFontColor] = useState(false);
  const [fontColor, setFontColor] = useState<string | undefined>('#000');
  const [sampleFontColor, setSampleFontColor] = useState<string>('#000');
  const [showBackgroundColor, setShowBackgroundColor] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>(
    undefined
  );
  const [sampleBackgroundColor, setSampleBackgroundColor] =
    useState<string>('transparent');
  const [borderTop, setBorderTop] = useState<boolean>(false);
  const [borderRight, setBorderRight] = useState<boolean>(false);
  const [borderBottom, setBorderBottom] = useState<boolean>(false);
  const [borderLeft, setBorderLeft] = useState<boolean>(false);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean | undefined>(
    true
  );
  const [openNewTab, setOpenNewTab] = useState<boolean | undefined>(true);
  const [helperText, setHelperText] = useState<string>(' ');
  const [error, setError] = useState<boolean>(false);
  const [buttonHelperText, setButtonHelperText] = useState<string>(' ');
  const [buttonError, setButtonError] = useState<boolean>(false);
  const [urlHelperText, setUrlHelperText] = useState<string>(' ');
  const [urlError, setUrlError] = useState<boolean>(false);

  React.useEffect(() => {
    getAllPages(portalUuid).then((result: any) => setPages(result.data.pages));
    retrieveMenuThemes(portalUuid).then((result: any) =>
      setThemes(result.data.content)
    );
    getNews({
      portalUuid,
      onlyEvents: false,
      domain: undefined,
      searchTerm: '',
    }).then((result: any) => setNewsList(result.data.content));

    if (props.bannerData) {
      setInternalSwitch(!props.bannerData.internal);
      setScalableImageSwitch(props.bannerData.scalableImage);
      setController(props.bannerData.type);
      setLabel(props.bannerData.label);
      setText(props.bannerData.text);
      setUrl(props.bannerData.url);
      setPage(props.bannerData.url);
      setTheme(props.bannerData.url);
      setNews(props.bannerData.pageId);
      setTitle(props.bannerData.title);
      setImage(props.bannerData.image);
      setBackgroundColor(props.bannerData.backgroundColor);
      setSampleBackgroundColor(
        props.bannerData.backgroundColor || 'transparent'
      );
      setFontColor(props.bannerData.fontColor);
      setSampleFontColor(props.bannerData.fontColor || '#000');
      setBorderBottom(props.bannerData.borderBottom);
      setBorderLeft(props.bannerData.borderLeft);
      setBorderRight(props.bannerData.borderRight);
      setBorderTop(props.bannerData.borderTop);
      setIsButtonVisible(props.bannerData.isButtonVisible);
      setOpenNewTab(props.bannerData.openNewTab);
    }
    // eslint-disable-next-line
  }, []);

  const handleSwitchChange = () => {
    setInternalSwitch(!internalSwitch);
  };
  const handleScalableSwitchChange = () => {
    setScalableImageSwitch(!scalableImageSwitch);
  };
  const useStyles = makeStyles(() =>
    createStyles({
      backgroundColorButton: {
        height: 25,
        width: 220,
        background:
          sampleBackgroundColor === 'transparent' ||
          sampleBackgroundColor === undefined
            ? 'url(/assets/transparent-background.png)'
            : sampleBackgroundColor,
        backgroundSize: 'cover',
        borderRadius: 4,
      },
      fontColorButton: {
        height: 25,
        width: 220,
        background:
          sampleFontColor === 'transparent' || sampleFontColor === undefined
            ? 'url(/assets/transparent-background.png)'
            : sampleFontColor,
        backgroundSize: 'cover',
        borderRadius: 4,
      },
    })
  );
  const classes = useStyles();

  const handleSaveButton = () => {
    let saveBanner: any = {
      title,
      widgetType: 6,
      text,
      backgroundColor,
      fontColor,
      borderBottom,
      borderLeft,
      borderRight,
      borderTop,
      image,
      internal: !internalSwitch,
      scalableImage: scalableImageSwitch,
      label,
      isButtonVisible,
      openNewTab,
    };

    if (props.bannerData) {
      saveBanner = {
        ...saveBanner,
        uuid: props.bannerData.uuid,
        x: props.bannerData.x,
        y: props.bannerData.y,
        h: props.bannerData.h,
        w: props.bannerData.w,
        minH: props.bannerData.minH,
        minW: props.bannerData.minW,
      };
    }

    if (internalSwitch) {
      props.onSave({
        ...saveBanner,
        url,
        type: undefined,
        pageId: undefined,
      });
    } else {
      switch (controller) {
        case 0: {
          props.onSave({
            ...saveBanner,
            type: controller,
            url: page,
          });
          break;
        }
        case 1: {
          props.onSave({
            ...saveBanner,
            type: controller,
            pageId: news,
          });
          break;
        }
        case 2: {
          props.onSave({
            ...saveBanner,
            type: controller,
            url: theme,
          });
          break;
        }
        case 3: {
          props.onSave({
            ...saveBanner,
            type: controller,
          });
          break;
        }

        default: {
          break;
        }
      }
    }
  };

  const setImageBase64 = (key: string, file: File) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
      }
    };
  };

  return (
    <Box
      id={props.id}
      className='widget-banner-body'
      component='form'
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
      onSubmit={(e) => {
        handleSaveButton();
      }}
    >
      <Box display='flex' flexDirection='row' justifyContent='flex-end' p={1}>
        <Box p={1}>
          <div>{t('banner.internal')}</div>
        </Box>
        <Box p={1}>
          <Switch
            id='internal-switch'
            checked={internalSwitch}
            onChange={handleSwitchChange}
            color='primary'
          />
        </Box>
        <Box p={1}>
          <div>{t('banner.external')}</div>
        </Box>
      </Box>

      <Box
        className='form-label-textfield'
        display='flex'
        flexDirection='column'
      >
        <TextField
          id='banner-title'
          label={t('banner.title')}
          required
          InputLabelProps={{ shrink: true }}
          value={title?.[i18n.language]}
          variant='outlined'
          error={error}
          helperText={helperText}
          onInput={(e: any) => {
            e.target.setCustomValidity('');
            setError(false);
            setHelperText(' ');
          }}
          onInvalid={(e: any) => {
            e.target.setCustomValidity(
              `${t('banner.title')} ${t(
                'pages.widgetTranslations.errors.isRequired'
              )}`
            );
            setError(true);
            setHelperText(
              `${t('banner.title')} ${t(
                'pages.widgetTranslations.errors.isRequired'
              )}`
            );
          }}
          onChange={(evt: any) =>
            setTitle({ ...title, [i18n.language]: evt.target.value })
          }
        />
      </Box>
      {internalSwitch ? (
        <Box
          className='form-label-textfield'
          display='flex'
          flexDirection='column'
        >
          <TextField
            id='menu-url'
            value={url}
            variant='outlined'
            onChange={(evt: any) => setUrl(evt.target.value)}
            label={t('banner.url')}
            InputLabelProps={{ shrink: true }}
            margin='normal'
            required
            error={urlError}
            helperText={urlHelperText}
            onInput={(e: any) => {
              e.target.setCustomValidity('');
              setUrlError(false);
              setUrlHelperText(' ');
            }}
            onInvalid={(e: any) => {
              e.target.setCustomValidity(
                `${t('banner.url')} ${t(
                  'pages.widgetTranslations.errors.isRequired'
                )}`
              );
              setUrlError(true);
              setUrlHelperText(
                `${t('banner.url')} ${t(
                  'pages.widgetTranslations.errors.isRequired'
                )}`
              );
            }}
          />
        </Box>
      ) : (
        <Fragment>
          <Box
            className='form-label-selectfield'
            display='flex'
            flexDirection='column'
          >
            <TextField
              id='menu-controller-txt'
              select
              label={t('banner.controller')}
              InputLabelProps={{ shrink: true }}
              value={controller}
              onChange={(evt: any) => setController(evt.target.value)}
              required
              // helperText=' '
              margin='normal'
              variant='outlined'
            >
              <MenuItem value={MenuController.PAGE}>
                {t('settings.menuEntries.pages')}
              </MenuItem>
              {props.type === 'portal' && (
                <MenuItem value={MenuController.NEWS}>
                  {t('settings.menuEntries.news')}
                </MenuItem>
              )}
              {props.type === 'portal' && (
                <MenuItem value={MenuController.THEME}>
                  {t('settings.menuEntries.themes')}
                </MenuItem>
              )}
              <MenuItem value={MenuController.CATALOG}>
                {t('settings.menuEntries.catalog')}
              </MenuItem>
            </TextField>
          </Box>
          {controller === 0 && (
            <Box
              className='form-label-selectfield'
              display='flex'
              flexDirection='column'
            >
              <TextField
                id='menu-pages'
                value={
                  page === '' ? (pages.length > 0 ? pages[0].link : '') : page
                }
                onChange={(evt: any) => setPage(evt.target.value)}
                variant='outlined'
                select
                label={t('settings.menuItemPage')}
                InputLabelProps={{ shrink: true }}
                required
                margin='normal'
              >
                {pages?.map((pageMenu: any) => (
                  <MenuItem value={pageMenu.link} key={pageMenu.uuid}>
                    {pageMenu.parentLabel ? pageMenu.parentLabel : 'Portal'} /{' '}
                    {pageMenu.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          )}
          {controller === 1 && (
            <Box
              className='form-label-selectfield'
              display='flex'
              flexDirection='column'
            >
              <TextField
                select
                required
                InputLabelProps={{ shrink: true }}
                label={t('settings.menuItemNews')}
                id='menu-themes'
                value={
                  news === ''
                    ? newsList.length > 0
                      ? newsList[0].uuid
                      : ''
                    : news
                }
                onChange={(evt: any) => setNews(evt.target.value)}
                variant='outlined'
                margin='normal'
              >
                {newsList.map((newsMenu: newsMenu) => (
                  <MenuItem key={newsMenu.uuid} value={newsMenu.uuid}>
                    {newsMenu.title}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          )}
          {controller === 2 && (
            <Box
              className='form-label-selectfield'
              display='flex'
              flexDirection='column'
            >
              <TextField
                select
                required
                InputLabelProps={{ shrink: true }}
                label={t('settings.menuItemTheme')}
                id='menu-themes'
                value={
                  theme === ''
                    ? themes.length > 0
                      ? themes[0].permalink
                      : ''
                    : theme
                }
                onChange={(evt: any) => setTheme(evt.target.value)}
                variant='outlined'
                margin='normal'
              >
                {themes.map((themeMenu: themeMenu) => (
                  <MenuItem value={themeMenu.permalink} key={themeMenu.uuid}>
                    {themeMenu.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          )}
        </Fragment>
      )}

      <Box
        className='form-label-textfield text'
        display='flex'
        flexDirection='column'
      >
        <TextField
          label={t('banner.text')}
          InputLabelProps={{ shrink: true }}
          id='text-label'
          value={text?.[i18n.language]}
          variant='outlined'
          multiline
          rows={4}
          rowsMax={4}
          margin='normal'
          onChange={(evt: any) =>
            setText({ ...text, [i18n.language]: evt.target.value })
          }
        />
      </Box>

      <Box
        className='form-label-textfield'
        display='flex'
        flexDirection='column'
      >
        <Box display='flex' flexDirection='row' alignItems={'center'} p={0}>
          <TextField
            label={t('banner.label')}
            InputLabelProps={{ shrink: true }}
            margin='normal'
            id='menu-label'
            value={label?.[i18n.language]}
            variant='outlined'
            required={isButtonVisible}
            error={buttonError}
            helperText={buttonHelperText}
            onInput={(e: any) => {
              e.target.setCustomValidity('');
              setButtonError(false);
              setButtonHelperText(' ');
            }}
            onInvalid={(e: any) => {
              e.target.setCustomValidity(
                `${t('banner.label')} ${t(
                  'pages.widgetTranslations.errors.isRequired'
                )}`
              );
              setButtonError(true);
              setButtonHelperText(
                `${t('banner.label')} ${t(
                  'pages.widgetTranslations.errors.isRequired'
                )}`
              );
            }}
            onChange={(evt: any) =>
              setLabel({ ...label, [i18n.language]: evt.target.value })
            }
            disabled={!isButtonVisible}
            style={{ width: '90%' }}
          />
          <Switch
            checked={isButtonVisible}
            onChange={() => {
              setIsButtonVisible(!isButtonVisible);
              if (isButtonVisible) {
                setButtonError(false);
                setButtonHelperText(' ');
              }
            }}
            color='primary'
          />
        </Box>
      </Box>

      {internalSwitch && (
        <Box
          className='form-label-textfield'
          display='flex'
          flexDirection='column'
        >
          <span>{t('banner.openNewTab')}</span>

          <Box display='flex' flexDirection='row' p={0}>
            <Switch
              checked={openNewTab}
              onChange={() => {
                setOpenNewTab(!openNewTab);
              }}
              color='primary'
            />
          </Box>
        </Box>
      )}

      <Box display='flex' flexDirection='column' className='color-section'>
        <Box
          flexDirection='column'
          display='flex'
          className='form-label-textfield first-button'
        >
          <Box flexDirection='row' display='flex' alignItems='flex-end'>
            <Box
              flexDirection='column'
              display='flex'
              className='form-label-textfield'
            >
              <span>{t('banner.backgroundColor')}</span>
              <Button
                id='background-color'
                onClick={() => setShowBackgroundColor(!showBackgroundColor)}
                variant='contained'
                className='color-picker-button'
              >
                <div className={classes.backgroundColorButton}></div>
              </Button>
            </Box>
            <Box
              className='layout-remove-background-color'
              display='flex'
              flexDirection='row'
            >
              <Button
                onClick={() => {
                  setSampleBackgroundColor('transparent');
                  setBackgroundColor('transparent');
                }}
                disabled={
                  backgroundColor === 'transparent' ||
                  backgroundColor === undefined
                    ? true
                    : false
                }
              >
                {t('buttons.remove')}
              </Button>
            </Box>
          </Box>
          {showBackgroundColor && (
            <ColorPickerComponent
              sampleColor={sampleBackgroundColor}
              setSampleColor={setSampleBackgroundColor}
              color={backgroundColor || 'transparent'}
              setColor={setBackgroundColor}
              paddingLeft={15}
              width={250}
            />
          )}
        </Box>
        <Box
          flexDirection='column'
          display='flex'
          className='form-label-textfield'
        >
          <Box flexDirection='row' display='flex' alignItems='flex-end'>
            <Box
              flexDirection='column'
              display='flex'
              className='form-label-textfield'
            >
              <span>{t('banner.fontColor')}</span>
              <Button
                id='background-color'
                onClick={() => setShowFontColor(!showFontColor)}
                variant='contained'
                className='color-picker-button'
              >
                <div className={classes.fontColorButton}></div>
              </Button>
            </Box>
            <Box
              className='layout-remove-background-color'
              display='flex'
              flexDirection='row'
            >
              <Button
                onClick={() => {
                  setSampleFontColor('#000');
                  setFontColor('#000');
                }}
                disabled={
                  fontColor === '#000' || fontColor === undefined ? true : false
                }
              >
                {t('buttons.remove')}
              </Button>
            </Box>
          </Box>
          {showFontColor && (
            <ColorPickerComponent
              sampleColor={sampleFontColor}
              setSampleColor={setSampleFontColor}
              color={fontColor || '#000'}
              setColor={setFontColor}
              paddingLeft={15}
              width={250}
            />
          )}
        </Box>
      </Box>
      <Box flexDirection='column' display='flex'>
        <input
          accept='image/*'
          id='contained-button-file'
          type='file'
          style={{ display: 'none' }}
          onChange={(evt: any) =>
            setImageBase64('htmlFavicon', evt.target.files[0])
          }
        />
        <label htmlFor='contained-button-file'>
          <Button
            className='main-blue-button'
            variant='contained'
            color='primary'
            component='span'
          >
            {'Add image'}
          </Button>
          <Box>
            {image ? (
              <div
                id='settings-logo'
                data-cy='logo'
                className='size-helper'
                style={{
                  width: '340px',
                  height: '180px',
                  backgroundImage: `url("${image}")`,
                }}
              ></div>
            ) : (
              <div
                className='size-helper'
                style={{ width: '340px', height: '180px' }}
                data-cy='logo'
              >
                <p className='preview-image-size'>680x360 px</p>
              </div>
            )}
          </Box>
        </label>
      </Box>
      <Box display='flex' flexDirection='row' justifyContent='flex-start' p={1}>
        <Box p={1}>
          <div>{t('banner.fixed')}</div>
        </Box>
        <Box p={1}>
          <Switch
            id='scalable-switch'
            checked={scalableImageSwitch}
            onChange={handleScalableSwitchChange}
            color='primary'
          />
        </Box>
        <Box p={1}>
          <div>{t('banner.scalable')}</div>
        </Box>
      </Box>
      <Box
        className='form-label-textfield'
        display='flex'
        flexDirection='column'
      >
        <span>{t('banner.border')}</span>
        <Box display='flex' flexDirection='row'>
          <Button id='top-border' onClick={() => setBorderTop(!borderTop)}>
            <BorderTopIcon
              className={borderTop ? 'selected-border' : 'unselected-border'}
            />
          </Button>
          <Button
            id='right-border'
            onClick={() => setBorderRight(!borderRight)}
          >
            <BorderRightIcon
              className={borderRight ? 'selected-border' : 'unselected-border'}
            />
          </Button>
          <Button
            id='bottom-border'
            onClick={() => setBorderBottom(!borderBottom)}
          >
            <BorderBottomIcon
              className={borderBottom ? 'selected-border' : 'unselected-border'}
            />
          </Button>
          <Button id='left-border' onClick={() => setBorderLeft(!borderLeft)}>
            <BorderLeftIcon
              className={borderLeft ? 'selected-border' : 'unselected-border'}
            />
          </Button>
        </Box>
      </Box>
      <Box
        className='layout-dialog-actions'
        display='flex'
        flexDirection='row-reverse'
      >
        <Button id='save-button' type='submit'>
          {t('buttons.save')}
        </Button>
        <Button id='cancel-button' onClick={() => props.onCancel()}>
          {t('buttons.cancel')}
        </Button>
      </Box>
    </Box>
  );
}
