import React from "react";
import "./footer-selector.scss";
import {
  RootRef,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  SvgIcon,
  //Switch,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  /* faBars, */
  faPlus,
  faPen,
  faColumns,
  /*   faHome, */
} from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { /* HeaderMenu, */ MenuHomePage } from "../../models/menuItem.model";

interface FooterSelector {
  footers: any[] | undefined;
  homepage: MenuHomePage | undefined /*
  handleChanges?: (key: string, value: any) => void;
  catalogAsHomePage?: boolean | undefined;*/;
  onReorderItems: (list: any, startIndex: number, endIndex: number) => void;
  /* onDeleteItem: (id: string) => void;
  onEditItem: (id: string) => void;;*/
  onAddItem: () => void;
  onSelectFooterpage: (item: any | undefined) => void;
}

export default function FooterSelector(props: FooterSelector): JSX.Element {
  const { t } = useTranslation();
  /* debugger; */
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

    props.onReorderItems(
      props.footers,
      result.source.index,
      result.destination.index
    );
  };

  return (
    <div className="footer">
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        className="fontSize related-publications"
      >
        {/* {{t("settings.catalogAsHomePage")} */}

        {/* <div>
          <Switch
            data-cy="visibility-button"
            checked={props?.catalogAsHomePage}
            onChange={(evt: any) =>
              props.handleChanges &&
              props.handleChanges("catalogAsHomePage", evt.target.checked)
            }
            color="primary"
          />
        </div> */}
      </Box>

      {/* {!props?.catalogAsHomePage && (
        <List>
          <ListItem
            data-cy="listItemHomepage"
            className={props.homepage ? "homepage-item" : "homepage-required"}
          >
            <FontAwesomeIcon
              className={props.homepage ? "" : "error-text"}
              icon={faHome}
            />
            <ListItemText primary={props.homepage?.label.nl} />
            <ListItemSecondaryAction data-cy="add-homepage">
              <IconButton
                id="select-home-page"
                onClick={() => props.onSelectHomepage(props.homepage)}
              >
                <FontAwesomeIcon icon={faPen} size="xs" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <span className="error-text">
            {props.homepage ? "" : t("placeholders.requiredField")}
          </span>
        </List>
      )} */}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(providedCtx: any) => (
            <RootRef rootRef={providedCtx.innerRef}>
              <List>
                {props.footers?.map((item: any, index: any) => (
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
                        <FontAwesomeIcon icon={faColumns} size="lg" />
                        <ListItemText primary={item.columnTitle.en} />
                        <ListItemSecondaryAction>
                          <IconButton
                            onClick={() => {
                              props.onSelectFooterpage(item);
                            }}
                          >
                            <FontAwesomeIcon icon={faPen} size="xs" />
                          </IconButton>
                          <IconButton
                          // onClick={() => props.onDeleteItem(item.id)}
                          >
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
      </DragDropContext>
      <List>
        <ListItem
          className={
            props.footers
              ? props.footers.length < 4
                ? "new-item"
                : "disabled-item"
              : "new-item"
          }
        >
          <FontAwesomeIcon icon={faColumns} />
          <ListItemText primary={t("buttons.AddColumn")} />
          <ListItemSecondaryAction>
            <IconButton
              id="add-item-button"
              onClick={() => props.onAddItem()}
              className={
                props.footers
                  ? props.footers.length < 4
                    ? ""
                    : "disabled-item"
                  : ""
              }
            >
              <FontAwesomeIcon icon={faPlus} size="xs" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}
