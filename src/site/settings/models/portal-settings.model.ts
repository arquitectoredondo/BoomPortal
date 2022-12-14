import { Language } from '../../../shared/models/language.model';
import {
  HeaderMenu,
  MenuHomePage,
} from '../../../shared/models/menuItem.model';

export interface PortalSettings {
  id: string;
  canRevert?: boolean;
  visibility: boolean;
  name: string;
  htmlFavicon: string;
  logo: string;
  background: string;
  domain: string;
  clientId: string;
  homepage: MenuHomePage;
  menuItems: HeaderMenu[];
  colorPrimary: string;
  colorSecondary: string;
  colorMainMenu: string;
  colorSecondaryMenu: string;
  fontPrimary: string;
  fontSecondary: string;
  showRelatedPublications: boolean;
  catalogAsHomePage?: boolean;
  showVideos: boolean;
  showAvailableEditions: boolean;
  showELearning: boolean;
  showGroupAccess: boolean;
  showFullTextSearch: boolean;
  showLanguageSelector: boolean;
  preview?: boolean;
  languages: Language[];
}
