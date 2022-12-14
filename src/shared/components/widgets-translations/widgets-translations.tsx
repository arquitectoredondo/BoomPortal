import React, { useEffect, useState } from 'react';
import './widgets-translations.scss';
import {
  Box,
  Button,
  DialogProps,
  Dialog,
  IconButton,
  Divider,
} from '@material-ui/core';
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
  faTimes,
  faUserCircle,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { WidgetTextField } from './WidgetTextField/WidgetTextField';
import { WidgetWysiwyg } from './WidgetWysiwyg/WidgetWysiwyg';
import { AppState } from '../../../core/store/store';
import { selectPortalSettings } from '../../../site/settings/store/selectors/settings.selectors';
import { connect } from 'react-redux';
import { PortalSettings } from '../../../site/settings/models/portal-settings.model';

export interface WidgetsTranslationsProps {
  open: boolean;
  watchLanguage: boolean;
  data?: any;
  title: string;
  canDelete: boolean;
  onCloseDialog: (page?: any) => void;
  onConfirmDelete: (page?: any) => void;
  portalSettings: PortalSettings | undefined;
}
interface payloadProp {
  [item: string]: { [ln: string]: string };
}
export interface widgetPayloadProp {
  [uuid: string]: payloadProp;
}

export function AllWidgetsFields(props: WidgetsTranslationsProps): JSX.Element {
  const { t } = useTranslation();
  let l = !props.watchLanguage ? ['nl', 'en'] : props.portalSettings?.languages || ['nl', 'en'];
  let p = l.indexOf('nl');
  //Make sure that "nl" appears in the left-hand column
  const languages = p >= 0 ? [...l.slice(p), ...l.slice(0, p)] : l;
  const requiredLanguage = p >= 0 ? 'nl' : 'en';
  const translationBehavior = p >= 0 ? true : false;
  const usedLabels = [
    'title',
    'placeholder',
    'text',
    'url',
    'label',
    'titleNotLogged',
    'noAvailablePublications',
    'noAvailableSubscriptions',
    'catalogLink',
    'activationTitle',
    'activationDescription',
    'activationFieldPlaceholder',
  ];
  const allowedWidgets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15];
  const maxWidth: DialogProps['maxWidth'] = 'lg';
  const [widgetPayload, setWidgetPayload] = useState<widgetPayloadProp>({
    payload: {},
  });
  const [initialWidgetPayload, setInitialWidgetPayload] =
    useState<widgetPayloadProp>({
      payload: {},
    });
  const [groupedWidgets, setGroupedWidgets] = useState<any>();
  const handleCloseDialog = (page?: any) => {
    props.onCloseDialog(page);
  };
  let grouped: any = [];
  let preUploadWidget: any = {};
  let backgroundColor = '#ffffff';

  useEffect(() => {
    CopyToLanguage('nl', 'en');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CopyToLanguage = (from: string, to: string) => {
    //Copy each field from one language to another
    let newWidgetPayload = JSON.parse(JSON.stringify(widgetPayload));
    Object.keys(widgetPayload).forEach((key: any) =>
      usedLabels.forEach((label: string) => {
        newWidgetPayload[key][label] &&
          newWidgetPayload[key][label][to] === '' &&
          (newWidgetPayload[key][label][to] =
            newWidgetPayload[key][label][from]);
      })
    );
    setWidgetPayload(newWidgetPayload);
  };

  if (JSON.stringify(widgetPayload) === JSON.stringify({ payload: {} })) {
    //initializes non-existent fields
    props.data.cms.forEach((item: any) =>
      usedLabels.forEach(
        (label) =>
          label !== 'url' &&
          languages.forEach((lang) => {
            item[label] && !item[label]?.[lang] && (item[label][lang] = '');
          })
      )
    );
    props.data.cms
      .filter((w: any) => allowedWidgets.indexOf(w.widgetType) >= 0)
      .forEach((item: any) => {
        //group the fields according to the widget type
        if (!grouped[item.widgetType]) grouped[item.widgetType] = [];
        grouped[item.widgetType].push(item);
        //creates an object with only the useful fields to be translated
        let payload: any = {};
        usedLabels.forEach((label) => {
          item[label] && (payload[label] = item[label]);
        });
        preUploadWidget[item.uuid] = payload;
      });
    setGroupedWidgets(grouped);
    setWidgetPayload(preUploadWidget);
    setInitialWidgetPayload(preUploadWidget);
  }

  const moveLabelToLast = (array: any) => {
    //displays button labels in the last position for aesthetic consistency
    const index = array.indexOf('label');
    if (index > -1) {
      array.splice(index, 1);
      array.push('label');
    }
    return array;
  };

  return (
    <Dialog
      id="dialog-page-creation"
      className="scrollbar-dialog layout-dialog"
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
        <span>{props.title}</span>
        <IconButton id="close-button" onClick={() => handleCloseDialog()}>
          <FontAwesomeIcon size="sm" icon={faTimes} />
        </IconButton>
      </Box>
      <Box
        className="layout-translations-language-indicator"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <span>{`${t(`pages.widgetTranslations.PortalDefaultLanguage`)} ${
          languages.indexOf('nl') >= 0
            ? t(`pages.widgetTranslations.language.nl`)
            : t(`pages.widgetTranslations.language.en`)
        }`}</span>
      </Box>
      <Box
        className="layout-translations-title"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        {languages.map((lang: string, index: number) => (
          <span key={index}>
            {t(`pages.widgetTranslations.language.${lang}`)}
          </span>
        ))}
      </Box>

      <Box
        component="form"
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
        id="all-widgets-form"
        onSubmit={(e) => {
          handleCloseDialog({
            widgetTranslations: Object.keys(widgetPayload).map((key) => ({
              ...{ uuid: key },
              ...widgetPayload[key],
            })),
          });
        }}
      >
        {groupedWidgets?.map((i: any, index: number) => {
          backgroundColor === '#ffffff'
            ? (backgroundColor = '#F1F5F9')
            : (backgroundColor = '#ffffff');
          return (
            <Box
              key={index}
              display="flex"
              flexDirection="column"
              flex={1}
              style={{
                backgroundColor: backgroundColor,
              }}
            >
              {i.map((widget: any, index: number) => {
                const { label, title, usedLabel, allLabel, mandatoryLabel } =
                  WidgetControl(widget, t);
                return (
                  <div key={`${widget.uuid}`}>
                    {index === 0 && (
                      <Box display="flex" flexDirection="row" flex={1}>
                        {title}
                      </Box>
                    )}
                    {moveLabelToLast(
                      Object.keys(widget).filter((key) =>
                        !translationBehavior
                          ? allLabel?.includes(key)
                          : usedLabel?.includes(key)
                      )
                    ).map((key: any) => {
                      const customLabel =
                        widget.widgetType === 12
                          ? `${t(`myPublications.${key}.title`)} ${
                              key === 'title' || key === 'text'
                                ? t('myPublications.loggedIn.title')
                                : key === 'titleNotLogged'
                                ? t('myPublications.loggedOut.title')
                                : ''
                            }`
                          : widget.widgetType === 14
                            ? `${t(`mySubscriptions.${key}.title`)} ${
                                key === 'title' || key === 'text'
                                  ? t('mySubscriptions.loggedIn.title')
                                  : key === 'titleNotLogged'
                                  ? t('mySubscriptions.loggedOut.title')
                                  : ''
                              }`
                            : ['title', 'placeholder'].includes(key)
                          ? label
                          : t(`banner.${key}`);
                      const WidgetType =
                        key === 'text' &&
                        (widget.widgetType === 5 || widget.widgetType === 12 || widget.widgetType === 14)
                          ? WidgetWysiwyg
                          : WidgetTextField;

                      const validationRules = (
                        ln: string,
                        value: string,
                        requiredLanguageText: string
                      ) => {
                        let required = mandatoryLabel.indexOf(key) >= 0;
                        let type = widget[key] && key;
                        let rule;
                        // Left field is required and empty
                        if (ln === requiredLanguage) {
                          if (required) {
                            if (requiredLanguageText === '') {
                              rule = {
                                error: true,
                                helperText: `${customLabel} (${ln.toUpperCase()}) ${t(
                                  'pages.widgetTranslations.errors.isRequired'
                                )}`,
                                type: 1,
                              };
                              return rule;
                            }
                          }
                        }
                        if (translationBehavior) {
                          // Right field empty when left field is not empty
                          if (requiredLanguageText !== '') {
                            if (value === '') {
                              rule = {
                                error: true,
                                helperText: `${customLabel} (${ln.toUpperCase()}) ${t(
                                  'pages.widgetTranslations.errors.isRequiredWhen'
                                )} (${requiredLanguage.toUpperCase()}) ${t(
                                  'pages.widgetTranslations.errors.languageIsNotEmpty'
                                )}`,
                                type: 2,
                              };
                              return rule;
                            }
                            // Both fields are equal
                            if (
                              widgetPayload[widget.uuid]?.[type][
                                languages[0]
                              ] ===
                              widgetPayload[widget.uuid]?.[type][languages[1]]
                            ) {
                              rule = {
                                error: false,
                                helperText: `${customLabel} (${languages[0].toUpperCase()}) ${t(
                                  'pages.widgetTranslations.errors.and'
                                )} (${languages[1].toUpperCase()}) ${t(
                                  'pages.widgetTranslations.errors.translationsMustBeDifferent'
                                )}`,
                                type: 3,
                              };
                              return rule;
                            }
                          }
                        }
                        rule = { error: false, helperText: ' ', type: 0 };
                        return rule;
                      };

                      return (
                        <WidgetType
                          key={widget[key] && `${key}-${widget.uuid}`}
                          i={widget}
                          type={widget[key] && key}
                          label={customLabel}
                          widgetPayload={widgetPayload}
                          setWidgetPayload={setWidgetPayload}
                          languages={languages}
                          required={mandatoryLabel.indexOf(key) >= 0}
                          requiredLanguage={requiredLanguage}
                          translationBehavior={translationBehavior}
                          validationRules={validationRules}
                        />
                      );
                    })}
                    {index < i.length - 1 && (
                      <Divider
                        style={{ marginLeft: '50px', marginRight: '50px' }}
                      />
                    )}
                  </div>
                );
              })}
            </Box>
          );
        })}
        <Box
          className="layout-dialog-actions"
          display="flex"
          flexDirection="row-reverse"
        >
          <Button
            id="save-button"
            type="submit"
            disabled={
              JSON.stringify(initialWidgetPayload) ===
              JSON.stringify(widgetPayload)
            }
          >
            {t('buttons.save')}
          </Button>

          <Button id="cancel-button" onClick={() => handleCloseDialog()}>
            {t('buttons.cancel')}
          </Button>
          <Box flex={1}></Box>
        </Box>
      </Box>
    </Dialog>
  );
}

const WidgetControl = (i: any, t: any) => {
  let widgetName;
  let widgetLabel;
  let usedLabels: string[] = [];
  let allLabels: string[] = [];
  let mandatoryLabels: string[] = [];
  let widgetIcon: any;
  switch (i.widgetType) {
    case 1: {
      widgetName = t('widgets.title.catalog');
      widgetLabel = t('publication.title');
      widgetIcon = faClone;
      usedLabels = ['title'];
      allLabels = ['title'];
      mandatoryLabels = ['title'];
      break;
    }

    case 2: {
      widgetName = t('widgets.title.publications');
      widgetLabel = t('publication.title');
      widgetIcon = faClone;
      usedLabels = ['title'];
      allLabels = ['title'];
      mandatoryLabels = ['title'];
      break;
    }

    case 3: {
      widgetName = t('widgets.title.search');
      widgetLabel = t('placeholders.placeholder');
      widgetIcon = faSearch;
      usedLabels = ['placeholder'];
      allLabels = ['placeholder'];
      mandatoryLabels = [];
      break;
    }

    case 4: {
      widgetName = t('widgets.title.kpi');
      widgetLabel = t('banner.title');
      widgetIcon = faChartBar;
      usedLabels = ['title'];
      allLabels = ['title'];
      mandatoryLabels = ['title'];
      break;
    }

    case 5: {
      widgetName = t('widgets.title.text');
      widgetLabel = t('banner.title');
      widgetIcon = faFileAlt;
      usedLabels = ['title', 'text'];
      allLabels = ['title', 'text'];
      mandatoryLabels = ['text'];
      break;
    }

    case 6: {
      widgetName = t('widgets.title.banner');
      widgetLabel = t('banner.title');
      widgetIcon = faImage;
      usedLabels = ['title', 'text'];
      allLabels =
        i.internal === true ? ['title', 'text'] : ['title', 'text', 'url'];
      mandatoryLabels = i.internal === true ? ['title'] : ['title', 'url'];
      if (i.isButtonVisible) {
        allLabels.push('label');
        mandatoryLabels.push('label');
        usedLabels.push('label');
      }
      break;
    }

    case 7: {
      widgetName = t('widgets.title.taxonomy');
      widgetLabel = t('banner.title');
      widgetIcon = faAlignJustify;
      usedLabels = ['title'];
      allLabels = ['title'];
      mandatoryLabels = ['title'];
      break;
    }

    case 8: {
      widgetName = t('widgets.title.events');
      widgetLabel = t('banner.title');
      widgetIcon = faCalendarAlt;
      usedLabels = ['title'];
      allLabels = ['title'];
      mandatoryLabels = [];
      break;
    }

    case 9: {
      widgetName = t('widgets.title.news');
      widgetLabel = t('banner.title');
      widgetIcon = faNewspaper;
      usedLabels = ['title'];
      allLabels = ['title'];
      mandatoryLabels = [];
      break;
    }

    case 10: {
      widgetName = t('widgets.title.readOn');
      widgetLabel = t('publication.title');
      widgetIcon = faBookReader;
      usedLabels = ['title'];
      allLabels = ['title'];
      mandatoryLabels = ['title'];
      break;
    }

    case 11: {
      widgetName = t('widgets.title.promotion');
      widgetLabel = t('publication.title');
      widgetIcon = faRocket;
      usedLabels = ['title'];
      allLabels = ['title'];
      mandatoryLabels = ['title'];
      break;
    }

    case 12: {
      widgetName = t('widgets.title.myPublications');
      widgetLabel = t('publication.title');
      widgetIcon = faUserCircle;
      usedLabels = [
        'title',
        'text',
        'titleNotLogged',
        'noAvailablePublications',
        'catalogLink',
        'activationTitle',
        'activationDescription',
        'activationFieldPlaceholder',
      ];
      allLabels = [
        'title',
        'text',
        'titleNotLogged',
        'noAvailablePublications',
        'catalogLink',
        'activationTitle',
        'activationDescription',
        'activationFieldPlaceholder',
      ];
      mandatoryLabels = [
        'title',
        'text',
        'titleNotLogged',
        'noAvailablePublications',
        'catalogLink',
        'activationTitle',
        'activationDescription',
        'activationFieldPlaceholder',
      ];
      break;
    }

    case 14: {
      widgetName = t('widgets.title.mySubscriptions');
      widgetLabel = t('publication.title');
      widgetIcon = faIdCard;
      usedLabels = [
        'title',
        'text',
        'titleNotLogged',
        'noAvailableSubscriptions',
        'activationDescription',
        'activationFieldPlaceholder',
      ];
      allLabels = [
        'title',
        'text',
        'titleNotLogged',
        'noAvailableSubscriptions',
        'activationDescription',
        'activationFieldPlaceholder',
      ];
      mandatoryLabels = [
        'title',
        'text',
        'titleNotLogged',
        'noAvailableSubscriptions',
        'activationDescription',
        'activationFieldPlaceholder',
      ];
      break;
    }

    case 15: {
      widgetName = t('widgets.title.calendarNews');
      widgetLabel = t('banner.title');
      widgetIcon = faCalendarAlt;
      usedLabels = ['title'];
      allLabels = ['title'];
      mandatoryLabels = ['title'];
      break;
    }

    default: {
      widgetName = '';
      widgetIcon = '';
    }
  }

  return {
    label: widgetLabel,
    usedLabel: usedLabels,
    allLabel: allLabels,
    mandatoryLabel: mandatoryLabels,
    title: (
      <div className="widget-translations-title">
        <FontAwesomeIcon size="lg" icon={widgetIcon} />
        <span>{` ${widgetName}`}</span>
      </div>
    ),
  };
};

const mapStateToProps = (state: AppState) => ({
  portalSettings: selectPortalSettings(state),
});

export default connect(mapStateToProps, {})(AllWidgetsFields);
