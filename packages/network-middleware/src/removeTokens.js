import {
  REMOVE_TOKENS_START,
  REMOVE_TOKENS_SUCCESS,
  REMOVE_TOKENS_ERROR,
} from './actionTypes';

export default async ({
  dispatch,
  tokens,
  tokenKey,
}) => {
  try {
    dispatch({
      type: REMOVE_TOKENS_START,
      tokenKey,
    });

    dispatch({
      type: REMOVE_TOKENS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_TOKENS_ERROR,
      error,
    });
  }
};
