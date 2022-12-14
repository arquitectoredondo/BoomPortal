import React from 'react';
import './site.scss';
import { connect } from 'react-redux';
import { AppState } from '../../../../core/store/store';
import SiteHeader from '../header/header';
import {
  BrowserRouter as Router,
  Switch,
  Route as MyRoute,
} from 'react-router-dom';
import Journals from '../../../journals/containers/journals/journals';
import Databases from '../../../databases/containers/databases/databases';
import Sidebar from '../sidebar/sidebar';
import Portals from '../../../portals/containers/portals/portals';
import PortalCatalogComponent from '../../../catalog/containers/catalog/portal-catalog';
import Themes from '../../../themes/containers/themes/themes';
import Pages from '../../../pages/container/pages/pages';
import News from '../../../news/containers/news/news';
import ThemeCatalogComponent from '../../../themes/containers/themes-catalog/themes-catalog';
import ThemesSettings from '../../../themes/containers/themes-settings/themes-settings';
import Settings from '../../../settings/containers/settings/settings';
import PageDetails from '../../../pages/container/page-details/page-details';
import JournalSettings from '../../../journal-settings/containers/journal-settings';
import JournalPages from '../../../journal-pages/container/journal-pages/journal-pages';
import JournalPagesDetails from '../../../journal-pages/container/journal-page-details/journal-page-details';
import NewsCreation from '../../../news/containers/news-creation/news-creation';
import NewsDetails from '../../../news/containers/news-details/news-details';
import ThemePages from '../../../themes/containers/theme-pages/theme-pages';
import ThemePageDetails from '../../../themes/containers/theme-pages-details/theme-pages-details';
import DatabaseSettings from '../../../database-settings/containers/database-settings';
import CalendarNews from '../../../calendar-news/containers/calendar-news/calendar-news';
import CalendarNewSettings from '../../../calendar-news-settings/containers/calendar-new-settings';
import CalendarNewsPages from '../../../calendar-news-pages/container/calendar-news-pages/calendar-news-pages';
import CalendarNewsDetails from '../../../calendar-news-pages/container/calendar-news-page-details/calendar-news-page-details';
import {
  calendarNewSelected,
  databaseSelected,
  journalSelected,
  portalSelected,
} from '../../store/actions/site.actions';
import { Portal } from '../../models/portal.model';
import { getPortalSettings } from '../../../settings/services/settings.service';
import {
  loadThemeSelectedID,
  loadThemesSuccess,
  themeIsSelected,
} from '../../../themes/store/actions/theme.actions';
import { Journal } from '../../models/journal.model';
import { Database } from '../../models/database.model';
import { fetchThemeById } from '../../../themes/services/theme-settings.service';
import { loadThemeSettingsSuccess } from '../../../themes/store/actions/theme-settings.actions';
import { AxiosError } from 'axios';
import { getJournalSettings } from '../../../journal-settings/services/journal-settings.service';
import { getDatabaseSettings } from '../../../database-settings/services/database-settings.service';
import { getCalendarNewSettings } from '../../../calendar-news-settings/services/calendar-new-settings.service';
import {
  loadPortalSettings,
  loadPortalSettingsSuccess,
} from '../../../settings/store/actions/settings.actions';
import { useTranslation } from 'react-i18next';

interface SiteProps {
  portalSelected?: typeof portalSelected;
  themeIsSelected?: typeof themeIsSelected;
  loadThemeSelectedID?: typeof loadThemeSelectedID;
  loadThemeSettingsSuccess?: typeof loadThemeSettingsSuccess;
  loadThemesSuccess?: typeof loadThemesSuccess;
  journalSelected?: typeof journalSelected;
  databaseSelected?: typeof databaseSelected;
  calendarNewSelected?: typeof calendarNewSelected;
  loadPortalSettings?: typeof loadPortalSettings;
  loadPortalSettingsSuccess?: typeof loadPortalSettingsSuccess;
  portal?: Portal | undefined;
  theme?: any | undefined;
  journal?: Journal | undefined;
  database?: Database | undefined;
}

