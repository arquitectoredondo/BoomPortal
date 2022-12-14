import { PageWidget } from '../../../shared/models/layout.model';
import { Page } from '../../pages/models/page.model';

export interface CalendarNewsPage {
  uuid: string;
  label: string;
  canRevert: boolean;
  createdBy: string;
  creationDate: string;
  link: string;
  visibility: boolean;
  parentUuid: string;
  seoTitle: string;
  seoDescription: string;
}

export interface CalendarNewsPageDetails extends Page {
  pageWidgets: PageWidget[];
}
