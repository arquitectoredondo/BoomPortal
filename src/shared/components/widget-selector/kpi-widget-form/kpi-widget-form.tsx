import React, { useState } from "react";
import "./kpi-widget-form.scss";
import { Box, Button, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { PageWidget } from "../../../models/layout.model";
import BorderBottomIcon from "@material-ui/icons/BorderBottom";
import BorderRightIcon from "@material-ui/icons/BorderRight";
import BorderLeftIcon from "@material-ui/icons/BorderLeft";
import BorderTopIcon from "@material-ui/icons/BorderTop";

interface KpiWidgetFormProps {
  id?: string;
  onSave: (form: any) => void;
  onCancel: () => void;
  kpiWidgetData?: PageWidget;
}

export default function KpiWidgetForm(props: KpiWidgetFormProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const [title, setTitle] = useState<
    { [ln: string]: string | undefined } | undefined
  >({ en: undefined, nl: undefined });
  const [borderTop, setBorderTop] = useState<boolean>(false);
  const [borderRight, setBorderRight] = useState<boolean>(false);
  const [borderBottom, setBorderBottom] = useState<boolean>(false);
  const [borderLeft, setBorderLeft] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>(" ");
  const [error, setError] = useState<boolean>(false);

  React.useEffect(() => {
    if (props.kpiWidgetData) {
      setTitle(props.kpiWidgetData.title);
      setBorderBottom(props.kpiWidgetData.borderBottom);
      setBorderLeft(props.kpiWidgetData.borderLeft);
      setBorderRight(props.kpiWidgetData.borderRight);
      setBorderTop(props.kpiWidgetData.borderTop);
    }
    // eslint-disable-next-line
  }, []);

  const handleSaveButton = () => {
    let saveKpiWidget: any = {
      title,
      borderBottom,
      borderLeft,
      borderRight,
      borderTop,
      widgetType: 4,
    };
    if (props.kpiWidgetData) {
      saveKpiWidget = {
        ...saveKpiWidget,
        uuid: props.kpiWidgetData.uuid,
        x: props.kpiWidgetData.x,
        y: props.kpiWidgetData.y,
        h: props.kpiWidgetData.h,
        w: props.kpiWidgetData.w,
        minH: props.kpiWidgetData.minH,
        minW: props.kpiWidgetData.minW,
      };
    }
    props.onSave(saveKpiWidget);
  };

  return (
    <Box
      id={props.id}
      className="kpi-widget-body"
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
          onChange={(evt: any) =>
            setTitle({ ...title, [i18n.language]: evt.target.value })
          }
        />
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
