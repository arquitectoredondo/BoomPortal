import { Publication } from '../../site/catalog/models/portal.catalog.model';

export interface ResponsiveLayout {
  lg: PageWidget[];
  md?: PageWidget[];
  sm?: PageWidget[];
  xs?: PageWidget[];
  xxs?: PageWidget[];
}

// export interface PageWidget {
//   id: string;
//   x: number;
//   y: number;
//   h: number;
//   w: number;
//   minH?: number;
//   minW?: number;
//   static?: boolean;
//   widgetType: number;
//   widgetProperties?: any;
// }

export interface PageWidget {
  uuid: string;
  name?: string;
  widgetType: number;
  x: number;
  y: number;
  h: number;
  w: number;
  minH: number;
  minW: number;
  id?: string;
  label?: { [ln: string]: string };
  internal?: boolean;
  scalableImage?: boolean;
  title?: { [ln: string]: string };
  type?: number;
  pageId?: string;
  description?: string;
  vertical?: boolean;
  backgroundColor?: string;
  fontColor?: string;
  borderTop: boolean;
  borderRight: boolean;
  borderBottom: boolean;
  borderLeft: boolean;
  placeholder?: { [ln: string]: string };
  image?: string;
  listView?: boolean;
  url?: string;
  text?: { [ln: string]: string };
  static?: boolean;
  i?: string;
  taxonomySource?: number;
  sortBy?: number;
  display?: string;
  publications?: Publication[];
  typeOfPublication?: number;
  journalSelected?: string;
  databaseSelected?: string;
  isButtonVisible?: boolean;
  openNewTab?: boolean;
  videoFormat?: boolean;
  // widgetProperties: WidgetProperties;
  titleNotLogged?: { [ln: string]: string };
  noAvailableSubscriptions?: { [ln: string]: string };
  noAvailablePublications?: { [ln: string]: string };
  catalogLink?: { [ln: string]: string };
  activationTitle?: { [ln: string]: string };
  activationDescription?: { [ln: string]: string };
  activationFieldPlaceholder?: { [ln: string]: string };
  data?: WidgetType;
}

export interface CalendarNews {
  id?: string;
  quote?: string;
  day: number;
  dayOfWeek: number;
  month: number;
}

export type WidgetType = CalendarNews;