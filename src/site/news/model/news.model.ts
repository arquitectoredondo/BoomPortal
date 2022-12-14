export interface PortalNew {
  id: string;
  name: string;
  createdBy: string;
  creationDate: string;
  status: string;
}

export interface NewData {
  id?: string;
  portalUuid?: string;
  title: string;
  image?: any;
  eventDate: any;
  visibleOn: any;
  hideOn: any;
  description: string;
  relatedPublications?: NewRelatedPublication[];
  assignedTaxonomies?: any[];
  portalTaxonomyTree?: any[];
  canRevert?: boolean;
}

export interface NewRelatedPublication {
  id: string;
  title: string;
  author: string;
  type: string;
  uuid: string;
}
