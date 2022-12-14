import React from 'react';
import './sidebar.scss';
import { connect } from 'react-redux';
import { AppState } from '../../../../core/store/store';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faFileAlt,
  faCubes,
  faColumns,
  faBolt,
  faFire,
  faCopy,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faDatabase,
  faSlidersH,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import { Portal } from '../../models/portal.model';
import {
  selectPortal,
  selectJournal,
  selectDatabase,
  selectCalendarNew,
} from '../../store/selectors/site.selectors';
import { useTranslation } from 'react-i18next';
import { IconButton, Collapse } from '@material-ui/core';
import { changeSidebarLayout } from '../../../../core/store/actions/layout.actions';
import { selectSidebarCollapsed } from '../../../../core/store/selectors/layout.selectors';
import {
  selectThemeisSelectedID,
  selectIsAnyThemeSelected,
} from '../../../themes/store/selectors/theme.selectors';
import { selectThemeSettings } from '../../../themes/store/selectors/theme-settings.selectors';
import { ThemeSettings } from '../../../themes/models/themes.model';
import { Journal } from '../../models/journal.model';
import { Database } from '../../models/database.model';

export interface SidebarProps {
  portal: Portal | undefined;
  journal: Journal | undefined;
  database: Database | undefined;
  calendarNew: Journal | undefined;
  sidebarCollapsed: boolean;
  themeSelected: boolean;
  changeSidebarLayout: typeof changeSidebarLayout;
  themeSelectedID: string;
  theme: ThemeSettings | undefined;
}

