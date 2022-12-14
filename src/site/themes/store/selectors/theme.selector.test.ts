import {
  selectThemeState,
  selectThemes,
  selectThemesPending,
  selectThemesError,
  selectThemeisSelectedID,
  selectIsAnyThemeSelected,
} from './theme.selectors';

const appState: any = {
  theme: {
    themes: [],
    loading: false,
    error: true,
    themeIsSelected: false,
    themeSelectedID: '',
  },
};

describe('Theme selectors', () => {
  it('should handle selectPortalPagesState', () => {
    expect(selectThemeState(appState)).toEqual({
      themes: [],
      loading: false,
      error: true,
      themeIsSelected: false,
      themeSelectedID: '',
    });
  });

  it('should handle selectThemes', () => {
    expect(selectThemes(appState)).toEqual([]);
  });

  it('should handle selectThemesPending', () => {
    expect(selectThemesPending(appState)).toEqual(false);
  });

  it('should handle selectThemesError', () => {
    expect(selectThemesError(appState)).toEqual(true);
  });

  it('should handle selectThemeisSelectedID', () => {
    expect(selectThemeisSelectedID(appState)).toEqual('');
  });
  it('should handle selectIsAnyThemeSelected', () => {
    expect(selectIsAnyThemeSelected(appState)).toEqual(false);
  });
});
