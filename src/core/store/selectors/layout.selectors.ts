import { AppState, selectCoreState } from '../store';
import { LayoutState } from '../reducers/layout.reducer';

export const selectLayoutState = (store: AppState): LayoutState =>
  selectCoreState(store).layout;

export const selectSidebarCollapsed = (store: AppState): boolean =>
  selectLayoutState(store)?.sidebarCollapsed;
