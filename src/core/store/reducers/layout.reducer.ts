import {
  LayoutActionTypes,
  CHANGE_SIDEBAR_LAYOUT,
} from '../actions/layout.types';

export interface LayoutState {
  sidebarCollapsed: boolean;
  themesCategoriesCollapsed: boolean;
}

const initialState: LayoutState = {
  sidebarCollapsed: false,
  themesCategoriesCollapsed: true,
};

const layoutReducer = (
  state: LayoutState = initialState,
  action: LayoutActionTypes
) => {
  switch (action.type) {
    case CHANGE_SIDEBAR_LAYOUT: {
      return {
        ...state,
        sidebarCollapsed: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default layoutReducer;
