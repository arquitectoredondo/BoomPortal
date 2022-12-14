import React, { useState } from 'react';
import './calendar-news-widget-form.scss';
import { Box, Button, makeStyles, createStyles, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PageWidget } from '../../../models/layout.model';
import BorderBottomIcon from '@material-ui/icons/BorderBottom';
import BorderRightIcon from '@material-ui/icons/BorderRight';
import BorderLeftIcon from '@material-ui/icons/BorderLeft';
import BorderTopIcon from '@material-ui/icons/BorderTop';
import { ColorPickerComponent } from '../../color-picker-component/color-picker-component';

interface CalendarNewsWidgetFormProps {
  id?: string;
  onSave: (form: any) => void;
  onCancel: () => void;
  calendarNewsWidgetData?: PageWidget;
}

export default function CalendarNewsWidgetForm(
  props: CalendarNewsWidgetFormProps
): JSX.Element {
  const { t, i18n } = useTranslation();
  const [title, setTitle] = useState<
  { [ln: string]: string | undefined } | undefined
>({ en: undefined, nl: undefined });
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
  // const title: { [ln: string]: string } = {
  //   en: 'Calendar News',
  //   nl: 'Calendar News',
  // };
  const [helperText, setHelperText] = useState<string>(" ");
  const [error, setError] = useState<boolean>(false);

  React.useEffect(() => {
    if (props.calendarNewsWidgetData) {
      setTitle(props.calendarNewsWidgetData.title);
      setBackgroundColor(props.calendarNewsWidgetData.backgroundColor);
      setSampleBackgroundColor(
        props.calendarNewsWidgetData.backgroundColor || 'transparent'
      );
      setBorderBottom(props.calendarNewsWidgetData.borderBottom);
      setBorderLeft(props.calendarNewsWidgetData.borderLeft);
      setBorderRight(props.calendarNewsWidgetData.borderRight);
      setBorderTop(props.calendarNewsWidgetData.borderTop);
    }
    // eslint-disable-next-line
  }, []);

  const handleSaveButton = () => {
    let saveCalendarNewsWidget: any = {
      title,
      borderBottom,
      borderLeft,
      borderRight,
      borderTop,
      widgetType: 15,
      backgroundColor,
    };
    if (props.calendarNewsWidgetData) {
      saveCalendarNewsWidget = {
        ...saveCalendarNewsWidget,
        uuid: props.calendarNewsWidgetData.uuid,
        x: props.calendarNewsWidgetData.x,
        y: props.calendarNewsWidgetData.y,
        h: props.calendarNewsWidgetData.h,
        w: props.calendarNewsWidgetData.w,
        minH: props.calendarNewsWidgetData.minH,
        minW: props.calendarNewsWidgetData.minW,
      };
    }
    props.onSave(saveCalendarNewsWidget);
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
      className="calendar-news-widget-body"
      component="form"
      style={{
        display: "flex",
        flexDirection: "column",
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
          onChange={(evt: any) =>
            setTitle({ ...title, [i18n.language]: evt.target.value })
          }
          label={t("banner.title")}
          required
          error={error}
          helperText={helperText}
          InputLabelProps={{ shrink: true }}
          onInput={(e: any) => {
            e.target.setCustomValidity("");
            setError(false);
            setHelperText(" ");
          }}
          onInvalid={(e: any) => {
            e.target.setCustomValidity(
              `${t("banner.title")} ${t(
                "pages.widgetTranslations.errors.isRequired"
              )}`
            );

            setError(true);
            setHelperText(
              `${t("banner.title")} ${t(
                "pages.widgetTranslations.errors.isRequired"
              )}`
            );
          }}
        />
      </Box>
      <Box
        className="form-label-textfield"
        display="flex"
        flexDirection="column"
      >
        <Box flexDirection="row" display="flex" alignItems="flex-end">
          <Box
            flexDirection="column"
            display="flex"
            className="form-label-textfield"
          >
            <span>{t('taxonomy.backgroundColor')}</span>
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
        <span>{t('taxonomy.border')}</span>
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
          disabled={false}
          onClick={() => handleSaveButton()}
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
