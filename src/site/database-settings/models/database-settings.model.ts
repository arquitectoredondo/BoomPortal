export interface DatabaseSettings {
  uuid: string;
  name: string;
  editedBy: string;
  publicationDate?: Date;
  description: string;
  visibility: boolean;
  canRevert?: boolean;
  cover: string;
  css?: string;
  eans: string[];
  boomDatabaseId: string;
  url: string;
  revertedBy: string;
  publisher: string;
  publishedBy: string;
  createdBy: string;
  openAccess: boolean;
}
