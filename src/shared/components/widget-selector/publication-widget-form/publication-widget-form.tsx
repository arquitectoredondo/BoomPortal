import React, { useState } from 'react';
import './publication-widget-form.scss';
import {
  Box,
  Button,
  TextField,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PageWidget } from '../../../models/layout.model';
import BorderBottomIcon from '@material-ui/icons/BorderBottom';
import BorderRightIcon from '@material-ui/icons/BorderRight';
import BorderLeftIcon from '@material-ui/icons/BorderLeft';
import BorderTopIcon from '@material-ui/icons/BorderTop';
import SearchBar from '../../search/search-bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisH,
  faEllipsisV,
  faGripVertical,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { Publication } from '../../../../site/catalog/models/portal.catalog.model';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ColorPickerComponent } from '../../color-picker-component/color-picker-component';

interface PublicationWidgetFormProps {
  id?: string;
  onSave: (form: any) => void;
  onCancel: () => void;
  publicationWidgetData?: PageWidget;
}

export default function PublicationWidgetForm(
  props: PublicationWidgetFormProps
): JSX.Element {
  const { t, i18n } = useTranslation();
  let { themeId } = useParams<{ themeId: string }>();

  const [isPortal, setIsPortal] = useState<boolean>(false);
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
  const [publicationsList, setPublicationsList] = useState<
    Publication[] | undefined
  >([]);
  const [titleHelperText, setTitleHelperText] = useState<string>(' ');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [searchBarHelperText, setSearchBarHelperText] = useState<string>(' ');
  const [searchBarError, setSearchBarError] = useState<boolean>(false);

  const reorder = (startIndex: number, endIndex: number) => {
    if (publicationsList) {
      const result = Array.from(publicationsList);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      setPublicationsList(result);
    }
  };

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
    reorder(result.source.index, result.destination.index);
  };

  React.useEffect(() => {
    if (props.publicationWidgetData) {
      setOrientationSwitch(props.publicationWidgetData.display);
      setPublicationsList(props.publicationWidgetData.publications);
      setTitle(props.publicationWidgetData.title);
      setBackgroundColor(props.publicationWidgetData.backgroundColor);
      setSampleBackgroundColor(
        props.publicationWidgetData.backgroundColor || 'transparent'
      );
      setBorderBottom(props.publicationWidgetData.borderBottom);
      setBorderLeft(props.publicationWidgetData.borderLeft);
      setBorderRight(props.publicationWidgetData.borderRight);
      setBorderTop(props.publicationWidgetData.borderTop);
    }
    if (themeId) {
      setIsPortal(false);
    } else {
      setIsPortal(true);
    }
    // eslint-disable-next-line
  }, []);

  const handleSaveButton = () => {
    let savePublicationWidget: any = {
      title,
      borderBottom,
      borderLeft,
      borderRight,
      borderTop,
      widgetType: 2,
      backgroundColor,
      display: orientationSwitch,
      publications: publicationsList,
    };
    if (props.publicationWidgetData) {
      savePublicationWidget = {
        ...savePublicationWidget,
        uuid: props.publicationWidgetData.uuid,
        x: props.publicationWidgetData.x,
        y: props.publicationWidgetData.y,
        h: props.publicationWidgetData.h,
        w: props.publicationWidgetData.w,
        minH: props.publicationWidgetData.minH,
        minW: props.publicationWidgetData.minW,
      };
    }
    props.onSave(savePublicationWidget);
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

  const handleAddPublication = (value: Publication) => {
    setPublicationsList([...(publicationsList ? publicationsList : []), value]);
  };

  const handleDeletePublication = (index: any) => {
    if (publicationsList) {
      let copyPublications = [...publicationsList];
      copyPublications.splice(index, 1);
      setPublicationsList(copyPublications);
    }
  };
  return (
    <Box
      id={props.id}
      className="widget-pubication-body"
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
        className="form-label-textfield switch"
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        p={1}
      >
        <Box flexDirection="column" display="flex">
          <span>{t('publication.display')}</span>
          <ToggleButtonGroup
            value={orientationSwitch}
            exclusive
            onChange={(evt: any, value: any) => setOrientationSwitch(value)}
          >
            <ToggleButton value="horizontal" aria-label="left aligned">
              <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
            </ToggleButton>
            <ToggleButton value="vertical" aria-label="centered">
              <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
            </ToggleButton>
            <ToggleButton value="matrix" aria-label="right aligned">
              <FontAwesomeIcon icon={faGripVertical}></FontAwesomeIcon>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Box
        className="form-label-textfield"
        display="flex"
        flexDirection="column"
      >
        <TextField
          id="text-title"
          value={title?.[i18n.language]}
          variant="outlined"
          label={t('catalogWidget.title')}
          required
          error={titleError}
          helperText={titleHelperText}
          InputLabelProps={{ shrink: true }}
          onInput={(e: any) => {
            e.target.setCustomValidity('');
            setTitleError(false);
            setTitleHelperText(' ');
          }}
          onInvalid={(e: any) => {
            e.target.setCustomValidity(
              `${t('catalogWidget.title')} ${t(
                'pages.widgetTranslations.errors.isRequired'
              )}`
            );

            setTitleError(true);
            setTitleHelperText(
              `${t('catalogWidget.title')} ${t(
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
        className="form-label-textfield search"
        display="flex"
        flexDirection="column"
      >
        <SearchBar
          isPortal={isPortal}
          isWidget={true}
          onAddPublications={handleAddPublication}
          error={searchBarError}
          helperText={searchBarHelperText}
          InputLabelProps={{ shrink: true }}
          onInput={(e: any) => {
            e.target.setCustomValidity('');
            setSearchBarError(false);
            setSearchBarHelperText(' ');
          }}
          onInvalid={(e: any) => {
            e.target.setCustomValidity(
              'You must have at least one publication in the list to save the widget'
            );

            setSearchBarError(true);
            setSearchBarHelperText(
              'You must have at least one publication in the list to save the widget'
            );
          }}
          required={
            publicationsList && publicationsList.length > 0 ? false : true
          }
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {publicationsList &&
                  publicationsList.length > 0 &&
                  publicationsList.map(
                    (publication: Publication, index: any) => (
                      <Draggable
                        key={publication.id}
                        draggableId={publication.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <Box
                              key={index}
                              display="flex"
                              flex-direction="column"
                            >
                              <Box flexGrow={1}>
                                <div
                                  id="publication-title"
                                  className="publication-title"
                                >
                                  {publication.title}
                                </div>
                              </Box>

                              <Box justifyContent="flex-end">
                                <Button
                                  id="deletePublication-button"
                                  onClick={() => handleDeletePublication(index)}
                                >
                                  <FontAwesomeIcon
                                    className="trash-icon"
                                    icon={faTrash}
                                  />
                                </Button>
                              </Box>
                            </Box>
                          </div>
                        )}
                      </Draggable>
                    )
                  )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
        className="form-label-textfield warning-box"
        display="flex"
        flexDirection="column"
      >
        <span>{t('publication.warning')}</span>
      </Box>

      <Box
        className="layout-dialog-actions"
        display="flex"
        flexDirection="row-reverse"
      >
        <Button
          id="save-button"
          type="submit"
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
