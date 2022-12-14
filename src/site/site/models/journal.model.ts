export interface Journal {
  uuid: string;
  name: string;
  editedBy: string;
  publicationDate: string;
  canRevert?: boolean;
  visibility: boolean;
  openAccess?: boolean;
}
