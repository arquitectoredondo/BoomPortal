import React from 'react';
import './menu-selector.scss';
import {
  RootRef,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Switch,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faBars,
  faPlus,
  faPen,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { HeaderMenu, MenuHomePage } from '../../models/menuItem.model';

interface MenuSelector {
  items: HeaderMenu[] | undefined;
  homepage: MenuHomePage | undefined;
  handleChanges?: (key: string, value: any) => void;
  catalogAsHomePage?: boolean | undefined;
  onReorderItems: (list: any, startIndex: number, endIndex: number) => void;
  onDeleteItem: (id: string) => void;
  onEditItem: (id: string) => void;
  onAddItem: () => void;
  onSelectHomepage: (item: MenuHomePage | undefined) => void;
}

export default function MenuSelector(props: MenuSelector): JSX.Element {
  const { t } = useTranslation();

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    ...draggableStyle,
    ...(isDragging && {
      background: 'rgb(235,235,235)',
    }),
  });

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    props.onReorderItems(
      props.items,
      result.source.index,
      result.destination.index
    );
  };

  return (
    <div className="menu">
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        className="fontSize related-publications"
      >
        {t('settings.catalogAsHomePage')}

        <div>
          <Switch
            data-cy="visibility-button"
            checked={props?.catalogAsHomePage}
            onChange={(evt: any) =>
              props.handleChanges &&
              props.handleChanges('catalogAsHomePage', evt.target.checked)
            }
            color="primary"
          />
        </div>
      </Box>

      {!props?.catalogAsHomePage && (
        <List>
          <ListItem
            data-cy="listItemHomepage"
            className={props.homepage ? 'homepage-item' : 'homepage-required'}
          >
            <FontAwesomeIcon
              className={props.homepage ? '' : 'error-text'}
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
            {props.homepage ? '' : t('placeholders.requiredField')}
          </span>
        </List>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(providedCtx: any) => (
            <RootRef rootRef={providedCtx.innerRef}>
              <List>
                {props.items?.map((item: any, index: any) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id || 'id'}
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
                        <FontAwesomeIcon icon={faBars} />
                        <ListItemText primary={item.label.nl} />
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => props.onEditItem(item.id)}>
                            <FontAwesomeIcon icon={faPen} size="xs" />
                          </IconButton>
                          <IconButton
                            onClick={() => props.onDeleteItem(item.id)}
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
        <ListItem className={props.items? (props.items.length < 7 ? "new-item" : "disabled-item") : "new-item"}>
          <FontAwesomeIcon icon={faBars} />
          <ListItemText
            primary={t('buttons.MaxMenuItems7')}
          />
          <ListItemSecondaryAction>
            <IconButton
              id="add-item-button"
              onClick={() => props.onAddItem()}
              className={props.items? (props.items.length < 7 ? "" : "disabled-item") : ""}
            >
              <FontAwesomeIcon icon={faPlus} size="xs" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}
