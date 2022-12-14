import { Publication } from '../../site/catalog/models/portal.catalog.model';

export interface CatalogSettings {
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
