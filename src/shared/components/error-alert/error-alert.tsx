import React from "react";
import "./error-alert.scss";
import { Box, Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

interface ErrorAlertProps {
  errorMsg?: string;
  reload?: boolean;
  onReload?: () => void;
}

export default function ErrorAlert(props: ErrorAlertProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <Box
      className="error-default"
      display="flex"
      flex={1}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <FontAwesomeIcon icon={faHammer} size="5x" />
      <span>{props.errorMsg ? props.errorMsg : t("messages.error")}</span>
      {props.reload && (
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Button className="main-blue-button" onClick={props.onReload}>
            {t("buttons.reload")}
          </Button>
        </Box>
      )}
    </Box>
  );
}
