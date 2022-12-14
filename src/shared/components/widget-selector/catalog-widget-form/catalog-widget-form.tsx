import React, { useState } from 'react';
import './catalog-widget-form.scss';
import {
  Box,
  Button,
  TextField,
  makeStyles,
  createStyles,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PageWidget } from '../../../models/layout.model';
import BorderBottomIcon from '@material-ui/icons/BorderBottom';
import BorderRightIcon from '@material-ui/icons/BorderRight';
import BorderLeftIcon from '@material-ui/icons/BorderLeft';
import BorderTopIcon from '@material-ui/icons/BorderTop';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import {
  faEllipsisH,
  faEllipsisV,
  faGripVertical,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPickerComponent } from '../../color-picker-component/color-picker-component';

interface CatalogWidgetFormProps {
  id?: string;
  onSave: (form: any) => void;
  onCancel: () => void;
  catalogWidgetData?: PageWidget;
}

export default function CatalogWidgetForm(
  props: CatalogWidgetFormProps
): JSX.Element {
  const { t, i18n } = useTranslation();

  const [title, setTitle] = useState<
    { [ln: string]: string | undefined } | undefined
  >({ en: '', nl: '' });
  const [borderTop, setBorderTop] = useState<boolean>(false);
  const [borderRight, setBorderRight] = useState<boolean>(false);
  const [borderBottom, setBorderBottom] = useState<boolean>(false);
  const [borderLeft, setBorderLeft] = useState<boolean>(false);
  const [showBackgroundColor, setShowBackgroundColor] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>(
    undefined
  );
  const [sampleBackgroundColor, setSampleBackgroundColor] =
    useState<string>('transparent');
  const [orientationSwitch, setOrientationSwitch] = useState<
    string | undefined
  >('horizontal');

  const [publicationType, setPublicationType] = useState<number | undefined>(0);
  const [sortBy, setSortBy] = useState<number | undefined>(0);
  const [helperText, setHelperText] = useState<string>(' ');
  const [error, setError] = useState<boolean>(false);

  React.useEffect(() => {
    if (props.catalogWidgetData) {
      setOrientationSwitch(props.catalogWidgetData.display);
      setTitle(props.catalogWidgetData.title);
      setBackgroundColor(props.catalogWidgetData.backgroundColor);
      setSampleBackgroundColor(
        props.catalogWidgetData.backgroundColor || 'transparent'
      );
      setBorderBottom(props.catalogWidgetData.borderBottom);
      setBorderLeft(props.catalogWidgetData.borderLeft);
      setBorderRight(props.catalogWidgetData.borderRight);
      setBorderTop(props.catalogWidgetData.borderTop);
      setPublicationType(props.catalogWidgetData.typeOfPublication);
      setSortBy(props.catalogWidgetData.sortBy);
    }
    // eslint-disable-next-line
  }, []);

  const handleSaveButton = () => {
    let saveCatalogWidget: any = {
      title,
      borderBottom,
      borderLeft,
      borderRight,
      borderTop,
      widgetType: 1,
      typeOfPublication: publicationType,
      sortBy,
      backgroundColor,
      display: orientationSwitch,
    };
    if (props.catalogWidgetData) {
      saveCatalogWidget = {
        ...saveCatalogWidget,
        uuid: props.catalogWidgetData.uuid,
        x: props.catalogWidgetData.x,
        y: props.catalogWidgetData.y,
        h: props.catalogWidgetData.h,
        w: props.catalogWidgetData.w,
        minH: props.catalogWidgetData.minH,
        minW: props.catalogWidgetData.minW,
      };
    }
    props.onSave(saveCatalogWidget);
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
    })
  );
  const classes = useStyles();

  return (
    <Box
      id={props.id}
      className="widget-catalog-body"
      component="form"
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
      onSubmit={(e) => {
        handleSaveButton();
      }}
    >
      <Box
        className="form-label-textfield switch"
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        p={1}
      >
        <Box flexDirection="column" display="flex">
          <span>{t('publication.display')}</span>
          <ToggleButtonGroup
            value={orientationSwitch}
            exclusive
            onChange={(evt: any, value: any) => setOrientationSwitch(value)}
          >
            <ToggleButton value="horizontal" aria-label="left aligned">
              <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
            </ToggleButton>
            <ToggleButton value="vertical" aria-label="centered">
              <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
            </ToggleButton>
            <ToggleButton value="matrix" aria-label="right aligned">
              <FontAwesomeIcon icon={faGripVertical}></FontAwesomeIcon>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Box
        className="form-label-textfield"
        display="flex"
        flexDirection="column"
      >
        <TextField
          id="text-title"
          value={title?.[i18n.language]}
          variant="outlined"
          label={t('catalogWidget.title')}
          required
          error={error}
          helperText={helperText}
          InputLabelProps={{ shrink: true }}
          onInput={(e: any) => {
            e.target.setCustomValidity('');
            setError(false);
            setHelperText(' ');
          }}
          onInvalid={(e: any) => {
            e.target.setCustomValidity(
              `${t('catalogWidget.title')} ${t(
                'pages.widgetTranslations.errors.isRequired'
              )}`
            );

            setError(true);
            setHelperText(
              `${t('catalogWidget.title')} ${t(
                'pages.widgetTranslations.errors.isRequired'
              )}`
            );
          }}
          onChange={(evt: any) =>
            setTitle({ ...title, [i18n.language]: evt.target.value })
          }
        />
      </Box>

      <Box
        className="form-label-selectfield"
        display="flex"
        flexDirection="column"
      >
        <span>{t('catalogWidget.publicationType')}</span>
        <Select
          id="menu-controller"
          value={publicationType}
          onChange={(evt: any) => setPublicationType(evt.target.value)}
          variant="outlined"
        >
          <MenuItem value={0}>{t('placeholders.all')}</MenuItem>
          <MenuItem value={1}>{t('themeFilters.book')}</MenuItem>
          <MenuItem value={2}>{t('themeFilters.journal')}</MenuItem>
          <MenuItem value={3}>{t('themeFilters.journalArticle')}</MenuItem>
          <MenuItem value={4}>{t('themeFilters.databases')}</MenuItem>
          <MenuItem value={5}>{t('themeFilters.databasesArticle')}</MenuItem>
        </Select>
      </Box>

      <Box
        className="form-label-selectfield"
        display="flex"
        flexDirection="column"
      >
        <span>{t('catalogWidget.sortBy')}</span>
        <Select
          id="menu-controller2"
          value={sortBy}
          onChange={(evt: any) => setSortBy(evt.target.value)}
          variant="outlined"
        >
          <MenuItem value={3}>{t('sortBy.alphabetic')}</MenuItem>
          <MenuItem value={1}>{t('sortBy.lastAdded')}</MenuItem>
          <MenuItem value={2}>{t('sortBy.lastPublished')}</MenuItem>
          <MenuItem value={0}>{t('sortBy.mostRead')}</MenuItem>
        </Select>
      </Box>

      <Box
        flexDirection="column"
        display="flex"
        className="form-label-textfield"
      >
        <Box flexDirection="row" display="flex" alignItems="flex-end">
          <Box
            flexDirection="column"
            display="flex"
            className="form-label-textfield"
          >
            <span>{t('publication.backgroundColor')}</span>
            <Button
              id="background-color"
              onClick={() => setShowBackgroundColor(!showBackgroundColor)}
              variant="contained"
              className="color-picker-button"
            >
              <div className={classes.backgroundColorButton}></div>
            </Button>
          </Box>
          <Box
            className="layout-remove-background-color"
            display="flex"
            flexDirection="row"
          >
            <Button
              onClick={() => {
                setBackgroundColor('transparent');
                setSampleBackgroundColor('transparent');
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
            paddingLeft={0}
            width={220}
          />
        )}
      </Box>

      <Box
        className="form-label-textfield"
        display="flex"
        flexDirection="column"
      >
        <span>{t('banner.border')}</span>
        <Box display="flex" flexDirection="row">
          <Button id="top-border" onClick={() => setBorderTop(!borderTop)}>
            <BorderTopIcon
              className={borderTop ? 'selected-border' : 'unselected-border'}
            />
          </Button>
          <Button
            id="right-border"
            onClick={() => setBorderRight(!borderRight)}
          >
            <BorderRightIcon
              className={borderRight ? 'selected-border' : 'unselected-border'}
            />
          </Button>
          <Button
            id="bottom-border"
            onClick={() => setBorderBottom(!borderBottom)}
          >
            <BorderBottomIcon
              className={borderBottom ? 'selected-border' : 'unselected-border'}
            />
          </Button>
          <Button id="left-border" onClick={() => setBorderLeft(!borderLeft)}>
            <BorderLeftIcon
              className={borderLeft ? 'selected-border' : 'unselected-border'}
            />
          </Button>
        </Box>
      </Box>
      <Box
        className="layout-dialog-actions"
        display="flex"
        flexDirection="row-reverse"
      >
        <Button
          id="save-button"
          type="submit"
        >
          {t('buttons.save')}
        </Button>
        <Button id="cancel-button" onClick={() => props.onCancel()}>
          {t('buttons.cancel')}
        </Button>
      </Box>
    </Box>
  );
}
