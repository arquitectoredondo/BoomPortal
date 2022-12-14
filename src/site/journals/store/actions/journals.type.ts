import { Journal } from '../../../site/models/journal.model';
export const LOAD_JOURNALS: string = '[ADMIN JOURNAL] LOAD_JOURNALS';
export const LOAD_JOURNALS_SUCCESS: string =
  '[ADMIN JOURNAL] LOAD_JOURNALS_SUCCESS';
export const LOAD_JOURNALS_FAILURE: string =
  '[ADMIN JOURNAL] LOAD_JOURNALS_FAILURE';
export const OPEN_CLOSE_CREATE_DIALOG: string =
  '[ADMIN JOURNAL] OPEN_CLOSE_CREATE_DIALOG';

export interface LoadJournalsSuccess {
  type: typeof LOAD_JOURNALS_SUCCESS;
  payload: Journal[];
}

export interface LoadJournalsFailure {
  type: typeof LOAD_JOURNALS_FAILURE;
  payload: string;
}

export interface LoadJournals {
  type: typeof LOAD_JOURNALS;
}

export interface OpenCloseCreateDialog {
  type: typeof OPEN_CLOSE_CREATE_DIALOG;
  payload: boolean;
}

export type JournalActionTypes =
  | LoadJournalsSuccess
  | LoadJournalsFailure
  | LoadJournals
  | OpenCloseCreateDialog;
