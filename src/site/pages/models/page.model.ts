import { PageWidget } from '../../../shared/models/layout.model';

export interface Page {
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

export interface PageDetails extends Page {
  pageWidgets: PageWidget[];
}
