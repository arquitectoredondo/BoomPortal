import React, { useState } from 'react';
import './widget-dialog.scss';
import {
  Box,
  DialogProps,
  Dialog,
  IconButton,
  Button,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import WidgetSelector from '../widget-selector/widget-selector';
import BannerWidgetForm from '../banner-widget-form/banner-widget-form';
import TextWidgetForm from '../text-widget-form/text-widget-form';
import { PageWidget } from '../../../models/layout.model';
import TaxonomyWidgetForm from '../taxonomy-widget-form/taxonomy-widget-form';
import NewsWidgetForm from '../news-widget-form/news-widget-form';
import PublicationWidgetForm from '../publication-widget-form/publication-widget-form';
import CatalogWidgetForm from '../catalog-widget-form/catalog-widget-form';
import PromotionWidgetForm from '../promotion-widget-form/promotion-widget-form';
import SearchWidgetForm from '../search-widget-form/search-widget-form';
import ReadOnWidgetForm from '../read-on-widget-form/read-on-widget-form';
import KpiWidgetForm from '../kpi-widget-form/kpi-widget-form';
import MyPublicationsWidgetForm from '../my-publications-widget-form/my-publications-widget-form';
import FavoritesWidgetForm from '../favorites-widget-form/favorites-widget-form';
import CalendarNewsWidgetForm from '../calendar-news-widget-form/calendar-news-widget-form';
import MySubscriptionsWidgetForm from '../my-subscriptions-widget-form/my-subscriptions-widget-form';

interface MenuAdditionDialogProps {
  type: string;
  open: boolean;
  onCloseDialog: () => void;
  onSave: (form: any) => void;
  widgetSelected?: PageWidget;
}

export default function WidgetDialog(
  props: MenuAdditionDialogProps
): JSX.Element {
  const { t } = useTranslation();
  const maxWidth: DialogProps['maxWidth'] = 'sm';
  const [typeSelected, setTypeSelected] = useState('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleCloseDialog = () => {
    props.onCloseDialog();
    setTypeSelected('');
  };

  const handleCloseDialogBackground = () => {
    setOpenConfirmDialog(true);
  };

  const handleDeclineConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleAcceptConfirmDialog = () => {
    setOpenConfirmDialog(false);
    props.onCloseDialog();
    setTypeSelected('');
  };

  const handleSave = (form: any) => {
    props.onSave(form);
    setTypeSelected('');
  };

  React.useEffect(() => {
    setTypeSelected(
      props.widgetSelected ? props.widgetSelected.widgetType.toString() : ''
    );
  }, [props.widgetSelected]);

  const renderSwitch = () => {
    switch (typeSelected) {
      case '1': {
        return (
          <CatalogWidgetForm
            id="catalog"
            onSave={handleSave}
            onCancel={() => handleCloseDialog()}
            catalogWidgetData={
              props.widgetSelected ? props.widgetSelected : undefined
            }
          />
        );
      }
      case '2': {
        return (
          <PublicationWidgetForm
            id="publication"
            onSave={handleSave}
            onCancel={() => handleCloseDialog()}
            publicationWidgetData={
              props.widgetSelected ? props.widgetSelected : undefined
            }
          />
        );
      }

      case '3': {
        return (
          <SearchWidgetForm
            id="search"
            onSave={handleSave}
            onCancel={() => handleCloseDialog()}
            searchWidgetData={
              props.widgetSelected ? props.widgetSelected : undefined
            }
          />
        );
      }

      case '4': {
        return (
          <KpiWidgetForm
            id="kpi"
            onSave={handleSave}
            onCancel={() => handleCloseDialog()}
            kpiWidgetData={
              props.widgetSelected ? props.widgetSelected : undefined
            }
          />
        );
      }
      
      case '5': {
        return (
          <TextWidgetForm
            id="text"
            onSave={handleSave}
            onCancel={() => handleCloseDialog()}
            textWidgetData={
              props.widgetSelected ? props.widgetSelected : undefined
            }
          />
        );
      }

      case '6': {
        return (
          <BannerWidgetForm
            id="banner"
            type={props.type}
            onSave={handleSave}
            onCancel={() => handleCloseDialog()}
            bannerData={props.widgetSelected ? props.widgetSelected : undefined}
          />
        );
      }

      case '7': {
        return (
          <TaxonomyWidgetForm
            id="taxonomy"
            onSave={handleSave}
            onCancel={() => handleCloseDialog()}
            taxonomyWidgetData={
              props.widgetSelected ? props.widgetSelected : undefined
            }
          />
        );
      }

      case '8': {
        return (
          <NewsWidgetForm
            id="event"
            onSave={handleSave}
            onCancel={() => handleCloseDialog()}
            newsWidgetData={
              props.widgetSelected ? props.widgetSelected : undefined
            }
          />
        );
      }

      case '9': {
        return (
          <NewsWidgetForm
            id="news"
            onSave={handleSave}
            onCancel={() => handleCloseDialog()}
            newsWidgetData={
              props.widgetSelected ? props.widgetSelected : undefined
            }
          />
        );
      }

      case '10': {
        return (
          <ReadOnWidgetForm
            id="readOn"
            onSave={handleSave}
            onCancel={() => handleCloseDialog()}
            readOnWidgetData={
              props.widgetSelected ? props.widgetSelected : undefined
            }
          />
        );
      }

      case '11': {
        return (
          <PromotionWidgetForm
            id="promotion"
            onSave={handleSave}
            onCancel={() => handleCloseDialog()}
            promotionWidgetData={
              props.widgetSelected ? props.widgetSelected : undefined
            }
          />
        );
      }

      case '12': {
        return (
          <MyPublicationsWidgetForm
            id="my-publications"
            onSave={handleSave}
            onCancel={() => handleCloseDialog()}
            myPublicationsWidgetData={
              props.widgetSelected ? props.widgetSelected : undefined
            }
          />
        );
      }

      case '13': {
        return (
          <FavoritesWidgetForm
            id="favorites"
            onSave={handleSave}
            onCancel={() => handleCloseDialog()}
            favoritesWidgetData={
              props.widgetSelected ? props.widgetSelected : undefined
            }
          />
        );
      }

      case '14': {
        return (
          <MySubscriptionsWidgetForm
            id="my-subscriptions"
            onSave={handleSave}
            onCancel={() => handleCloseDialog()}
            mySubscriptionsWidgetData={
              props.widgetSelected ? props.widgetSelected : undefined
            }
          />
        );
      }

      case '15': {
        return (
          <CalendarNewsWidgetForm
            id="calendar-news"
            onSave={handleSave}
            onCancel={() => handleCloseDialog()}
            calendarNewsWidgetData={
              props.widgetSelected ? props.widgetSelected : undefined
            }
          />
        );
      }

      default: {
        return (
          <WidgetSelector
            onTypeSelected={(type: string) => setTypeSelected(type)}
            type={props.type}
          />
        );
      }
    }
  };
  const renderDialogTitle = () => {
    switch (typeSelected) {
      case '1': {
        return <span>{t('widgets.title.catalog')}</span>;
      }
      case '2': {
        return <span>{t('widgets.title.publications')}</span>;
      }
      case '3': {
        return <span>{t('widgets.title.search')}</span>;
      }
      case '4': {
        return <span>{t('widgets.title.kpi')}</span>;
      }
      case '5': {
        return <span>{t('widgets.title.text')}</span>;
      }

      case '6': {
        return <span>{t('widgets.title.banner')}</span>;
      }

      case '7': {
        return <span>{t('widgets.title.taxonomy')}</span>;
      }

      case '8': {
        return <span>{t('widgets.title.events')}</span>;
      }

      case '9': {
        return <span>{t('widgets.title.news')}</span>;
      }

      case '10': {
        return <span>{t('widgets.title.readOn')}</span>;
      }

      case '11': {
        return <span>{t('widgets.title.promotion')}</span>;
      }

      case '12': {
        return <span>{t('widgets.title.myPublications')}</span>;
      }

      case '13': {
        return <span>{t('widgets.title.favorites')}</span>;
      }

      case '14': {
        return <span>{t('widgets.title.mySubscriptions')}</span>;
      }

      case '15': {
        return <span>{t('widgets.title.calendarNews')}</span>;
      }

      default: {
        return <span>{t('widgets.title.select')}</span>;
      }
    }
  };

  return (
    <>
      <Dialog
        id="main-dialog"
        className="layout-dialog"
        fullWidth={true}
        maxWidth={maxWidth}
        open={props.open}
        onClose={() => handleCloseDialogBackground()}
      >
        <Box
          className="layout-dialog-title"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          {renderDialogTitle()}
          <IconButton id="close-button" onClick={() => handleCloseDialog()}>
            <FontAwesomeIcon size="sm" icon={faTimes} />
          </IconButton>
        </Box>
        {renderSwitch()}
      </Dialog>

      <Dialog
        id="confirm-dialog"
        className="confirm-dialog"
        open={openConfirmDialog}
        disableBackdropClick={true}
      >
        <DialogTitle>
          {'Are you sure to close the widget?'}
          <br />
          {'All changes will be lost'}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => handleAcceptConfirmDialog()}
            className="main-green-button"
          >
            Yes
          </Button>
          <Button
            onClick={() => handleDeclineConfirmDialog()}
            className="main-red-button"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
