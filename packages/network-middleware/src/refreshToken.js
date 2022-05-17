import jwtDecode from 'jwt-decode'

import {
    REFRESH_TOKEN_START,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_ERROR,
} from './actionTypes'

import storeTokens from './storeTokens'

export default async ({
    refreshTokenAdapters,
    state,
    dispatch,
    request,
    tokenKey,
}) => {
    const refreshConfig = refreshTokenAdapters.request({
        access_token: state._network.access_token[tokenKey],
        refresh_token: state._network.refresh_token[tokenKey],
        decode: (encodedToken) => jwtDecode(encodedToken),
        scope: state._network.scope,
        state,
    })

    const refreshResponse = await request.send({
        config: refreshConfig,
        onStart: (payload) => {
            dispatch({
                type: REFRESH_TOKEN_START,
                ...payload,
            })
        },
        onSuccess: (payload) => {
            dispatch({
                type: REFRESH_TOKEN_SUCCESS,
                ...payload,
            })
        },
        onError: (payload) => {
            dispatch({
                type: REFRESH_TOKEN_ERROR,
                ...payload,
            })
        },
    })

    const parsedRefreshTokens = refreshTokenAdapters.response({
        data: refreshResponse.data,
        state,
    })

    await storeTokens({
        dispatch,
        tokens: parsedRefreshTokens,
        tokenKey,
    })

    return parsedRefreshTokens
}
