import reducer, { LayoutState } from './layout.reducer';
import { changeSidebarLayout } from '../actions/layout.actions';

const initialState: LayoutState = {
  sidebarCollapsed: false,
  themesCategoriesCollapsed: true
};

describe('layout reducer', () => {
  it('should handle CHANGE_SIDEBAR_LAYOUT', () => {
    expect(reducer(initialState, changeSidebarLayout(true))).toEqual({
      ...initialState,
      sidebarCollapsed: true,
      themesCategoriesCollapsed: true
    });
  });
});
