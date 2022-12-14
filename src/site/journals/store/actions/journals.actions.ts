import {
  JournalActionTypes,
  OPEN_CLOSE_CREATE_DIALOG,
  LOAD_JOURNALS_FAILURE,
  LOAD_JOURNALS_SUCCESS,
  LOAD_JOURNALS,
} from './journals.type';
import { Journal } from '../../../site/models/journal.model';

export const loadJournals = (): JournalActionTypes => ({
  type: LOAD_JOURNALS,
});

export const loadJournalsSuccess = (
  journals: Journal[]
): JournalActionTypes => ({
  type: LOAD_JOURNALS_SUCCESS,
  payload: journals,
});

export const loadJournalsFailure = (error: string): JournalActionTypes => ({
  type: LOAD_JOURNALS_FAILURE,
  payload: error,
});

export const openCloseCreationDialog = (
  value: boolean
): JournalActionTypes => ({
  type: OPEN_CLOSE_CREATE_DIALOG,
  payload: value,
});
