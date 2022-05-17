import {
  STORE_TOKENS_START,
  STORE_TOKENS_SUCCESS,
  STORE_TOKENS_ERROR,
} from './actionTypes';

export default async ({
  dispatch,
  tokens,
  tokenKey,
}) => {
  try {
    dispatch({
      type: STORE_TOKENS_START,
      ...tokens,
      tokenKey,
    });

    dispatch({
      type: STORE_TOKENS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: STORE_TOKENS_ERROR,
      error,
    });
  }
};
