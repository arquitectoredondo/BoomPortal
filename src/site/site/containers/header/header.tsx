import React, { useState } from 'react';
import './header.scss';
import { connect } from 'react-redux';
import { AppState } from '../../../../core/store/store';
import { selectLoginUser } from '../../../../core/store/selectors/auth.selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { Button, IconButton } from '@material-ui/core';
import { Portal } from '../../models/portal.model';
import {
  selectPortal,
  selectJournal,
  selectDatabase,
  selectCalendarNew,
} from '../../store/selectors/site.selectors';
import { portalSelected } from '../../store/actions/site.actions';
import { useHistory } from 'react-router-dom';
import { Journal } from '../../models/journal.model';
import { Database } from '../../models/database.model';
import { useKeycloak } from '@react-keycloak/web';
import {
  loadPortalSettings,
  loadPortalSettingsFailure,
  loadPortalSettingsSuccess,
  savePortalSettings,
} from '../../../settings/store/actions/settings.actions';
import { saveDraftPortalSettings } from '../../../settings/services/settings.service';
import { PortalSettings } from '../../../settings/models/portal-settings.model';
import { AxiosError } from 'axios';
import { selectPortalSettings } from '../../../settings/store/selectors/settings.selectors';
import { useNotOnMountEffect } from '../../../../shared/services/utils';

export interface SiteHeaderProps {
  user: any;
  journal: Journal | undefined;
  portal: Portal | undefined;
  database: Database | undefined;
  calendarNew: Journal | undefined;
  portalSettings: PortalSettings | undefined;
  portalSelected: typeof portalSelected;
  savePortalSettings: typeof savePortalSettings;
  loadPortalSettingsSuccess: typeof loadPortalSettingsSuccess;
  loadPortalSettingsFailure: typeof loadPortalSettingsFailure;
}

export function SiteHeader(props: SiteHeaderProps): JSX.Element {
  const { t } = useTranslation();
  const history: any = useHistory();
  const [keycloak] = useKeycloak();
  const [settings, setSettings] = useState<PortalSettings | undefined>(
    props.portalSettings
  );

  useNotOnMountEffect(() => {
    saveChanges();
  }, [settings?.preview]);

  if (!settings && props.portalSettings) {
    setSettings(props.portalSettings);
    props.loadPortalSettingsSuccess(props.portalSettings);
  }

  const backToPortals = () => {
    props.portalSelected(undefined);
    history.push('/site/portals');
  };

  const logout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('keycloakTokenAdmin');
    localStorage.removeItem('mwTokenAdmin');
    keycloak.logout();
    history.push('/login');
  };
  const handleChanges = (key: string, value: any) => {
    if (settings) {
      setSettings({ ...settings, [key]: value });
    }
  };
  const saveChanges = () => {
    if (settings) {
      saveDraftPortalSettings(settings)
        .then((result: any) => {
          setSettings(result.data);
          props.savePortalSettings(settings);
          props.portalSelected(result.data);
          props.loadPortalSettingsSuccess(result.data);
        })
        .catch((error: AxiosError) => {
          props.loadPortalSettingsFailure(error.response?.data.errorMessage);
        });
    }
  };

  return (
    <div className="header-body">
      {props.portal || props.journal || props.database || props.calendarNew ? (
        <div id="portal-selected">
          <IconButton
            id="back-button"
            onClick={backToPortals}
            className="back-button"
            size="small"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </IconButton>

          <span id="portal-name">{t("header.home")}</span>
        </div>
      ) : (
        <div id="portal-not-selected">{t("header.managePortals")}</div>
      )}
      <div>
        {props.portal
          ? props.portal.name
          : props.journal
          ? props.journal.name
          : props.database
          ? props.database.name
          : props.calendarNew && props.calendarNew.name}
        {props.portal && props.portal.name && (
          <Button
            id="publish-changes-button"
            data-cy="publish-button"
            disabled={
              !(
                props.portalSettings?.name &&
                props.portalSettings?.domain &&
                props.portalSettings?.homepage
              )
            }
            className="main-blue-button"
            variant="contained"
            onClick={() => handleChanges("preview", true)}
          >
            {t("buttons.preview")}
          </Button>
        )}
      </div>
      <div>
        <span>{props.user?.givenName}</span>
        <FontAwesomeIcon icon={faUserCircle} />
      </div>
      <IconButton id="logout" onClick={logout} className="logout" size="small">
        <FontAwesomeIcon size="sm" icon={faSignOutAlt} />
      </IconButton>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  user: selectLoginUser(state),
  portal: selectPortal(state),
  journal: selectJournal(state),
  database: selectDatabase(state),
  calendarNew: selectCalendarNew(state),
  portalSettings: selectPortalSettings(state),
});

export default connect(mapStateToProps, {
  loadPortalSettings,
  savePortalSettings,
  loadPortalSettingsSuccess,
  loadPortalSettingsFailure,
  portalSelected,
})(SiteHeader);
