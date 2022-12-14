import React from 'react';
import './widget-selector.scss';
import { Box } from '@material-ui/core';
import {
  faClone,
  faSearch,
  faImage,
  faAlignJustify,
  faChartBar,
  faNewspaper,
  faCalendarAlt,
  faFileAlt,
  faBookReader,
  faRocket,
  faUserCircle,
  faStar,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import WidgetButton from '../widget-button/widget-button';

interface MenuAdditionDialogProps {
  onTypeSelected: (type: string) => void;
  type: string;
}

export default function WidgetSelector(
  props: MenuAdditionDialogProps
): JSX.Element {
  const { t } = useTranslation();
  const simulateLastWidget = true;
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-around"
      className={`widget-selector-body${simulateLastWidget ? '-last': ''}`}
    >
      <WidgetButton
        id="widget-catalog"
        title={t('widgets.catalog')}
        icon={faClone}
        onClick={() => props.onTypeSelected('1')}
      />
      <WidgetButton
        id="widget-publications"
        title={t('widgets.publications')}
        icon={faClone}
        onClick={() => props.onTypeSelected('2')}
      />
      <WidgetButton
        id="widget-search"
        title={t('widgets.search')}
        icon={faSearch}
        onClick={() => props.onTypeSelected('3')}
      />
      <WidgetButton
        id="widget-kpi"
        title={t('widgets.kpi')}
        icon={faChartBar}
        onClick={() => props.onTypeSelected('4')}
      />
      <WidgetButton
        id="widget-text"
        title={t('widgets.text')}
        icon={faFileAlt}
        onClick={() => props.onTypeSelected('5')}
      />
      <WidgetButton
        id="widget-banner"
        title={t('widgets.banner')}
        icon={faImage}
        onClick={() => props.onTypeSelected('6')}
      />
      {props.type === 'portal' && (
        <WidgetButton
          id="widget-taxonomy"
          title={t('widgets.taxonomy')}
          icon={faAlignJustify}
          onClick={() => props.onTypeSelected('7')}
        />
      )}
      {(props.type === 'portal' || props.type === 'theme') && (
        <WidgetButton
          id="widget-events"
          title={t('widgets.events')}
          icon={faCalendarAlt}
          onClick={() => props.onTypeSelected('8')}
        />
      )}
      {(props.type === 'portal' || props.type === 'theme') && (
        <WidgetButton
          id="widget-news"
          title={t('widgets.news')}
          icon={faNewspaper}
          onClick={() => props.onTypeSelected('9')}
        />
      )}
      {props.type === 'portal' && (
        <WidgetButton
          id="widget-read-on"
          title={t('widgets.readOn')}
          icon={faBookReader}
          onClick={() => props.onTypeSelected('10')}
        />
      )}
      <WidgetButton
        id="widget-promotion"
        title={t('widgets.promotion')}
        icon={faRocket}
        onClick={() => props.onTypeSelected('11')}
      />
      <WidgetButton
        id="widget-my-publications"
        title={t('widgets.myPublications')}
        icon={faUserCircle}
        onClick={() => props.onTypeSelected('12')}
      />
      {(props.type === 'portal' || props.type === 'theme') && (
        <WidgetButton
          id="widget-favorites"
          title={t('widgets.favorites')}
          icon={faStar}
          onClick={() => props.onTypeSelected('13')}
        />
      )}
      {(props.type === 'portal' || props.type === 'theme') && (
        <WidgetButton
          id="widget-subscriptions"
          title={t('widgets.mySubscriptions')}
          icon={faIdCard}
          onClick={() => props.onTypeSelected('14')}
        />
      )}
      <WidgetButton
        id="widget-calendar-news"
        title={t('widgets.calendarNews')}
        icon={faCalendarAlt}
        onClick={() => props.onTypeSelected('15')}
      />
    </Box>
  );
}
