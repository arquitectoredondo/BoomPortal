import { createStore, combineReducers, compose, Reducer } from 'redux';
import authReducer from './reducers';
import siteReducer from '../../site/site/store/reducers/site.reducer';
import themeReducer from '../../site/themes/store/reducers/theme.reducer';
import searchReducer from '../../site/themes/store/reducers/search.reducer';
import portalReducer from '../../site/portals/store/reducers/portals.reducer';
import themeSettingsReducer from '../../site/themes/store/reducers/theme-settings.reducer';
import portalSettingsReducer from '../../site/settings/store/reducers/settings.reducers';
import portalPagesReducer from '../../site/pages/store/reducers/pages.reducers';
import journalsReducer from '../../site/journals/store/reducers/journals.reducer';
import journalSettingsReducer from '../../site/journal-settings/store/reducers/journal-settings.reducer';
import portalCatalogReducer from '../../site/catalog/store/reducers/portal-catalog.reducer';
import themeCatalogReducer from '../../site/themes/store/reducers/theme-catalog.reducer';
import themePagesReducer from '../../site/themes/store/reducers/theme-pages.reducer';
import themePageDetailsReducer from '../../site/themes/store/reducers/theme-pages-details.reducer';
import newsReducer from '../../site/news/store/reducers/news.reducers';
import newDetailsReducer from '../../site/news/store/reducers/news-details.reducers';
import portalPagesDetailsReducer from '../../site/pages/store/reducers/page-details.reducers';
import journalPageDetailsReducer from '../../site/journal-pages/store/reducers/journal-page-details.reducers';
import journalPagesReducer from '../../site/journal-pages/store/reducers/journal-pages.reducers';
import databasesReducer from '../../site/databases/store/reducers/databases.reducer';
import databaseSettingsReducer from '../../site/database-settings/store/reducers/database-settings.reducer';
import calendarNewReducer from '../../site/calendar-news/store/reducers/calendar-news.reducer';
import calendarNewSettingsReducer from '../../site/calendar-news-settings/store/reducers/calendar-new-settings.reducer';
import calendarNewsPagesReducer from '../../site/calendar-news-pages/store/reducers/calendar-news-pages.reducers';
import calendarNewsPageDetailsReducer from '../../site/calendar-news-pages/store/reducers/calendar-news-page-details.reducers';

const rootReducer: Reducer = combineReducers({
  core: authReducer,
  site: siteReducer,
  theme: themeReducer,
  search: searchReducer,
  portals: portalReducer,
  themeSettings: themeSettingsReducer,
  themeCatalog: themeCatalogReducer,
  themePages: themePagesReducer,
  themePageDetails: themePageDetailsReducer,
  portalSettings: portalSettingsReducer,
  pages: portalPagesReducer,
  pageDetails: portalPagesDetailsReducer,
  journals: journalsReducer,
  journalSettings: journalSettingsReducer,
  journalPages: journalPagesReducer,
  journalPageDetails: journalPageDetailsReducer,
  portalCatalog: portalCatalogReducer,
  news: newsReducer,
  newDetails: newDetailsReducer,
  databases: databasesReducer,
  databaseSettings: databaseSettingsReducer,
  calendarNews: calendarNewReducer,
  calendarNewSettings: calendarNewSettingsReducer,
  calendarNewsPages: calendarNewsPagesReducer,
  calendarNewsPageDetails: calendarNewsPageDetailsReducer,
});

export const selectCoreState = (store: AppState): any => store.core;
export type AppState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers: any =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, composeEnhancers());