export function Site(props: SiteProps): JSX.Element {
  const Route = ({ children, ...rest }: any) => {
    const { i18n } = useTranslation();
    const { params } = rest.computedMatch;
    const { portalUuid, themeId, journalId, databaseId, calendarNewId } =
      params;
    portalUuid &&
      getPortalSettings(portalUuid ? portalUuid : '')
        .then((r: any) => {
          i18n.language === 'nl' &&
            !r.data.languages.includes('nl') &&
            i18n.changeLanguage('en');
          props.portalSelected && props.portalSelected(r.data);
          props.loadPortalSettings && props.loadPortalSettings();
          props.loadPortalSettingsSuccess &&
            props.loadPortalSettingsSuccess(r.data);
        })
        .catch((error: AxiosError) => {
          console.log('error', error);
        });

    themeId &&
      fetchThemeById(themeId ? themeId : '')
        .then((res: any) => {
          props.loadThemeSelectedID && props.loadThemeSelectedID(res.data.uuid);
          props.themeIsSelected && props.themeIsSelected(true);
          props.loadThemeSettingsSuccess &&
            props.loadThemeSettingsSuccess(res.data);
        })
        .catch((error: AxiosError) => {
          console.log('error', error.response?.data.errorMessage);
        });

    journalId &&
      getJournalSettings(journalId ? journalId : '')
        .then((result: any) => {
          props.journalSelected && props.journalSelected(result.data);
        })
        .catch((error: AxiosError) => {
          console.log('error', error.response?.data.errorMessage);
        });

    databaseId &&
      getDatabaseSettings(databaseId ? databaseId : '')
        .then(
          (result: any) =>
            props.databaseSelected && props.databaseSelected(result.data)
        )
        .catch((error: AxiosError) => {
          console.log('error', error.response?.data.errorMessage);
        });

    calendarNewId &&
      getCalendarNewSettings(calendarNewId ? calendarNewId : '')
        .then(
          (result: any) =>
            props.calendarNewSelected && props.calendarNewSelected(result.data)
        )
        .catch((error: AxiosError) => {
          console.log('error', error.response?.data.errorMessage);
        });

    return <MyRoute {...rest}>{children}</MyRoute>;
  };

  return (
    <div>
      <Router>
        <SiteHeader />
        <div className="main-layout">
          <Sidebar />
          <Switch>
            {/* Main Section */}
            <Route exact path="/">
              <Portals />
            </Route>
            <Route path="/site/portals">
              <Portals />
            </Route>
            <Route path="/site/journals">
              <Journals />
            </Route>
            <Route path="/site/databases">
              <Databases />
            </Route>
            <Route path="/site/calendarNews">
              <CalendarNews />
            </Route>

            {/* Journal Section */}
            <Route path="/site/journal/:journalId/home">
              <JournalSettings />
            </Route>
            <Route path="/site/journal/:journalId/pages/:pageId">
              <JournalPagesDetails />
            </Route>
            <Route path="/site/journal/:journalId/pages">
              <JournalPages />
            </Route>

            {/* Database Section */}
            <Route path="/site/database/:databaseId/home">
              <DatabaseSettings />
            </Route>

            {/* CalendarNews Section */}
            <Route path="/site/calendarNew/:calendarNewId/home">
              <CalendarNewSettings />
            </Route>
            <Route path="/site/calendarNew/:calendarNewId/pages/:pageId">
              <CalendarNewsDetails />
            </Route>
            <Route path="/site/calendarNew/:calendarNewId/pages">
              <CalendarNewsPages />
            </Route>

            {/* Portal Section */}
            <Route path="/site/:portalUuid/settings">
              <Settings />
            </Route>
            <Route path="/site/:portalUuid/catalog">
              <PortalCatalogComponent />
            </Route>
            <Route path="/site/:portalUuid/themes/catalog/:themeId">
              <ThemeCatalogComponent />
            </Route>
            <Route path="/site/:portalUuid/themes/settings/:themeId">
              <ThemesSettings />
            </Route>
            <Route path="/site/:portalUuid/themes/pages/:themeId/:pageId">
              <ThemePageDetails />
            </Route>
            <Route path="/site/:portalUuid/themes/pages/:themeId">
              <ThemePages />
            </Route>
            <Route path="/site/:portalUuid/themes">
              <Themes />
            </Route>
            <Route path="/site/:portalUuid/pages/:pageId">
              <PageDetails />
            </Route>
            <Route path="/site/:portalUuid/pages">
              <Pages />
            </Route>
            <Route path="/site/:portalUuid/news/newCreation/">
              <NewsCreation />
            </Route>
            <Route path="/site/:portalUuid/news/:newId">
              <NewsDetails />
            </Route>
            <Route path="/site/:portalUuid/news">
              <News />
            </Route>
            <Route path="/site/:portalUuid/statistics">
              <div> Statistics</div>
            </Route>
            <Route path="/site/:portalUuid/subscriptions">
              <div> subscriptions</div>
            </Route>
            <Route path="/site/:portalUuid/users">
              <div> users</div>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({});

export default connect(mapStateToProps, {
  portalSelected,
  themeIsSelected,
  loadThemeSelectedID,
  loadThemeSettingsSuccess,
  loadThemesSuccess,
  journalSelected,
  databaseSelected,
  calendarNewSelected,
  loadPortalSettings,
  loadPortalSettingsSuccess,
})(Site);
