import React, { useState } from 'react';
import './promotion-widget-form.scss';
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
import { retrieveJournalList } from '../../../../site/journal-settings/services/journal-settings.service';
import { retrieveDatabaseList } from '../../../../site/database-settings/services/database-settings.service';
import { ColorPickerComponent } from '../../color-picker-component/color-picker-component';
interface PromotionWidgetFormProps {
  id?: string;
  onSave: (form: any) => void;
  onCancel: () => void;
  promotionWidgetData?: PageWidget;
}

export default function PromotionWidgetForm(
  props: PromotionWidgetFormProps
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

  const [publicationType, setPublicationType] = useState<number | undefined>(2);
  const [journalSelected, setJournalSelected] = useState<string | undefined>(
    ''
  );
  const [databaseSelected, setDatabaseSelected] = useState<string | undefined>(
    ''
  );
  const [sortBy, setSortBy] = useState<number | undefined>(0);
  const [journalList, setJournalList] = useState<any[]>([]);
  const [databaseList, setDatabaseList] = useState<any[]>([]);
  const [helperText, setHelperText] = useState<string>(' ');
  const [error, setError] = useState<boolean>(false);

  React.useEffect(() => {
    if (props.promotionWidgetData) {
      setOrientationSwitch(props.promotionWidgetData.display);
      setTitle(props.promotionWidgetData.title);
      setBackgroundColor(props.promotionWidgetData.backgroundColor);
      setSampleBackgroundColor(
        props.promotionWidgetData.backgroundColor || 'transparent'
      );
      setBorderBottom(props.promotionWidgetData.borderBottom);
      setBorderLeft(props.promotionWidgetData.borderLeft);
      setBorderRight(props.promotionWidgetData.borderRight);
      setBorderTop(props.promotionWidgetData.borderTop);
      setPublicationType(props.promotionWidgetData.typeOfPublication);
      setJournalSelected(props.promotionWidgetData.journalSelected);
      setDatabaseSelected(props.promotionWidgetData.databaseSelected);
      setSortBy(props.promotionWidgetData.sortBy);
    }
    // eslint-disable-next-line
  }, []);

  const handleSaveButton = () => {
    let savePromotionWidget: any = {
      title,
      borderBottom,
      borderLeft,
      borderRight,
      borderTop,
      widgetType: 11,
      typeOfPublication: publicationType,
      journalSelected: journalSelected,
      databaseSelected: databaseSelected,
      sortBy,
      backgroundColor,
      display: orientationSwitch,
    };
    if (props.promotionWidgetData) {
      savePromotionWidget = {
        ...savePromotionWidget,
        uuid: props.promotionWidgetData.uuid,
        x: props.promotionWidgetData.x,
        y: props.promotionWidgetData.y,
        h: props.promotionWidgetData.h,
        w: props.promotionWidgetData.w,
        minH: props.promotionWidgetData.minH,
        minW: props.promotionWidgetData.minW,
      };
    }
    props.onSave(savePromotionWidget);
  };

  React.useEffect(() => {
    publicationType === 2
      ? retrieveJournalList(
          props.promotionWidgetData?.journalSelected || ''
        ).then((res: any) => {
          setJournalList(res.data);
          setJournalSelected(
            journalSelected === ''
              ? res.data.length > 0
                ? res.data[0].id
                : ''
              : journalSelected
          );
        })
      : retrieveDatabaseList(
          props.promotionWidgetData?.databaseSelected || ''
        ).then((res: any) => {
          setDatabaseList(res.data);
          setDatabaseSelected(
            databaseSelected === ''
              ? res.data.length > 0
                ? res.data[0].id
                : ''
              : databaseSelected
          );
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicationType]);

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
      className="widget-promotion-body"
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
        className="form-label-textfield"
        display="flex"
        flexDirection="column"
      >
        <TextField
          id="text-title"
          value={title?.[i18n.language]}
          variant="outlined"
          label={t('publication.title')}
          required
          InputLabelProps={{ shrink: true }}
          error={error}
          helperText={helperText}
          onInput={(e: any) => {
            e.target.setCustomValidity('');
            setError(false);
            setHelperText(' ');
          }}
          onInvalid={(e: any) => {
            e.target.setCustomValidity(
              `${t('publication.title')} ${t(
                'pages.widgetTranslations.errors.isRequired'
              )}`
            );
            setError(true);
            setHelperText(
              `${t('publication.title')} ${t(
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
        <TextField
          label={t('promotionWidget.publicationType')}
          select
          required
          margin="normal"
          id="menu-controller"
          value={publicationType}
          onChange={(evt: any) => setPublicationType(evt.target.value)}
          variant="outlined"
        >
          <MenuItem value={2}>{t('themeFilters.journal')}</MenuItem>
          <MenuItem value={4}>{t('themeFilters.databases')}</MenuItem>
        </TextField>
      </Box>

      {publicationType === 2 ? (
        <Box
          className="form-label-selectfield"
          display="flex"
          flexDirection="column"
        >
          <TextField
            label={t('journalSettings.journalSelector')}
            select
            required
            margin="normal"
            id="journal-selector"
            value={journalSelected}
            onChange={(evt: any) => setJournalSelected(evt.target.value)}
            variant="outlined"
          >
            {journalList?.map((journal: any, i: number) => (
              <MenuItem id="journal-display" key={i} value={journal.id}>
                {journal.title}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      ) : (
        <Box
          className="form-label-selectfield"
          display="flex"
          flexDirection="column"
        >
          <TextField
            label={t('databaseSettings.databaseSelector')}
            select
            required
            margin="normal"
            id="database-selector"
            value={databaseSelected}
            onChange={(evt: any) => setDatabaseSelected(evt.target.value)}
            variant="outlined"
          >
            {databaseList?.map((database: any, i: number) => (
              <MenuItem id="database-display" key={i} value={database.id}>
                {database.title}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}
      <Box
        className="form-label-selectfield"
        display="flex"
        flexDirection="column"
      >
        <TextField
          label={t('promotionWidget.sortBy')}
          select
          required
          margin="normal"
          id="menu-controller2"
          value={sortBy}
          onChange={(evt: any) => setSortBy(evt.target.value)}
          variant="outlined"
        >
          <MenuItem value={3}>{t('sortBy.alphabetic')}</MenuItem>
          <MenuItem value={1}>{t('sortBy.lastAdded')}</MenuItem>
          <MenuItem value={2}>{t('sortBy.lastPublished')}</MenuItem>
          <MenuItem value={0}>{t('sortBy.mostRead')}</MenuItem>
        </TextField>
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
        <Button id="save-button" type="submit">
          {t('buttons.save')}
        </Button>
        <Button id="cancel-button" onClick={() => props.onCancel()}>
          {t('buttons.cancel')}
        </Button>
      </Box>
    </Box>
  );
}
