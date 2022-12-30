import { ItemTranslations } from "./menuItem.model";

export interface FooterColumn {
  columnTitle?: ItemTranslations;
  rows?: FooterRow[];
}
export interface FooterRow {
  label?: ItemTranslations;
  element?: string;
  id: number;
  type: number;
}
export enum FooterTypeController {
  "LINK" = 0,
  "PHONE" = 1,
  "EMAIL" = 2,
  "PAGE" = 3,
}
