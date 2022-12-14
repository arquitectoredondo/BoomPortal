import { selectLayoutState, selectSidebarCollapsed } from './layout.selectors';

const appState: any = {
  core: {
    layout: {
      sidebarCollapsed: false,
      themesCategoriesCollapsed: true,
    },
  },
};

describe('auth selectors', () => {
  it('should handle selectAuthState', () => {
    expect(selectLayoutState(appState)).toEqual({
      sidebarCollapsed: false,
      themesCategoriesCollapsed: true,
    });
  });

  it('should handle selectLoginLoading', () => {
    expect(selectSidebarCollapsed(appState)).toEqual(false);
  });
});