export function Sidebar(props: SidebarProps): JSX.Element {
  const { t } = useTranslation();

  const themeCatalog = () => {
    if (props.sidebarCollapsed) {
      return false;
    }
    return props.themeSelected;
  };

  return (
    <div
      className={
        props.sidebarCollapsed ? 'sidebar-body-collapsed' : 'sidebar-body'
      }
    >
      {props.portal === undefined &&
        props.journal === undefined &&
        props.database === undefined &&
        props.calendarNew === undefined && (
          <div id="portal-main">
            <NavLink to="/site/portals" activeClassName="selected">
              <div>
                <span>
                  <FontAwesomeIcon icon={faHome} />
                </span>
                <span>{t('sidebar.portals')}</span>
              </div>
            </NavLink>
            <NavLink to="/site/journals" activeClassName="selected">
              <div>
                <span>
                  <FontAwesomeIcon icon={faFileAlt} />
                </span>
                <span>{t('sidebar.journals')}</span>
              </div>
            </NavLink>
            <NavLink to="/site/databases" activeClassName="selected">
              <div>
                <span>
                  <FontAwesomeIcon icon={faDatabase} />
                </span>
                <span>{t('sidebar.databases')}</span>
              </div>
            </NavLink>
            <NavLink to="/site/calendarNews" activeClassName="selected">
              <div>
                <span>
                  <FontAwesomeIcon icon={faCalendar} />
                </span>
                <span>{t('sidebar.calendarNews')}</span>
              </div>
            </NavLink>
          </div>
        )}

      {props.portal !== undefined &&
        props.journal === undefined &&
        props.database === undefined &&
        props.calendarNew === undefined && (
          <div id="portal-nav">
            <NavLink
              data-cy="side-settings"
              to={`/site/${props.portal.uuid}/settings`}
              activeClassName="selected"
            >
              <div>
                <span>
                  <FontAwesomeIcon icon={faHome} />
                </span>
                <span>{t('sidebar.home')}</span>
              </div>
            </NavLink>
            <NavLink
              to={`/site/${props.portal.uuid}/catalog`}
              activeClassName="selected"
              data-cy="side-catalog"
            >
              <div>
                <span>
                  <FontAwesomeIcon icon={faCubes} />
                </span>
                <span>{t('sidebar.catalog')}</span>
              </div>
            </NavLink>
            <NavLink
              to={`/site/${props.portal.uuid}/pages`}
              activeClassName="selected"
              data-cy="side-pages"
            >
              <div>
                <span>
                  <FontAwesomeIcon icon={faCopy} />
                </span>
                <span>{t('sidebar.pages')}</span>
              </div>
            </NavLink>
            <NavLink
              to={`/site/${props.portal.uuid}/themes`}
              activeClassName="selected"
              data-cy="side-themes"
            >
              <div>
                <span>
                  <FontAwesomeIcon icon={faBolt} />
                </span>
                <span>{t('sidebar.themes')}</span>
              </div>
            </NavLink>
            <Collapse
              className="selected"
              in={themeCatalog()}
              timeout="auto"
              unmountOnExit
            >
              <div className="subNav">
                <span className="theme-name">
                  {props.theme ? props.theme.name : ''}
                </span>
                <NavLink
                  activeClassName="submenu-selected"
                  to={`/site/${props.portal.uuid}/themes/settings/${props.themeSelectedID}`}
                  data-cy="theme-settings"
                >
                  <div>
                    <span>
                      <FontAwesomeIcon icon={faCubes} />
                    </span>
                    <span>{t('sidebar.themeSettings')}</span>
                  </div>
                </NavLink>
                <NavLink
                  activeClassName="submenu-selected"
                  to={`/site/${props.portal.uuid}/themes/catalog/${props.themeSelectedID}`}
                  data-cy="theme-catalog"
                >
                  <div>
                    <span>
                      <FontAwesomeIcon icon={faColumns} />
                    </span>
                    <span>{t('sidebar.themeCatalog')}</span>
                  </div>
                </NavLink>
                <NavLink
                  to={`/site/${props.portal.uuid}/themes/pages/${props.themeSelectedID}`}
                  activeClassName="submenu-selected"
                  data-cy="theme-pages"
                >
                  <div>
                    <span>
                      <FontAwesomeIcon icon={faCopy} />
                    </span>
                    <span>{t('sidebar.themePages')}</span>
                  </div>
                </NavLink>
              </div>
            </Collapse>
            <NavLink
              to={`/site/${props.portal.uuid}/news`}
              activeClassName="selected"
            >
              <div>
                <span>
                  <FontAwesomeIcon icon={faFire} />
                </span>
                <span>{t('sidebar.news')}</span>
              </div>
            </NavLink>
          </div>
        )}
      {props.journal !== undefined &&
        props.portal === undefined &&
        props.database === undefined &&
        props.calendarNew === undefined && (
          <div id="portal-main">
            <NavLink
              to={`/site/journal/${props.journal.uuid}/home`}
              activeClassName="selected"
            >
              <div>
                <span>
                  <FontAwesomeIcon icon={faHome} />
                </span>
                <span>{'Settings'}</span>
              </div>
            </NavLink>
            <NavLink
              to={`/site/journal/${props.journal.uuid}/pages`}
              activeClassName="selected"
            >
              <div>
                <span>
                  <FontAwesomeIcon icon={faFileAlt} />
                </span>
                <span data-cy="side-pages">{'Pages'}</span>
              </div>
            </NavLink>
          </div>
        )}
      {props.journal === undefined &&
        props.portal === undefined &&
        props.database !== undefined &&
        props.calendarNew === undefined && (
          <div id="portal-main">
            <NavLink
              to={`/site/database/${props.database.uuid}/home`}
              activeClassName="selected"
            >
              <div>
                <span>
                  <FontAwesomeIcon icon={faSlidersH} />
                </span>
                <span>{'Settings'}</span>
              </div>
            </NavLink>
          </div>
        )}
      {props.journal === undefined &&
        props.portal === undefined &&
        props.database === undefined &&
        props.calendarNew !== undefined && (
          <div id="portal-main">
            <NavLink
              to={`/site/calendarNew/${props.calendarNew.uuid}/home`}
              activeClassName="selected"
            >
              <div>
                <span>
                  <FontAwesomeIcon icon={faHome} />
                </span>
                <span>{'Settings CN'}</span>
              </div>
            </NavLink>
            <NavLink
              to={`/site/calendarNew/${props.calendarNew.uuid}/pages`}
              activeClassName="selected"
            >
              <div>
                <span>
                  <FontAwesomeIcon icon={faFileAlt} />
                </span>
                <span data-cy="side-pages">{'Pages CN'}</span>
              </div>
            </NavLink>
          </div>
        )}
      <div className="collapse-button">
        <IconButton
          id="collapse-button"
          size="small"
          onClick={() => {
            props.changeSidebarLayout(!props.sidebarCollapsed);
          }}
        >
          <FontAwesomeIcon
            icon={
              props.sidebarCollapsed ? faAngleDoubleRight : faAngleDoubleLeft
            }
          />
        </IconButton>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  portal: selectPortal(state),
  journal: selectJournal(state),
  database: selectDatabase(state),
  calendarNew: selectCalendarNew(state),
  sidebarCollapsed: selectSidebarCollapsed(state),
  themeSelected: selectIsAnyThemeSelected(state),
  themeSelectedID: selectThemeisSelectedID(state),
  theme: selectThemeSettings(state),
});

export default connect(mapStateToProps, {
  changeSidebarLayout,
})(Sidebar);
