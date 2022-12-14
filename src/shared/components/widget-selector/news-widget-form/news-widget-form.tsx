import React, { useState } from "react";
import "./news-widget-form.scss";
import {
  Box,
  Button,
  TextField,
  makeStyles,
  createStyles,
  Switch,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { PageWidget } from "../../../models/layout.model";
import BorderBottomIcon from "@material-ui/icons/BorderBottom";
import BorderRightIcon from "@material-ui/icons/BorderRight";
import BorderLeftIcon from "@material-ui/icons/BorderLeft";
import BorderTopIcon from "@material-ui/icons/BorderTop";
import { ColorPickerComponent } from "../../color-picker-component/color-picker-component";

interface NewsWidgetFormProps {
  id?: string;
  onSave: (form: any) => void;
  onCancel: () => void;
  newsWidgetData?: PageWidget;
}

export default function NewsWidgetForm(
  props: NewsWidgetFormProps
): JSX.Element {
  const { t, i18n } = useTranslation();
  const [listView, setListView] = useState<boolean | undefined>(false);
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
    useState<string>("transparent");
  const [helperText, setHelperText] = useState<string>(" ");
  const [error, setError] = useState<boolean>(false);

  React.useEffect(() => {
    if (props.id === "event" && props.newsWidgetData) {
      setListView(props.newsWidgetData.listView);
    }
    if (props.newsWidgetData) {
      setTitle(props.newsWidgetData.title);
      setBorderBottom(props.newsWidgetData.borderBottom);
      setBackgroundColor(props.newsWidgetData.backgroundColor);
      setSampleBackgroundColor(
        props.newsWidgetData.backgroundColor || "transparent"
      );
      setBorderLeft(props.newsWidgetData.borderLeft);
      setBorderRight(props.newsWidgetData.borderRight);
      setBorderTop(props.newsWidgetData.borderTop);
    }
    // eslint-disable-next-line
  }, []);

  const handleSaveButton = () => {
    let saveNewsWidget: any = {
      title: title?.[i18n.language]
        ? title
        : props.id === "event"
        ? t("event.eventTitle")
        : t("event.newsTitle"),
      borderBottom,
      listView: props.id === "event" ? listView : undefined,
      borderLeft,
      borderRight,
      borderTop,
      widgetType: props.id === "event" ? 8 : 9,
      backgroundColor,
    };
    if (props.newsWidgetData) {
      saveNewsWidget = {
        ...saveNewsWidget,
        uuid: props.newsWidgetData.uuid,
        x: props.newsWidgetData.x,
        y: props.newsWidgetData.y,
        h: props.newsWidgetData.h,
        w: props.newsWidgetData.w,
        minH: props.newsWidgetData.minH,
        minW: props.newsWidgetData.minW,
      };
    }
    props.onSave(saveNewsWidget);
  };

  const useStyles = makeStyles(() =>
    createStyles({
      backgroundColorButton: {
        height: 25,
        width: 220,
        background:
          sampleBackgroundColor === "transparent" ||
          sampleBackgroundColor === undefined
            ? "url(/assets/transparent-background.png)"
            : sampleBackgroundColor,
        backgroundSize: "cover",
        borderRadius: 4,
      },
    })
  );
  const classes = useStyles();
  const handleSwitchChange = () => {
    setListView(!listView);
  };

  return (
    <Box
      id={props.id}
      className="news-widget-body"
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
      {props.id === "event" && (
        <Box display="flex" flexDirection="row" justifyContent="flex-end" p={1}>
          <Box p={1}>
            <div className="switch-options">{t("event.calendar")}</div>
          </Box>
          <Box p={1}>
            <Switch
              id="internal-switch"
              checked={listView}
              onChange={handleSwitchChange}
              color="primary"
            />
          </Box>
          <Box p={1}>
            <div className="switch-options">{t("event.list")}</div>
          </Box>
        </Box>
      )}

      <Box
        className="form-label-textfield"
        display="flex"
        flexDirection="column"
      >
        <TextField
          id="text-title"
          value={title?.[i18n.language] || ""}
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
            <span>{t("taxonomy.backgroundColor")}</span>
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
                setBackgroundColor("transparent");
                setSampleBackgroundColor("transparent");
              }}
              disabled={
                backgroundColor === "transparent" ||
                backgroundColor === undefined
                  ? true
                  : false
              }
            >
              {t("buttons.remove")}
            </Button>
          </Box>
        </Box>
        {showBackgroundColor && (
          <ColorPickerComponent
            sampleColor={sampleBackgroundColor}
            setSampleColor={setSampleBackgroundColor}
            color={backgroundColor || "transparent"}
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
        <span>{t("banner.border")}</span>
        <Box display="flex" flexDirection="row">
          <Button id="top-border" onClick={() => setBorderTop(!borderTop)}>
            <BorderTopIcon
              className={borderTop ? "selected-border" : "unselected-border"}
            />
          </Button>
          <Button
            id="right-border"
            onClick={() => setBorderRight(!borderRight)}
          >
            <BorderRightIcon
              className={borderRight ? "selected-border" : "unselected-border"}
            />
          </Button>
          <Button
            id="bottom-border"
            onClick={() => setBorderBottom(!borderBottom)}
          >
            <BorderBottomIcon
              className={borderBottom ? "selected-border" : "unselected-border"}
            />
          </Button>
          <Button id="left-border" onClick={() => setBorderLeft(!borderLeft)}>
            <BorderLeftIcon
              className={borderLeft ? "selected-border" : "unselected-border"}
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
          {t("buttons.save")}
        </Button>
        <Button id="cancel-button" onClick={() => props.onCancel()}>
          {t("buttons.cancel")}
        </Button>
      </Box>
    </Box>
  );
}
