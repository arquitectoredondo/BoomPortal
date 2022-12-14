import React, { useState } from 'react';
import './news-details.scss';
import { connect } from 'react-redux';
import { AppState } from '../../../../core/store/store';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Box, Snackbar } from '@material-ui/core';

import { NewData, NewRelatedPublication } from '../../model/news.model';
import {
  loadNewsDetails,
  loadNewsDetailsSuccess,
  loadNewsDetailsFailure,
  loadNewsTaxonomySuccess,
  loadNewsPublicationsSuccess,
  closeErrorNewsDetails,
} from '../../store/actions/news-details.actions';
import {
  getNewDetails,
  getTaxonomyLowerLevel,
  saveNewDetailsTaxonomy,
  saveNewDetailsPublications,
  publishNewDetails,
  revertNewDetails,
  deleteNews,
} from '../../services/news.service';
import {
  selectNewDetails,
  selectNewDetailsError,
  selectNewDetailsLoading,
  selectNewDetailsErrorMsg,
} from '../../store/selectors/news-details.selectors';
import ContainerTemplate from '../../../../shared/components/container-template/container-template';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import RelatedPublications from '../../components/related-publication/related-publication';
import RelatedTaxonomy from '../../../../shared/components/related-taxonomy/related-taxonomy';
import { AxiosError } from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import ConfirmDialog from '../../../../shared/components/confirm-dialog/confirm-dialog';

export interface NewsDetailsProps {
  loadNewsDetails: typeof loadNewsDetails;
  loadNewsDetailsSuccess: typeof loadNewsDetailsSuccess;
  loadNewsDetailsFailure: typeof loadNewsDetailsFailure;
  loadNewsTaxonomySuccess: typeof loadNewsTaxonomySuccess;
  loadNewsPublicationsSuccess: typeof loadNewsPublicationsSuccess;
  closeErrorNewsDetails: typeof closeErrorNewsDetails;
  newData: NewData | undefined;
  loading: boolean;
  error: boolean;
  errorMsg: string;
}

