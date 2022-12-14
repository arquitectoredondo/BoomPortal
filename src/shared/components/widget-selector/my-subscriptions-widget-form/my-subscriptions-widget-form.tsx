import React, { useState } from 'react';
import './my-subscriptions-widget-form.scss';
import {
  Box,
  Button,
  makeStyles,
  createStyles,
  TextField,
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

interface MySubscriptionsWidgetFormProps {
  id?: string;
  onSave: (form: any) => void;
  onCancel: () => void;
  mySubscriptionsWidgetData?: PageWidget;
}

export default function MySubscriptionsWidgetForm(
  props: MySubscriptionsWidgetFormProps
): JSX.Element {
  const { t, i18n } = useTranslation();

  //editor state logic
  const [editorState, setEditorState] = useState<{ [ln: string]: any }>({
    nl: EditorState.createEmpty(),
    en: EditorState.createEmpty(),
  });
  //
  const [title, setTitle] = useState<
    { [ln: string]: string | undefined } | undefined
  >({ en: undefined, nl: undefined });
  const [text, setText] = useState<
    { [ln: string]: string | undefined } | undefined
  >({ en: undefined, nl: undefined });

  //const [text, setText] = useState<{ [ln: string]: any }>();

  const [titleNotLogged, setTitleNotLogged] = useState<
    { [ln: string]: string | undefined } | undefined
  >({ en: undefined, nl: undefined });
  const [noAvailableSubscriptions, setNoAvailableSubscriptions] = useState<
    { [ln: string]: string | undefined } | undefined
  >({ en: undefined, nl: undefined });
  const [catalogLink, setCatalogLink] = useState<
    { [ln: string]: string | undefined } | undefined
  >({ en: undefined, nl: undefined });
  const [activationTitle, setActivationTitle] = useState<
    { [ln: string]: string | undefined } | undefined
  >({ en: undefined, nl: undefined });
  const [activationDescription, setActivationDescription] = useState<
    { [ln: string]: string | undefined } | undefined
  >({ en: undefined, nl: undefined });
  const [activationFieldPlaceholder, setActivationFieldPlaceholder] = useState<
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

  const [titleHelperText, setTitleHelperText] = useState<string>(' ');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [textHelperText, setTextHelperText] = useState<string>(' ');
  const [textError, setTextError] = useState<boolean>(false);
  const [titleNotLoggedHelperText, setTitleNotLoggedHelperText] =
    useState<string>(' ');
  const [titleNotLoggedError, setTitleNotLoggedError] =
    useState<boolean>(false);
  const [
    noAvailableSubscriptionsHelperText,
    setNoAvailableSubscriptionsHelperText,
  ] = useState<string>(' ');
  const [noAvailableSubscriptionsError, setNoAvailableSubscriptionsError] =
    useState<boolean>(false);
  const [activationDescriptionHelperText, setActivationDescriptionHelperText] =
    useState<string>(' ');
  const [activationDescriptionError, setActivationDescriptionError] =
    useState<boolean>(false);
  const [
    activationFieldPlaceholderHelperText,
    setActivationFieldPlaceholderHelperText,
  ] = useState<string>(' ');
  const [activationFieldPlaceholderError, setActivationFieldPlaceholderError] =
    useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>('');

  React.useEffect(() => {
    if (value) {
      setTextError(false);
      setTextHelperText(' ');
    }
  }, [value]);

  React.useEffect(() => {
    setText(
      props.mySubscriptionsWidgetData?.text || {
        [i18n.language]: t('mySubscriptions.text.defaultValue'),
      }
    );
    setValue(
      (props.mySubscriptionsWidgetData?.text || {
        [i18n.language]: t('mySubscriptions.text.defaultValue'),
      })[i18n.language]
    );
    const contentState = ContentState.createFromBlockArray(
      htmlToDraft(
        props.mySubscriptionsWidgetData?.text?.[i18n.language] ||
          t('mySubscriptions.text.defaultValue')
      ).contentBlocks
    );
    setEditorState({
      ...editorState,
      [i18n.language]: EditorState.createWithContent(contentState),
    });

    if (props.mySubscriptionsWidgetData) {
      setTitle(props.mySubscriptionsWidgetData.title);
      setText(props.mySubscriptionsWidgetData.text);
      setValue(props.mySubscriptionsWidgetData.text?.[i18n.language]);
      setTitleNotLogged(props.mySubscriptionsWidgetData.titleNotLogged);
      setNoAvailableSubscriptions(
        props.mySubscriptionsWidgetData.noAvailableSubscriptions
      );
      setCatalogLink(props.mySubscriptionsWidgetData.catalogLink);
      setActivationTitle(props.mySubscriptionsWidgetData.activationTitle);
      setActivationDescription(
        props.mySubscriptionsWidgetData.activationDescription
      );
      setActivationFieldPlaceholder(
        props.mySubscriptionsWidgetData.activationFieldPlaceholder
      );
      setBackgroundColor(props.mySubscriptionsWidgetData.backgroundColor);
      setSampleBackgroundColor(
        props.mySubscriptionsWidgetData.backgroundColor || 'transparent'
      );
      setBorderBottom(props.mySubscriptionsWidgetData.borderBottom);
      setBorderLeft(props.mySubscriptionsWidgetData.borderLeft);
      setBorderRight(props.mySubscriptionsWidgetData.borderRight);
      setBorderTop(props.mySubscriptionsWidgetData.borderTop);
    } else {
      //mySubscriptions.title
      setTitle({
        [i18n.language]: t('mySubscriptions.title.defaultValue'),
      });
      setText({
        [i18n.language]: t('mySubscriptions.text.defaultValue'),
      });
      setValue(t('mySubscriptions.text.defaultValue'));
      setTitleNotLogged({
        [i18n.language]: t('mySubscriptions.titleNotLogged.defaultValue'),
      });
      setNoAvailableSubscriptions({
        [i18n.language]: t(
          'mySubscriptions.noAvailableSubscriptions.defaultValue'
        ),
      });
      setCatalogLink({
        [i18n.language]: t('mySubscriptions.catalogLink.defaultValue'),
      });
      setActivationTitle({
        [i18n.language]: t('mySubscriptions.activationTitle.defaultValue'),
      });
      setActivationDescription({
        [i18n.language]: t(
          'mySubscriptions.activationDescription.defaultValue'
        ),
      });
      setActivationFieldPlaceholder({
        [i18n.language]: t(
          'mySubscriptions.activationFieldPlaceholder.defaultValue'
        ),
      });
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
    let savemySubscriptionsWidget: any = {
      title,
      text,
      titleNotLogged,
      noAvailableSubscriptions,
      catalogLink,
      activationTitle,
      activationDescription,
      activationFieldPlaceholder,
      borderBottom,
      borderLeft,
      borderRight,
      borderTop,
      widgetType: 14,
      backgroundColor,
    };
    if (props.mySubscriptionsWidgetData) {
      savemySubscriptionsWidget = {
        ...savemySubscriptionsWidget,
        uuid: props.mySubscriptionsWidgetData.uuid,
        x: props.mySubscriptionsWidgetData.x,
        y: props.mySubscriptionsWidgetData.y,
        h: props.mySubscriptionsWidgetData.h,
        w: props.mySubscriptionsWidgetData.w,
        minH: props.mySubscriptionsWidgetData.minH,
        minW: props.mySubscriptionsWidgetData.minW,
      };
    }
    props.onSave(savemySubscriptionsWidget);
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

  const ValidationTextField = () => (
    <>
      <span
        key={Math.floor(Math.random() * (2000 - 1000 + 1) + 1000)}
        style={
          textError
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
      >{`${textHelperText}`}</span>
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
        value={value || ''}
        onInvalid={(e: any) => {
          e.target.setCustomValidity(
            `${t('banner.text')} ${t(
              'pages.widgetTranslations.errors.isRequired'
            )}`
          );
          setTimeout(() => {
            setTextError(true);
            setTextHelperText(
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
      className="my-subscriptions-widget-body"
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
        className="form-label-textfield"
        display="flex"
        flexDirection="column"
      >
        <span className="title">{t('mySubscriptions.loggedOut.title')}</span>
        <span>{t('mySubscriptions.loggedOut.message')}</span>
      </Box>
      <Box
        className="form-label-textfield"
        display="flex"
        flexDirection="column"
      >
        <TextField
          id="text-title-not-logged"
          value={titleNotLogged?.[i18n.language] || ''}
          variant="outlined"
          label={t('mySubscriptions.titleNotLogged.title')}
          required
          error={titleNotLoggedError}
          helperText={titleNotLoggedHelperText}
          InputLabelProps={{ shrink: true }}
          onInput={(e: any) => {
            e.target.setCustomValidity('');
            setTitleNotLoggedError(false);
            setTitleNotLoggedHelperText(' ');
          }}
          onInvalid={(e: any) => {
            e.target.setCustomValidity(
              `${t('mySubscriptions.titleNotLogged.title')} ${t(
                'pages.widgetTranslations.errors.isRequired'
              )}`
            );

            setTitleNotLoggedError(true);
            setTitleNotLoggedHelperText(
              `${t('mySubscriptions.titleNotLogged.title')} ${t(
                'pages.widgetTranslations.errors.isRequired'
              )}`
            );
          }}
          onChange={(evt: any) =>
            setTitleNotLogged({
              ...titleNotLogged,
              [i18n.language]: evt.target.value,
            })
          }
        />
      </Box>

      <Box className="editor-container-text" flexDirection="row">
        <span
          style={
            textError
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
            options: ['inline', 'blockType', 'list', 'link', 'embedded'],

            inline: {
              inDropdown: false,
              options: ['bold', 'italic', 'underline'],
            },
          }}
        />
        <ValidationTextField />
      </Box>

      <Box
        className="form-label-textfield"
        display="flex"
        flexDirection="column"
        style={{ marginTop: '3em' }}
      >
        <span className="title">{t('mySubscriptions.loggedIn.title')}</span>
        <span>{t('mySubscriptions.loggedIn.message')}</span>
      </Box>

      <Box
        className="form-label-textfield"
        display="flex"
        flexDirection="column"
      >
        <TextField
          id="text-title"
          value={title?.[i18n.language] || ''}
          variant="outlined"
          label={t('mySubscriptions.title.title')}
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
              `${t('mySubscriptions.title.title')} ${t(
                'pages.widgetTranslations.errors.isRequired'
              )}`
            );

            setTitleError(true);
            setTitleHelperText(
              `${t('mySubscriptions.title.title')} ${t(
                'pages.widgetTranslations.errors.isRequired'
              )}`
            );
          }}
          onChange={(evt: any) =>
            setTitle({
              ...title,
              [i18n.language]: evt.target.value,
            })
          }
        />
      </Box>

      <Box
        className="form-label-textfield"
        display="flex"
        flexDirection="column"
      >
        <TextField
          id="text-no-available-subscriptions"
          value={noAvailableSubscriptions?.[i18n.language] || ''}
          variant="outlined"
          label={t('mySubscriptions.noAvailableSubscriptions.title')}
          required
          error={noAvailableSubscriptionsError}
          helperText={noAvailableSubscriptionsHelperText}
          InputLabelProps={{ shrink: true }}
          onInput={(e: any) => {
            e.target.setCustomValidity('');
            setNoAvailableSubscriptionsError(false);
            setNoAvailableSubscriptionsHelperText(' ');
          }}
          onInvalid={(e: any) => {
            e.target.setCustomValidity(
              `${t('mySubscriptions.noAvailableSubscriptions.title')} ${t(
                'pages.widgetTranslations.errors.isRequired'
              )}`
            );

            setNoAvailableSubscriptionsError(true);
            setNoAvailableSubscriptionsHelperText(
              `${t('mySubscriptions.noAvailableSubscriptions.title')} ${t(
                'pages.widgetTranslations.errors.isRequired'
              )}`
            );
          }}
          onChange={(evt: any) =>
            setNoAvailableSubscriptions({
              ...noAvailableSubscriptions,
              [i18n.language]: evt.target.value,
            })
          }
        />
      </Box>

      <Box
        className="form-label-textfield"
        display="flex"
        flexDirection="column"
      >
        <TextField
          id="text-activation-description"
          value={activationDescription?.[i18n.language] || ''}
          variant="outlined"
          label={t('mySubscriptions.activationDescription.title')}
          required
          error={activationDescriptionError}
          helperText={activationDescriptionHelperText}
          InputLabelProps={{ shrink: true }}
          onInput={(e: any) => {
            e.target.setCustomValidity('');
            setActivationDescriptionError(false);
            setActivationDescriptionHelperText(' ');
          }}
          onInvalid={(e: any) => {
            e.target.setCustomValidity(
              `${t('mySubscriptions.activationDescription.title')} ${t(
                'pages.widgetTranslations.errors.isRequired'
              )}`
            );

            setActivationDescriptionError(true);
            setActivationDescriptionHelperText(
              `${t('mySubscriptions.activationDescription.title')} ${t(
                'pages.widgetTranslations.errors.isRequired'
              )}`
            );
          }}
          onChange={(evt: any) =>
            setActivationDescription({
              ...activationDescription,
              [i18n.language]: evt.target.value,
            })
          }
        />
      </Box>

      <Box
        className="form-label-textfield"
        display="flex"
        flexDirection="column"
      >
        <TextField
          id="text-activation-field-placeholder"
          value={activationFieldPlaceholder?.[i18n.language] || ''}
          variant="outlined"
          label={t('myPublications.activationFieldPlaceholder.title')}
          required
          error={activationFieldPlaceholderError}
          helperText={activationFieldPlaceholderHelperText}
          InputLabelProps={{ shrink: true }}
          onInput={(e: any) => {
            e.target.setCustomValidity('');
            setActivationFieldPlaceholderError(false);
            setActivationFieldPlaceholderHelperText(' ');
          }}
          onInvalid={(e: any) => {
            e.target.setCustomValidity(
              `${t('myPublications.activationFieldPlaceholder.title')} ${t(
                'pages.widgetTranslations.errors.isRequired'
              )}`
            );

            setActivationFieldPlaceholderError(true);
            setActivationFieldPlaceholderHelperText(
              `${t('myPublications.activationFieldPlaceholder.title')} ${t(
                'pages.widgetTranslations.errors.isRequired'
              )}`
            );
          }}
          onChange={(evt: any) =>
            setActivationFieldPlaceholder({
              ...activationFieldPlaceholder,
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
            <span>{t('mySubscriptions.backgroundColor')}</span>
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
        <span>{t('mySubscriptions.border')}</span>
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
