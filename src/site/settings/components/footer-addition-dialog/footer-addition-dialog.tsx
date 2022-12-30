import React, { useState } from "react";
import "./footer-addition-dialog.scss";
import {
  Box,
  Button,
  DialogProps,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  RootRef,
  SvgIcon,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { retrieveMenuThemes, getPages } from "../../services/settings.service";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  FooterTypeController,
  /*  FooterItem, */
  /* Footer, */
} from "../../../../shared/models/footer.model";
import { ItemTranslations } from "../../../../shared/models/menuItem.model";

interface FooterAdditionDialogProps {
  open: boolean;
  portalUuid: string | undefined;
  onCloseDialog: (menuItem?: any) => void;
  footerItemToEdit?: any;
  isHomepage: boolean;
  setFooterItemToEdit?: any;
  onAddItem: any;
}

export default function FooterAdditionDialog(
  props: FooterAdditionDialogProps
): JSX.Element {
  const { t } = useTranslation();
  const maxWidth: DialogProps["maxWidth"] = "md";

  const [, /* controller */ setController] = useState<number | undefined>(
    props.footerItemToEdit ? props.footerItemToEdit.type : undefined
  );
  const [, /* label */ setLabel] = useState<ItemTranslations>(
    props.footerItemToEdit ? props.footerItemToEdit.label : { en: "", nl: "" }
  );
  const [columnTitle, setColumnTitle] = useState<ItemTranslations>(
    props.footerItemToEdit
      ? props.footerItemToEdit.columnTitle.en
      : { en: "", nl: "" }
  );
  const [pages, setPages] = useState<any[]>([]);
  const [, /* themes */ setThemes] = useState<any[]>([]);
  const [footerColumn, setFooterColumn] = useState<any>(
    props.footerItemToEdit ? props.footerItemToEdit : {}
  );

  const handleCloseDialog = (footerColumn?: any) => {
    props.onCloseDialog(footerColumn);
  };

  React.useEffect(() => {
    retrieveMenuThemes(props.portalUuid).then((result: any) => {
      setThemes(result.data.content);
    });
    if (props.isHomepage) {
      setController(FooterTypeController.PAGE);
      setLabel({ en: "Home", nl: "Home" });
    }
    // eslint-disable-next-line
  }, []);

  const handleSaveButton = () => {
    /* handleCloseDialog(footerColumn); */
    console.log(footerColumn.items.splice(0, 4));
  };

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    ...draggableStyle,
    ...(isDragging && {
      background: "rgb(235,235,235)",
    }),
  });

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
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
        <span>{t("settings.footerItemTitle")}</span>
        <IconButton id="close-button" onClick={() => handleCloseDialog()}>
          <FontAwesomeIcon size="sm" icon={faTimes} />
        </IconButton>
      </Box>
      <Box className="layout-dialog-body" display="flex" flexDirection="column">
        <Box
          className="form-label-textfield"
          display="flex"
          flexDirection="column"
        >
          <span>{t("settings.footerItemLabel")}</span>
          <TextField
            id="label-column-title"
            value={columnTitle.en}
            variant="outlined"
            onChange={(evt: any) =>
              setColumnTitle({
                ...columnTitle,
                nl: evt.target.value,
                en: evt.target.value,
              })
            }
          />
        </Box>
      </Box>
      {/* <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(providedCtx: any) => (
            <RootRef rootRef={providedCtx.innerRef}>
              <List>
                {props.footerItemToEdit?.items.map((item: any, index: any) => (
                  <Draggable
                    key={index}
                    draggableId={index.toString() || "id"}
                    index={index}
                  >
                    {(provided: any, snapshot: any) => (
                      <ListItem
                        className="drag-item"
                        ContainerComponent="li"
                        ContainerProps={{ ref: provided.innerRef }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <SvgIcon {...props} className="icon-dragg">
                          <path d="M5.14289 0H2.28575C1.49691 0 0.857178 0.639732 0.857178 1.42857V4.28571C0.857178 5.07455 1.49691 5.71429 2.28575 5.71429H5.14289C5.93173 5.71429 6.57146 5.07455 6.57146 4.28571V1.42857C6.57146 0.639732 5.93173 0 5.14289 0ZM5.14289 7.14286H2.28575C1.49691 7.14286 0.857178 7.78259 0.857178 8.57143V11.4286C0.857178 12.2174 1.49691 12.8571 2.28575 12.8571H5.14289C5.93173 12.8571 6.57146 12.2174 6.57146 11.4286V8.57143C6.57146 7.78259 5.93173 7.14286 5.14289 7.14286ZM5.14289 14.2857H2.28575C1.49691 14.2857 0.857178 14.9254 0.857178 15.7143V18.5714C0.857178 19.3603 1.49691 20 2.28575 20H5.14289C5.93173 20 6.57146 19.3603 6.57146 18.5714V15.7143C6.57146 14.9254 5.93173 14.2857 5.14289 14.2857ZM13.7143 0H10.8572C10.0683 0 9.42861 0.639732 9.42861 1.42857V4.28571C9.42861 5.07455 10.0683 5.71429 10.8572 5.71429H13.7143C14.5032 5.71429 15.1429 5.07455 15.1429 4.28571V1.42857C15.1429 0.639732 14.5032 0 13.7143 0ZM13.7143 7.14286H10.8572C10.0683 7.14286 9.42861 7.78259 9.42861 8.57143V11.4286C9.42861 12.2174 10.0683 12.8571 10.8572 12.8571H13.7143C14.5032 12.8571 15.1429 12.2174 15.1429 11.4286V8.57143C15.1429 7.78259 14.5032 7.14286 13.7143 7.14286ZM13.7143 14.2857H10.8572C10.0683 14.2857 9.42861 14.9254 9.42861 15.7143V18.5714C9.42861 19.3603 10.0683 20 10.8572 20H13.7143C14.5032 20 15.1429 19.3603 15.1429 18.5714V15.7143C15.1429 14.9254 14.5032 14.2857 13.7143 14.2857Z" />
                        </SvgIcon>
                        {}
                        <Box
                          className="box box-type"
                          display="flex"
                          flexDirection="column"
                          flex={1}
                        >
                          <span className="label-text">
                            {t("settings.footerItemType")}
                          </span>
                          <Select
                            className="select-type"
                            id="menu-controller"
                            value={
                              item.type ? item.type : FooterTypeController.LINK
                            }
                            onChange={(evt: any) => {
                              setFooterColumn({
                                ...footerColumn,
                                items: [
                                  ...footerColumn.items,
                                  (footerColumn.items[index].type =
                                    evt.target.value),
                                ],
                              });
                            }}
                            variant="outlined"
                          >
                            <MenuItem value={FooterTypeController.LINK}>
                              {t("settings.footerEntries.link")}
                            </MenuItem>
                            <MenuItem value={FooterTypeController.PHONE}>
                              {t("settings.footerEntries.phone")}
                            </MenuItem>
                            <MenuItem value={FooterTypeController.EMAIL}>
                              {t("settings.footerEntries.email")}
                            </MenuItem>
                            <MenuItem value={FooterTypeController.PAGE}>
                              {t("settings.footerEntries.page")}
                            </MenuItem>
                          </Select>
                        </Box>
                        <Box
                          className="box box-label"
                          display="flex"
                          flexDirection="column"
                          flex={1}
                        >
                          <span className="label-text">
                            {t("settings.menuItemLabel")}
                          </span>
                          <ListItem className="new-item">
                            <TextField
                              id="footer-label-nl"
                              onChange={(evt: any) => {
                                const value = evt.target.value;

                                setFooterColumn({
                                  ...footerColumn,
                                  items: [
                                    ...footerColumn.items,
                                    (footerColumn.items[index].label = {
                                      en: value,
                                      nl: value,
                                    }),
                                  ],
                                });
                              }}
                              value={item.label.en}
                            />
                          </ListItem>
                        </Box>
                        <Box
                          className="box box-3"
                          display="flex"
                          flexDirection="column"
                          flex={1}
                        >
                          <span className="label-text">
                            {item.type === 0
                              ? "Web URL"
                              : item.type === 1
                              ? "Phone number"
                              : item.type === 2
                              ? "Email address"
                              : item.type === 3
                              ? "Page"
                              : item.type}
                          </span>
                          {item.type === 3 ? (
                            <Select
                              id="menu-pages"
                              className="select-type"
                              value={item.element}
                              onChange={(evt: any) => {
                                setFooterColumn({
                                  ...footerColumn,
                                  items: [
                                    ...footerColumn.items,
                                    (footerColumn.items[index].element =
                                      evt.target.value),
                                  ],
                                });
                              }}
                              variant="outlined"
                            >
                              {(() => {
                                props.portalUuid &&
                                  getPages(props.portalUuid).then(
                                    (result: any) =>
                                      setPages(result.data.content)
                                  );

                                return pages.map((pageItem: any) => {
                                  return (
                                    <MenuItem
                                      value={pageItem.uuid}
                                      key={pageItem.uuid}
                                    >
                                      {pageItem.label}
                                    </MenuItem>
                                  );
                                });
                              })()}
                            </Select>
                          ) : (
                            <ListItem className="new-item">
                              <TextField
                                id="footer-label-nl"
                                onChange={(evt: any) => {
                                  setFooterColumn({
                                    ...footerColumn,
                                    items: [
                                      ...footerColumn.items,
                                      (footerColumn.items[index].element =
                                        evt.target.value),
                                    ],
                                  });
                                }}
                                value={item.element}
                              />
                            </ListItem>
                          )}
                        </Box>
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => console.log(item.id)}>
                            <FontAwesomeIcon icon={faTrash} size="xs" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {providedCtx.placeholder}
              </List>
            </RootRef>
          )}
        </Droppable>
      </DragDropContext> */}
      <List>
        <ListItem>
          <Box
            className="box box-type"
            display="flex"
            flexDirection="column"
            flex={0.25}
          >
            <SvgIcon {...props} className="icon-dragg">
              <path d="M5.14289 0H2.28575C1.49691 0 0.857178 0.639732 0.857178 1.42857V4.28571C0.857178 5.07455 1.49691 5.71429 2.28575 5.71429H5.14289C5.93173 5.71429 6.57146 5.07455 6.57146 4.28571V1.42857C6.57146 0.639732 5.93173 0 5.14289 0ZM5.14289 7.14286H2.28575C1.49691 7.14286 0.857178 7.78259 0.857178 8.57143V11.4286C0.857178 12.2174 1.49691 12.8571 2.28575 12.8571H5.14289C5.93173 12.8571 6.57146 12.2174 6.57146 11.4286V8.57143C6.57146 7.78259 5.93173 7.14286 5.14289 7.14286ZM5.14289 14.2857H2.28575C1.49691 14.2857 0.857178 14.9254 0.857178 15.7143V18.5714C0.857178 19.3603 1.49691 20 2.28575 20H5.14289C5.93173 20 6.57146 19.3603 6.57146 18.5714V15.7143C6.57146 14.9254 5.93173 14.2857 5.14289 14.2857ZM13.7143 0H10.8572C10.0683 0 9.42861 0.639732 9.42861 1.42857V4.28571C9.42861 5.07455 10.0683 5.71429 10.8572 5.71429H13.7143C14.5032 5.71429 15.1429 5.07455 15.1429 4.28571V1.42857C15.1429 0.639732 14.5032 0 13.7143 0ZM13.7143 7.14286H10.8572C10.0683 7.14286 9.42861 7.78259 9.42861 8.57143V11.4286C9.42861 12.2174 10.0683 12.8571 10.8572 12.8571H13.7143C14.5032 12.8571 15.1429 12.2174 15.1429 11.4286V8.57143C15.1429 7.78259 14.5032 7.14286 13.7143 7.14286ZM13.7143 14.2857H10.8572C10.0683 14.2857 9.42861 14.9254 9.42861 15.7143V18.5714C9.42861 19.3603 10.0683 20 10.8572 20H13.7143C14.5032 20 15.1429 19.3603 15.1429 18.5714V15.7143C15.1429 14.9254 14.5032 14.2857 13.7143 14.2857Z" />
            </SvgIcon>
          </Box>
          <Box
            className="box box-type"
            display="flex"
            flexDirection="column"
            flex={1}
          >
            <span className="label-text">{t("settings.footerItemType")}</span>
            <Select
              className="select-type"
              id="menu-controller"
              /* disabled={props.footerItemToEdit.type} */
              value={
                //props.footerItemToEdit.type ? FooterTypeController.PAGE : 5
                "SelectType"
              }
              onChange={(evt: any) => setController(evt.target.value)}
              variant="outlined"
            >
              <MenuItem value={5}>{t("Select type")}</MenuItem>
              <MenuItem value={FooterTypeController.LINK}>
                {t("settings.footerEntries.link")}
              </MenuItem>
              <MenuItem value={FooterTypeController.PHONE}>
                {t("settings.footerEntries.phone")}
              </MenuItem>
              <MenuItem value={FooterTypeController.EMAIL}>
                {t("settings.footerEntries.email")}
              </MenuItem>
              <MenuItem value={FooterTypeController.PAGE}>
                {t("settings.footerEntries.page")}
              </MenuItem>
            </Select>
          </Box>
          <Box
            className="box box-label"
            display="flex"
            flexDirection="column"
            flex={0.9}
          >
            <span className="label-text disabled">
              {t("settings.menuItemLabel")}
            </span>
            <ListItem className="new-item disabled-border">
              <TextField id="footer-label-nl" value="Label" />
            </ListItem>
          </Box>
          <Box display="flex" flexDirection="column" flex={1}></Box>
          <IconButton
            id="add-item-button"
            onClick={() => props.onAddItem()}
            className={
              props.footerItemToEdit
                ? props.footerItemToEdit.length < 4
                  ? ""
                  : "disabled-item"
                : ""
            }
          >
            <FontAwesomeIcon icon={faPlus} size="xs" />
          </IconButton>
        </ListItem>
      </List>

      {/* <List className="last-item">
        <ListItem
          className={
            props.footerItemToEdit
              ? props.footerItemToEdit.columns.length < 4
                ? "new-item"
                : "disabled-item"
              : "new-item"
          }
        >
          <Box
            className="box box-type"
            display="flex"
            flexDirection="column"
            flex={1}
          >
            <span className="label-text">{t("settings.footerItemType")}</span>
            <Select
              className="select-type"
              id="menu-controller"
              disabled={props.footerItemToEdit.type}
              value={
                props.footerItemToEdit.type ? FooterTypeController.PAGE : 5
                
              }
              onChange={(evt: any) => setController(evt.target.value)}
              variant="outlined"
            >
              <MenuItem value={5}>{t("Select type")}</MenuItem>
              <MenuItem value={FooterTypeController.LINK}>
                {t("settings.footerEntries.link")}
              </MenuItem>
              <MenuItem value={FooterTypeController.PHONE}>
                {t("settings.footerEntries.phone")}
              </MenuItem>
              <MenuItem value={FooterTypeController.EMAIL}>
                {t("settings.footerEntries.email")}
              </MenuItem>
              <MenuItem value={FooterTypeController.PAGE}>
                {t("settings.footerEntries.page")}
              </MenuItem>
            </Select>
          </Box>
          <Box
            className="box box-label"
            display="flex"
            flexDirection="column"
            flex={0.9}
          >
            <span className="label-text disabled">
              {t("settings.menuItemLabel")}
            </span>
            <ListItem className="new-item disabled-border">
              <TextField id="footer-label-nl" value="Label" />
            </ListItem>
          </Box>
          <Box display="flex" flexDirection="column" flex={1}></Box>
          <ListItemSecondaryAction>
            <IconButton
              id="add-item-button"
              onClick={() => props.onAddItem()}
              className={
                props.footerItemToEdit
                  ? props.footerItemToEdit.length < 4
                    ? ""
                    : "disabled-item"
                  : ""
              }
            >
              <FontAwesomeIcon icon={faPlus} size="xs" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List> */}
      <Box
        className="layout-dialog-actions"
        display="flex"
        flexDirection="row-reverse"
      >
        <Button
          id="save-button"
          /* disabled={!handleDisableButton()} */
          onClick={() => handleSaveButton()}
        >
          {t("buttons.save")}
        </Button>
        <Button id="cancel-button" onClick={() => handleCloseDialog()}>
          {t("buttons.cancel")}
        </Button>
      </Box>
    </Dialog>
  );
}