export function NewsDetails(props: NewsDetailsProps): JSX.Element {
  const { t } = useTranslation();
  let { newId, portalUuid } = useParams<{
    newId: string;
    portalUuid: string;
  }>();
  let history = useHistory();

  const [taxonomyRelated, setTaxonomyRelated] = useState<string[]>([]);
  const [publicationsRelated, setPublicationsRelated] = useState<string[]>([]);

  const openEdit = () => {
    history.push(`/site/${portalUuid}/news/newCreation`);
  };
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  React.useEffect(() => {
    props.loadNewsDetails();
    getNewDetails(newId)
      .then((result: any) => {
        initTaxonomyRelated(result.data.assignedTaxonomies || []);
        initPublicationsRelated(result.data.relatedPublications || []);
        props.loadNewsDetailsSuccess(result.data);
      })
      .catch((error: AxiosError) =>
        props.loadNewsDetailsFailure(error.response?.data.errorMessage)
      ); // eslint-disable-next-line
  }, []);

  const savePublications = (publications: string[]) => {
    props.loadNewsDetails();
    saveNewDetailsPublications(newId, publications)
      .then((result: any) => {
        initPublicationsRelated(result.data);
        props.loadNewsPublicationsSuccess(result.data);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 500) {
          props.loadNewsDetailsFailure('Something went wrong');
        } else {
          props.loadNewsDetailsFailure(error.response?.data.errorMessage);
        }
      });
  };

  const saveTaxonomy = (taxonomy: string[]) => {
    props.loadNewsDetails();
    saveNewDetailsTaxonomy(newId, taxonomy)
      .then((result: any) => {
        initTaxonomyRelated(result.data);
        props.loadNewsTaxonomySuccess(result.data);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 500) {
          props.loadNewsDetailsFailure('Something went wrong');
        } else {
          props.loadNewsDetailsFailure(error.response?.data.errorMessage);
        }
      });
  };

  const initTaxonomyRelated = (assignedTaxonomies: any) => {
    let taxonomySelection: any[] = [];
    assignedTaxonomies.forEach((taxonomy: any) => {
      taxonomySelection.push(getTaxonomyLowerLevel(taxonomy));
    });
    setTaxonomyRelated(taxonomySelection);
  };

  const initPublicationsRelated = (
    assignedPublications: NewRelatedPublication[]
  ) => {
    setPublicationsRelated(
      assignedPublications.map((p: NewRelatedPublication) => p.id)
    );
  };

  const removePublication = (index: number) => {
    const removed: string[] = Array.from(publicationsRelated);
    removed.splice(index, 1);
    savePublications(removed);
  };

  const addPublication = (id: string | undefined) => {
    const added: string[] = Array.from(publicationsRelated);
    added.push(id ? id : '');
    savePublications(added);
  };

  const taxonomyLoop = () => {
    if (props.newData && props.newData.assignedTaxonomies) {
      return props.newData.assignedTaxonomies.map(
        (taxonomy: any, i: number) => (
          <RelatedTaxonomy
            key={`${taxonomy.uuid}-${i}`}
            selectedTaxonomy={taxonomy}
            taxonomyTree={props.newData?.portalTaxonomyTree}
            onRemove={() => removeTaxonomy(i)}
          />
        )
      );
    }
  };

  const removeTaxonomy = (index: number) => {
    const removed: string[] = Array.from(taxonomyRelated);
    removed.splice(index, 1);
    saveTaxonomy(removed);
  };

  const addTaxonomy = (id: string | undefined) => {
    const added: string[] = Array.from(taxonomyRelated);
    added.push(id ? id : '');
    saveTaxonomy(added);
  };

  const publish = () => {
    props.loadNewsDetails();
    publishNewDetails(newId)
      .then((result: any) => {
        initTaxonomyRelated(result.data.assignedTaxonomies);
        initPublicationsRelated(result.data.relatedPublications);
        props.loadNewsDetailsSuccess(result.data);
      })
      .catch((error: AxiosError) => {
        props.closeErrorNewsDetails();
      });
  };

  const revert = () => {
    props.loadNewsDetails();
    revertNewDetails(newId)
      .then((result: any) => {
        initTaxonomyRelated(result.data.assignedTaxonomies);
        initPublicationsRelated(result.data.relatedPublications);
        props.loadNewsDetailsSuccess(result.data);
      })
      .catch((error: AxiosError) =>
        props.loadNewsDetailsFailure(error.response?.data.errorMessage)
      );
  };

  const handleBackButton = () => {
    history.push(`/site/${portalUuid}/news`);
  };

  const closeConfirm = (confirm: boolean) => {
    setOpenConfirm(false);
    if (confirm) {
      props.loadNewsDetails();
      deleteNews(newId).then(handleBackButton);
    }
  };

  return (
    <ContainerTemplate
      loading={props.loading}
      error={false}
      errorMsg={props.errorMsg}
    >
      <Box className="news-details" flexDirection="column" flex={1}>
        <Snackbar
          open={props.error}
          autoHideDuration={6000}
          onClose={() => props.closeErrorNewsDetails()}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            {...props}
            onClose={() => props.closeErrorNewsDetails()}
            severity="error"
          >
            {props.errorMsg}
          </MuiAlert>
        </Snackbar>
        <Box
          className="news-detail-title"
          display="flex"
          flexDirection="row"
          flex={1}
        >
          <span id="title">{props.newData?.title}</span>
          {props.newData?.canRevert && (
            <Button id="revert-button" onClick={() => revert()}>
              {t('buttons.revert')}
            </Button>
          )}

          <Button
            variant="contained"
            className="main-red-button"
            onClick={() => setOpenConfirm(true)}
          >
            {t('buttons.deletePermanent')}
          </Button>
          <ConfirmDialog
            open={openConfirm}
            bodyMessage={t('news.deleteMessage')}
            onClose={closeConfirm}
          />
          <Button id="edit-button" onClick={() => openEdit()}>
            {t('buttons.edit')}
          </Button>
          {/* <Button id="preview-button">{t("buttons.preview")}</Button> */}
          <Button id="publish-button" onClick={() => publish()}>
            {t('buttons.publish')}
          </Button>
        </Box>
        <Box
          className="img-cover"
          style={{
            backgroundImage: `url(${props.newData?.image})`,
            backgroundRepeat: 'false',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></Box>
        <Box
          display="flex"
          className="date-row"
          flexDirection="row"
          justifyContent="space-between"
        >
          <span>
            {t('news.eventDate')}: {props.newData?.eventDate}
          </span>

          <span>
            {t('news.visibleOn')}: {props.newData?.visibleOn}
          </span>
          <span>
            {t('news.hideDate')}: {props.newData?.hideOn}
          </span>
        </Box>
        <div
          dangerouslySetInnerHTML={{
            __html: props.newData
              ? DOMPurify.sanitize(props.newData.description)
              : '',
          }}
        />
        <Box className="taxonomy-title">{t('news.relatedPublications')}</Box>
        <RelatedPublications
          relatedPublications={props.newData?.relatedPublications}
          onAdd={(id: string | undefined) => addPublication(id)}
          onRemove={(i) => removePublication(i)}
        />
        <Box className="taxonomy-title">{t('news.relatedTaxonomies')}</Box>
        <Box>
          {taxonomyLoop()}
          <RelatedTaxonomy
            taxonomyTree={props.newData ? props.newData.portalTaxonomyTree : []}
            onAdd={addTaxonomy}
          />
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
  loadNewsDetailsSuccess,
  loadNewsDetailsFailure,
  loadNewsTaxonomySuccess,
  loadNewsPublicationsSuccess,
  closeErrorNewsDetails,
})(NewsDetails);
