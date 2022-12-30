import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { widgetPayloadProp } from "../widgets-translations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import "../../widgets-translations/widgets-translations.scss";
import { useTranslation } from "react-i18next";

export const WidgetWysiwyg = ({
  i,
  label,
  widgetPayload,
  setWidgetPayload,
  languages,
  requiredLanguage,
  required,
  validationRules,
}: any) => {
  const [open, setOpen] = React.useState(false);
  const [editorState, setEditorState] = useState<any>({});
  const { t } = useTranslation();

  let contentState: any = {};

  useEffect(() => {
    Object.keys(contentState).forEach((key, index) => {
      setEditorState((oldState: any) => ({
        ...oldState,
        ...{ [key]: EditorState.createWithContent(contentState[key]) },
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditorChange = (evt: any, ln: string) => {
    setEditorState((oldState: any) => ({ ...oldState, ...{ [ln]: evt } }));
  };

  const handleContentChange = (i: any, ln: string) => {
    setWidgetPayload((oldWidgetPayload: widgetPayloadProp) => ({
      ...oldWidgetPayload,
      [i.uuid]: {
        ...widgetPayload[i.uuid],
        ...{
          text: {
            ...widgetPayload[i.uuid].text,
            ...{
              [ln]: draftToHtml(
                convertToRaw(editorState[ln].getCurrentContent())
              ),
            },
          },
        },
      },
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CustomOption = () => {
    return (
      <FontAwesomeIcon
        onClick={() => {
          handleClickOpen();
        }}
        className="clipboard-icon"
        icon={faClipboard}
      />
    );
  };

  return (
    <Box
      className="layout-dialog-body"
      display="flex"
      flexDirection="row"
      flex={1}
    >
      {languages.map((ln: string, index: number) => {
        contentState[ln] = ContentState.createFromBlockArray(
          htmlToDraft(widgetPayload[i.uuid].text[ln]).contentBlocks
        );
        const uploadCallBack = (file: any) =>
          new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            let img = new Image();
            reader.onload = function () {
              img.src = typeof reader.result == "string" ? reader.result : "";
              resolve({
                data: {
                  link: img.src,
                },
              });
            };
          });

        let value = editorState[ln]
          ? draftToHtml(convertToRaw(editorState[ln].getCurrentContent())) ===
            "<p></p>\n"
            ? ""
            : draftToHtml(convertToRaw(editorState[ln].getCurrentContent()))
          : "";
        let requiredFieldValue = editorState[requiredLanguage]
          ? draftToHtml(
              convertToRaw(editorState[requiredLanguage].getCurrentContent())
            ) === "<p></p>\n"
            ? ""
            : draftToHtml(
                convertToRaw(editorState[requiredLanguage].getCurrentContent())
              )
          : "";

        let rules = validationRules(ln, value, requiredFieldValue);
        let requiredMark =
          (ln === requiredLanguage || rules.type === 2) && required ? "*" : "";
        let error = rules.error;
        let helperText = rules.helperText;
        let validationType = rules.type;
        let validationRequired =
          (ln === requiredLanguage || validationType === 2) && required;
        /*uncomment this condition if you want to prohibit to 
            continue if the other language has content regardless 
            of whether it is required or not.*/
        // ? required
        // : validationType === 2 && requiredFieldValue !== '' && true;

        const ValidationTextField = () => {
          return (
            <>
              <span
                key={Math.floor(Math.random() * (2000 - 1000 + 1) + 1000)}
                style={
                  error
                    ? {
                        color: "red",
                        fontSize: "12px",
                        display: "block",
                        height: "5px",
                      }
                    : {
                        fontSize: "12px",
                        color: "gray",
                        display: "block",
                        height: "5px",
                      }
                }
              >{`${helperText}`}</span>
              <TextField
                key={Math.floor(Math.random() * (2000 - 1000 + 1) + 1000)}
                style={
                  value
                    ? {
                        display: "block",
                        top: "-50px",
                        visibility: "hidden",
                        height: "1px",
                      }
                    : { display: "block", top: "-50px", height: "1px" }
                }
                value={value}
                onInvalid={(e: any) => {
                  e.target.setCustomValidity(helperText);
                }}
                aria-required={validationRequired}
                required={validationRequired}
              />
            </>
          );
        };
        return (
          <Box
            className="widget-translation-editor-container editor-container"
            flexDirection="row"
            flex={1}
            key={index}
          >
            <span
              style={
                error
                  ? { color: "red", fontSize: "12px" }
                  : { fontSize: "12px", color: "gray" }
              }
            >{`${label} (${ln.toUpperCase()})${requiredMark}`}</span>
            {ln === "nl" && (
              <div>
                <Dialog
                  className="copy-dialog"
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {t("pages.widgetTranslations.copyTitle")}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {t("pages.widgetTranslations.copyAlert")}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>
                      {t("pages.widgetTranslations.disagree")}
                    </Button>
                    <Button
                      onClick={() => {
                        handleClose();
                        setEditorState((oldState: any) => ({
                          ...oldState,
                          ...{ en: editorState.nl },
                        }));

                        setWidgetPayload(
                          (oldWidgetPayload: widgetPayloadProp) => ({
                            ...oldWidgetPayload,
                            [i.uuid]: {
                              ...widgetPayload[i.uuid],
                              ...{
                                text: {
                                  ...widgetPayload[i.uuid].text,
                                  ...{
                                    en: draftToHtml(
                                      convertToRaw(
                                        editorState.nl.getCurrentContent()
                                      )
                                    ),
                                  },
                                },
                              },
                            },
                          })
                        );
                      }}
                      autoFocus
                    >
                      {t("pages.widgetTranslations.agree")}
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            )}

            <Editor
              wrapperStyle={
                error ? { border: "2px solid red", borderRadius: "6px" } : {}
              }
              editorState={editorState[ln]}
              onEditorStateChange={(evt: any) => handleEditorChange(evt, ln)}
              onContentStateChange={(evt: any) => handleContentChange(i, ln)}
              toolbarCustomButtons={
                ln === "nl" ? [<CustomOption />] : undefined
              }
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "list",
                  "link",
                  "embedded",
                  "image",
                ],
                image: {
                  urlEnabled: true,
                  uploadEnabled: true,
                  alignmentEnabled: true,
                  uploadCallback: uploadCallBack,
                  previewImage: true,
                  inputAccept:
                    "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                  alt: { present: true, mandatory: false },
                  defaultSize: {
                    height: "auto",
                    width: "500",
                  },
                },
                inline: {
                  inDropdown: false,
                  options: ["bold", "italic", "underline"],
                },
              }}
            />

            <ValidationTextField />
          </Box>
        );
      })}
    </Box>
  );
};
