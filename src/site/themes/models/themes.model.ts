import { Publication } from "../../catalog/models/portal.catalog.model";
import {
  HeaderMenu,
  MenuHomePage,
} from "../../../shared/models/menuItem.model";

export interface Theme {
  uuid: string;
  id?: string;
  name: string;
  createdBy: string;
  publishDate: string;
  canRevert?: boolean;
  visibility?: boolean;
  status?: string;
}

export interface ThemeSettings {
  uuid: string;
  permalink: string;
  name: string;
  previewImage?: string;
  homepage: MenuHomePage;
  description?: string;
  canRevert?: boolean;
  visibility?: boolean;
  menuItems: HeaderMenu[];
  headerImage?: string;
  logoImage?: string;
  titleSize: string;
  headerColour?: string;
  colorPrimary?: string;
  colorSecondary?: string;
  colorMainMenu?: string;
  fontPrimary?: string;
  fontSecondary?: string;
  hideName: boolean;
}

export interface ThemeCatalog {
  uuid: string;
  publications: Publication[];
  openAccess: boolean;
  authorizingEbooks: boolean;
  authorizingJournals: boolean;
  authorizingJournalArticles: boolean;
  authorizingDatabases: boolean;
  authorizingDatabaseArticles: boolean;
  years: number[];
  taxonomyTree: any[];
  assignedTaxonomies: any[];
}
