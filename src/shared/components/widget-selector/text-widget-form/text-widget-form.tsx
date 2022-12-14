import React, { useState } from 'react';
import './text-widget-form.scss';
import {
  Box,
  Button,
  TextField,
  makeStyles,
  createStyles,
  Switch,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PageWidget } from '../../../models/layout.model';
import BorderBottomIcon from '@material-ui/icons/BorderBottom';
import BorderRightIcon from '@material-ui/icons/BorderRight';
import BorderLeftIcon from '@material-ui/icons/BorderLeft';
import BorderTopIcon from '@material-ui/icons/BorderTop';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { ColorPickerComponent } from '../../color-picker-component/color-picker-component';

interface TextWidgetFormProps {
  id?: string;
  onSave: (form: any) => void;
  onCancel: () => void;
  textWidgetData?: PageWidget;
}

export default function TextWidgetForm(
  props: TextWidgetFormProps
): JSX.Element {
  const { t, i18n } = useTranslation();
  const [editorState, setEditorState] = useState<{ [ln: string]: any }>({
    nl: EditorState.createEmpty(),
    en: EditorState.createEmpty(),
  });
  const [text, setText] = useState<{ [ln: string]: any }>();
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
  const [videoFormat, setVideoFormat] = useState<boolean | undefined>(false);
  const [error, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>(' ');
  const [value, setValue] = useState<string>('');

  React.useEffect(() => {
    if (value) {
      setError(false);
      setHelperText(' ');
    }
  }, [value]);
  React.useEffect(() => {
    if (props.textWidgetData?.text) {
      setText(props.textWidgetData.text);
      setValue(props.textWidgetData.text?.[i18n.language]);
      const contentState = ContentState.createFromBlockArray(
        htmlToDraft(props.textWidgetData.text?.[i18n.language]).contentBlocks
      );
      setEditorState({
        ...editorState,
        [i18n.language]: EditorState.createWithContent(contentState),
      });
    }
    if (props.textWidgetData) {
      setTitle(props.textWidgetData.title);
      setBackgroundColor(props.textWidgetData.backgroundColor);
      setSampleBackgroundColor(
        props.textWidgetData.backgroundColor || 'transparent'
      );
      setBorderBottom(props.textWidgetData.borderBottom);
      setBorderLeft(props.textWidgetData.borderLeft);
      setBorderRight(props.textWidgetData.borderRight);
      setBorderTop(props.textWidgetData.borderTop);
      setVideoFormat(props.textWidgetData.videoFormat || false);
    }
    // eslint-disable-next-line
  }, []);

  const handleEditorChange = (evt: any) => {
    setEditorState({ ...editorState, [i18n.language]: evt });
  };

  const handleContentChange = (evt: any) => {
    setText({
      ...text,
      [i18n.language]: draftToHtml(
        convertToRaw(editorState[i18n.language].getCurrentContent())
      ),
    });

    setValue(
      editorState[i18n.language]
        ? draftToHtml(
            convertToRaw(editorState[i18n.language].getCurrentContent())
          ) === '<p></p>\n'
          ? ''
          : draftToHtml(
              convertToRaw(editorState[i18n.language].getCurrentContent())
            )
        : ''
    );
  };

  const handleSaveButton = () => {
    let saveTextWidget: any = {
      title,
      text,
      borderBottom,
      borderLeft,
      borderRight,
      borderTop,
      widgetType: 5,
      backgroundColor,
      videoFormat,
    };
    if (props.textWidgetData) {
      saveTextWidget = {
        ...saveTextWidget,
        uuid: props.textWidgetData.uuid,
        x: props.textWidgetData.x,
        y: props.textWidgetData.y,
        h: props.textWidgetData.h,
        w: props.textWidgetData.w,
        minH: props.textWidgetData.minH,
        minW: props.textWidgetData.minW,
      };
    }
    props.onSave(saveTextWidget);
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

  const uploadCallBack = (file: any) =>
    new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      let img = new Image();
      reader.onload = function () {
        img.src = typeof reader.result == 'string' ? reader.result : '';
        resolve({
          data: {
            link: img.src,
          },
        });
      };
    });
  const ValidationTextField = () => (
    <>
      <span
        key={Math.floor(Math.random() * (2000 - 1000 + 1) + 1000)}
        style={
          error
            ? {
                color: 'red',
                fontSize: '12px',
                display: 'block',
                height: '5px',
              }
            : {
                fontSize: '12px',
                color: 'gray',
                display: 'block',
                height: '5px',
              }
        }
      >{`${helperText}`}</span>
      <TextField
        key={Math.floor(Math.random() * (2000 - 1000 + 1) + 1000)}
        id="text-field"
        style={
          value
            ? {
                display: 'block',
                top: '-50px',
                visibility: 'hidden',
                height: '1px',
              }
            : { display: 'block', top: '-50px', height: '1px' }
        }
        value={value}
        onInvalid={(e: any) => {
          e.target.setCustomValidity(
            `${t('banner.text')} ${t(
              'pages.widgetTranslations.errors.isRequired'
            )}`
          );
          setTimeout(() => {
            setError(true);
            setHelperText(
              `${t('banner.text')} ${t(
                'pages.widgetTranslations.errors.isRequired'
              )}`
            );
          }, 1500);
        }}
        aria-required
        required
      />
    </>
  );

  return (
    <Box
      id={props.id}
      className="widget-text-body"
      component="form"
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
      onSubmit={(e) => {
        !error && handleSaveButton();
      }}
    >
      <Box
        className="form-label-textfield"
        display="flex"
        flexDirection="column"
      >
        <Box
          display="flex"
          flexDirection="row"
          flex={1}
          justifyContent="flex-end"
        >
          <Box display="flex" flex={1}></Box>
          <Box display="flex" flexDirection="row" alignItems="center">
            {t('buttons.text')}
            <Switch
              data-cy="visibility-switch"
              checked={videoFormat}
              onChange={() => setVideoFormat(!videoFormat)}
              color="primary"
            />
            {t('buttons.video')}
          </Box>
        </Box>
        <TextField
          id="text-title"
          value={title?.[i18n.language] || ''}
          variant="outlined"
          label={t('banner.title')}
          InputLabelProps={{ shrink: true }}
          onChange={(evt: any) =>
            setTitle({ ...title, [i18n.language]: evt.target.value })
          }
        />
      </Box>

      <Box className="editor-container" flexDirection="row">
        <span
          style={
            error
              ? { color: 'red', fontSize: '12px' }
              : { fontSize: '12px', color: 'gray' }
          }
        >{`${t('banner.text')} *`}</span>
        <Editor
          editorState={editorState[i18n.language]}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={(evt: any) => handleEditorChange(evt)}
          onContentStateChange={(evt: any) => handleContentChange(evt)}
          toolbar={{
            options: [
              'inline',
              'blockType',
              'list',
              'link',
              'embedded',
              'image',
            ],
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,
              uploadCallback: uploadCallBack,
              previewImage: true,
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
              alt: { present: true, mandatory: false },
              defaultSize: {
                height: 'auto',
                width: '500',
              },
            },
            inline: {
              inDropdown: false,
              options: ['bold', 'italic', 'underline'],
            },
          }}
        />
        <ValidationTextField />
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
        className="layout-dialog-actions"
        display="flex"
        flexDirection="row-reverse"
      >
        <Button id="save-button" type="submit">
          {t('buttons.save')}
        </Button>
        <Button id="cancel-button" onClick={() => props.onCancel()}>
          {t('buttons.cancel')}
        </Button>
      </Box>
    </Box>
  );
}
