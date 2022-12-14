import {
  HeaderMenu,
  MenuHomePage,
} from "../../../shared/models/menuItem.model";

export interface JournalSettings {
  uuid: string;
  name: string;
  issn?: string;
  editedBy: string;
  publicationDate?: Date;
  description: string;
  colour?: string;
  visibility: boolean;
  canRevert?: boolean;
  menuItems: HeaderMenu[];
  homepage: MenuHomePage;
  cover: string;
  eans: string[];
  journalBoomId: string;
  titleSize: string;
  colorPrimary?: string;
  colorSecondary?: string;
  colorMainMenu?: string;
  fontPrimary?: string;
  fontSecondary?: string;
  openAccess?: boolean;
}
