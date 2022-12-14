import React, { useState } from "react";
import "./search-widget-form.scss";
import {
  Box,
  Button,
  makeStyles,
  createStyles,
  TextField,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { PageWidget } from "../../../models/layout.model";
import BorderBottomIcon from "@material-ui/icons/BorderBottom";
import BorderRightIcon from "@material-ui/icons/BorderRight";
import BorderLeftIcon from "@material-ui/icons/BorderLeft";
import BorderTopIcon from "@material-ui/icons/BorderTop";
import { ColorPickerComponent } from "../../color-picker-component/color-picker-component";

interface SearchWidgetFormProps {
  id?: string;
  onSave: (form: any) => void;
  onCancel: () => void;
  searchWidgetData?: PageWidget;
}

export default function SearchWidgetForm(
  props: SearchWidgetFormProps
): JSX.Element {
  const { t, i18n } = useTranslation();
  const [borderTop, setBorderTop] = useState<boolean>(false);
  const [borderRight, setBorderRight] = useState<boolean>(false);
  const [borderBottom, setBorderBottom] = useState<boolean>(false);
  const [borderLeft, setBorderLeft] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<{ [ln: string]: string }>({
    en: "",
    nl: "",
  });
  const [showBackgroundColor, setShowBackgroundColor] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>(
    undefined
  );
  const [sampleBackgroundColor, setSampleBackgroundColor] =
    useState<string>("transparent");

  React.useEffect(() => {
    if (props.searchWidgetData) {
      setBackgroundColor(props.searchWidgetData.backgroundColor);
      setSampleBackgroundColor(
        props.searchWidgetData.backgroundColor || "transparent"
      );
      setPlaceholder(
        props.searchWidgetData.placeholder || {
          en: "",
          nl: "",
        }
      );
      setBorderBottom(props.searchWidgetData.borderBottom);
      setBorderLeft(props.searchWidgetData.borderLeft);
      setBorderRight(props.searchWidgetData.borderRight);
      setBorderTop(props.searchWidgetData.borderTop);
    }
    // eslint-disable-next-line
  }, []);

  const handleSaveButton = () => {
    let saveTaxonomyWidget: any = {
      borderBottom,
      borderLeft,
      borderRight,
      borderTop,
      widgetType: 3,
      backgroundColor,
      placeholder,
    };
    if (props.searchWidgetData) {
      saveTaxonomyWidget = {
        ...saveTaxonomyWidget,
        uuid: props.searchWidgetData.uuid,
        x: props.searchWidgetData.x,
        y: props.searchWidgetData.y,
        h: props.searchWidgetData.h,
        w: props.searchWidgetData.w,
        minH: props.searchWidgetData.minH,
        minW: props.searchWidgetData.minW,
      };
    }
    props.onSave(saveTaxonomyWidget);
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

  return (
    <Box id={props.id} className="search-widget-body">
      <Box
        className="form-label-textfield"
        display="flex"
        flexDirection="column"
      >
        <TextField
          id="text-title"
          label={t("placeholders.placeholder")}
          InputLabelProps={{ shrink: true }}
          value={placeholder[i18n.language]}
          variant="outlined"
          onChange={(evt: any) =>
            setPlaceholder({
              ...placeholder,
              [i18n.language]: evt.target.value,
            })
          }
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
        <span>{t("taxonomy.border")}</span>
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
        <Button
          id="save-button"
          disabled={false}
          onClick={() => handleSaveButton()}
        >
          {t("buttons.save")}
        </Button>
        <Button id="cancel-button" onClick={() => props.onCancel()}>
          {t("buttons.cancel")}
        </Button>
      </Box>
    </Box>
  );
}
