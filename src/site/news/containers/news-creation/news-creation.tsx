import React, { useState } from 'react';
import './news-creation.scss';
import { connect } from 'react-redux';
import { AppState } from '../../../../core/store/store';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';
import { Box, TextField, Button } from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { NewData } from '../../model/news.model';

import htmlToDraft from 'html-to-draftjs';
import ContainerTemplate from '../../../../shared/components/container-template/container-template';
import {
  selectNewDetails,
  selectNewDetailsLoading,
  selectNewDetailsError,
  selectNewDetailsErrorMsg,
} from '../../store/selectors/news-details.selectors';
import {
  loadNewsDetails,
  loadNewsDetailsFailure,
} from '../../store/actions/news-details.actions';
import { createUpdateNew } from '../../services/news.service';
import { AxiosError } from 'axios';

interface NewsCreationProps {
  loadNewsDetails: typeof loadNewsDetails;
  loadNewsDetailsFailure: typeof loadNewsDetailsFailure;
  newData: NewData | undefined;
  loading: boolean;
  error: boolean;
  errorMsg: string;
}

export function NewsCreation(props: NewsCreationProps): JSX.Element {
  const { t } = useTranslation();
  let { portalUuid } = useParams<{ portalUuid: string }>();
  let history = useHistory();

  const [newData, setNewData] = useState<NewData>({
    title: '',
    image: undefined,
    eventDate: undefined,
    visibleOn: new Date(),
    hideOn: undefined,
    description: '<span></span>',
  });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [imageName, setImageName] = useState<string>();

  React.useEffect(() => {
    if (props.newData) {
      setNewData(props.newData);
      const contentState = ContentState.createFromBlockArray(
        htmlToDraft(props.newData.description).contentBlocks
      );

      setEditorState(EditorState.createWithContent(contentState));
    }
    // eslint-disable-next-line
  }, []);

  const handleNewsChanges = (key: string, value: any) => {
    setNewData({ ...newData, [key]: value });
  };

  const saveEdit = () => {
    const createNew: NewData = {
      ...newData,
      portalUuid,
    };
    props.loadNewsDetails();
    createUpdateNew(createNew)
      .then((result: any) => {
        history.push(`/site/${portalUuid}/news/${result.data.uuid}`);
      })
      .catch((error: AxiosError) =>
        props.loadNewsDetailsFailure(error.response?.data.errorMessage)
      );
  };

  const setImageBase64 = (key: string, file: File) => {
    setImageName(file.name);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      handleNewsChanges(key, reader.result);
    };
  };

  const handleEditorChange = (evt: any) => {
    setNewData({
      ...newData,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
    setEditorState(evt);
  };

  const cancelEdit = () => {
    history.push(`/site/${portalUuid}/news`);
  };

  return (
    <ContainerTemplate
      loading={props.loading}
      error={props.error}
      errorMsg={props.errorMsg}
    >
      <Box flex={1} className="new-creation-body" flexDirection="column">
        <span>{t('news.addNews')}</span>
        <Box className="title-container" flex={1}>
          <span>{t('news.titleField')}</span>
          <TextField
            id="new-title"
            className="form-textfield"
            variant="outlined"
            value={newData.title}
            onChange={(evt: any) =>
              handleNewsChanges('title', evt.target.value)
            }
          />
        </Box>

        <Box className="image-container">
          <input
            accept=".png, .jpg, .jpeg"
            id="news-logo-button-file"
            type="file"
            style={{ display: 'none' }}
            onChange={(evt: any) =>
              setImageBase64('image', evt.target.files[0])
            }
          />
          <label htmlFor="news-logo-button-file">
            <Button
              className="main-blue-button"
              variant="contained"
              component="span"
            >
              {t('buttons.addImage')}
            </Button>
          </label>

          <span id="image-name">{imageName}</span>
        </Box>
        {newData?.image ? (
            <div
              id="settings-logo"
              data-cy="logo"
              className="size-helper"
              style={{
                width: "308px",
                height: "216px",
                backgroundImage: `url("${newData?.image}")`,
              }}
            ></div>
          ) : (
            <div className="size-helper" style={{width:'308px',height:'216px'}} data-cy="logo">
              <p className="preview-image-size">308x216 px</p>
            </div>
          )}
        <Box
          className="date-container"
          display="flex"
          flex={1}
          flexDirection="row"
        >
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Box display="flex" flexDirection="column" className="date-picker">
              <span>{t('news.eventDate')}</span>
              <KeyboardDatePicker
                id="picker1"
                disableToolbar
                variant="inline"
                format="DD/MM/YYYY"
                value={newData.eventDate || ''}
                invalidDateMessage=""
                onChange={(evt: any) => {
                  handleNewsChanges('eventDate', evt);
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Box>
            <Box display="flex" flexDirection="column" className="date-picker">
              <span>{t('news.visibleOn')}</span>
              <KeyboardDatePicker
                id="picker2"
                disableToolbar
                variant="inline"
                format="DD/MM/YYYY"
                value={newData.visibleOn}
                onChange={(evt: any) => {
                  handleNewsChanges('visibleOn', evt);
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Box>
            <Box display="flex" flexDirection="column" className="date-picker">
              <span>{t('news.hideDate')}</span>
              <KeyboardDatePicker
                id="picker3"
                disableToolbar
                variant="inline"
                format="DD/MM/YYYY"
                value={newData.hideOn || ''}
                invalidDateMessage=""
                onChange={(evt: any) => {
                  handleNewsChanges('hideOn', evt);
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Box>
          </MuiPickersUtilsProvider>
        </Box>
        <Box className="editor-container" flexDirection="row">
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={(evt: any) => handleEditorChange(evt)}
            toolbar={{
              options: [
                'inline',
                'blockType',
                'list',
                'colorPicker',
                'link',
                'emoji',
                'remove',
                'history',
              ],
              inline: {
                inDropdown: false,
                options: ['bold', 'italic', 'underline'],
              },
            }}
          />
        </Box>
        <Box className="newsActions" display="flex" flexDirection="row-reverse">
          <Button
            disabled={!(newData.title && newData.visibleOn)}
            id="save-button"
            onClick={() => saveEdit()}
          >
            {t('buttons.save')}
          </Button>
          <Button id="cancel-button" onClick={() => cancelEdit()}>
            {t('buttons.cancel')}
          </Button>
        </Box>
      </Box>
    </ContainerTemplate>
  );
}

const mapStateToProps = (state: AppState) => ({
  newData: selectNewDetails(state),
  loading: selectNewDetailsLoading(state),
  error: selectNewDetailsError(state),
  errorMsg: selectNewDetailsErrorMsg(state),
});

export default connect(mapStateToProps, {
  loadNewsDetails,
  loadNewsDetailsFailure,
})(NewsCreation);
