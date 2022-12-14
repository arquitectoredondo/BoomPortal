export interface ItemTranslations {
  en: string;
  nl: string;
}
export interface MenuHeaderItem {
  label: ItemTranslations;
  type: number;
  pageId?: string;
  id?: string;
}

export interface MenuHomePage {
  label: ItemTranslations;
  pageId: string;
}

export interface HeaderMenu extends MenuHeaderItem {
  folder?: MenuHeaderItem[];
}

export enum MenuController {
  'PAGE' = 0,
  'NEWS' = 1,
  'THEME' = 2,
  'CATALOG' = 3,
  'FOLDER' = 4,
  'THEME_INDEX' = 5,
  'NEWS_INDEX' = 6,
  // 'CALENDAR_NEWS' = 7,
  'PERSONS' = 7,
}
