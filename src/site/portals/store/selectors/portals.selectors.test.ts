import {
  selectPortalsState,
  selectPortals,
  selectPortalsPending,
  selectPortalsError,
  selectPortalsDialogOpen,
  selectPortalsErrorMsg,
} from './portals.selectors';

const appState: any = {
  portals: {
    loading: false,
    error: false,
    errorMsg: 'e',
    dialogOpen: true,
    portals: [],
  },
};

describe('pages selectors', () => {
  it('should handle selectPortalsState', () => {
    expect(selectPortalsState(appState)).toEqual({
      loading: false,
      error: false,
      dialogOpen: true,
      portals: [],
      errorMsg: 'e',
    });
  });

  it('should handle selectPortals', () => {
    expect(selectPortals(appState)).toEqual([]);
  });

  it('should handle selectPortalsPending', () => {
    expect(selectPortalsPending(appState)).toEqual(false);
  });

  it('should handle selectPortalsError', () => {
    expect(selectPortalsError(appState)).toEqual(false);
  });

  it('should handle selectPortalsErrorMsg', () => {
    expect(selectPortalsErrorMsg(appState)).toEqual('e');
  });

  it('should handle selectPortalsDialogOpen', () => {
    expect(selectPortalsDialogOpen(appState)).toEqual(true);
  });
});
