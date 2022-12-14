import { PageWidget } from '../../../shared/models/layout.model';
import { Page } from '../../pages/models/page.model';

export interface JournalPage {
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
  publishDate: string;
}

export interface JournalPageDetails extends Page {
  pageWidgets: PageWidget[];
}
