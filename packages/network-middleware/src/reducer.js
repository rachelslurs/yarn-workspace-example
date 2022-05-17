import {
  SET_SCOPE,
  STORE_TOKENS_START,
  REMOVE_TOKENS_START,
} from './actionTypes';

const initialState = {
  access_token: {},
  refresh_token: {},
  scope: 'user',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SCOPE:
      return {
        ...state,
        scope: action.scope,
      };
    case STORE_TOKENS_START:
      return {
        ...state,
        access_token: {
          ...state.access_token,
          [action.tokenKey]: action.access_token || state.access_token[action.tokenKey] || null,
        },
        refresh_token: {
          ...state.refresh_token,
          [action.tokenKey]: action.refresh_token || state.refresh_token[action.tokenKey] || null,
        },
      };

    case REMOVE_TOKENS_START:
      return {
        ...state,
        access_token: {
          ...state.access_token,
          [action.tokenKey]: null,
        },
        refresh_token: {
          ...state.access_token,
          [action.tokenKey]: null,
        },
      };

    default:
      return state;
  }
};
