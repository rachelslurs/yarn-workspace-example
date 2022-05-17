import jwtDecode from 'jwt-decode'

import {
    REQUEST,
    REQUEST_START,
    REQUEST_SUCCESS,
    REQUEST_ERROR,
    GET_TOKEN,
    GET_TOKEN_START,
    GET_TOKEN_SUCCESS,
    GET_TOKEN_ERROR,
    REFRESH_TOKEN,
    REFRESH_TOKEN_START,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_ERROR,
    SET_SCOPE,
    STORE_TOKENS,
    STORE_TOKENS_START,
    STORE_TOKENS_SUCCESS,
    STORE_TOKENS_ERROR,
    REMOVE_TOKENS,
    REMOVE_TOKENS_START,
    REMOVE_TOKENS_SUCCESS,
    REMOVE_TOKENS_ERROR,
} from './actionTypes'

import reducer from './reducer'
import Request from './request'
import isExpired from './isExpired'
import storeTokens from './storeTokens'
import removeTokens from './removeTokens'
import refreshToken from './refreshToken'
import * as broadcastChannelTransport from './transports/broadcastChannel'

let request = null

const networkMiddleware = ({
    accessTokenAdapters,
    refreshTokenAdapters,
    tokenKey = 'default',
    concurrentRequests,
    transport,
    preRequestHook = (async (config) => config),
    postRequestHook = (async ({ response }) => response),
}) => ({
    dispatch,
    getState
}) => (next) => async (action) => {
    const state = getState()

    if (action && action.type) {
        await next(action)
    } else {
        return
    }

    if (request === null) {
        request = new Request({
            transport,
            concurrentRequests,
            preRequestHook,
            postRequestHook
        })
    }

    if (action.type === REMOVE_TOKENS) {
        removeTokens({
            dispatch,
            tokenKey,
        })
    }

    if (action.type === STORE_TOKENS) {
        let parsedTokens
        if (action.data) {
            parsedTokens = await accessTokenAdapters.response({
                data: action.data,
                state,
            })
        } else {
            parsedTokens = {
                access_token: action.access_token,
                refresh_token: action.refresh_token,
                scope: state._network.scope,
            }
        }

        storeTokens({
            dispatch,
            tokens: parsedTokens,
            tokenKey,
        })
    }

    if (action.type === REFRESH_TOKEN) {
        const refreshConfig = refreshTokenAdapters.request({
            access_token: state._network.access_token[tokenKey],
            refresh_token: state._network.refresh_token[tokenKey],
            scope: state._network.scope,
            decode: (encodedToken) => jwtDecode(encodedToken),
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
        })

        storeTokens({
            dispatch,
            tokens: parsedRefreshTokens,
            tokenKey,
        })
    }

    if (action.type === REQUEST) {
        const refresh_token = state._network.refresh_token[tokenKey]

        let access_token = state._network.access_token[tokenKey] || null
        if (refresh_token && (!access_token || isExpired(access_token))) {
            const tokens = await refreshToken({
                tokenKey,
                refreshTokenAdapters,
                state,
                dispatch,
                request,
            })

            access_token = tokens.access_token || tokens.token || null
        }

        const headers = {
            ...(action?.config?.headers || {})
        }

        if (access_token) {
            headers.Authorization = `Bearer ${access_token}`
        }

        const config = {
            ...action.config,
            headers,
        }

        return await request.send({
            config,
            onStart: (payload) => {
                dispatch({
                    type: REQUEST_START,
                    ...payload,
                })
            },
            onSuccess: (payload) => {
                dispatch({
                    type: REQUEST_SUCCESS,
                    ...payload,
                })
            },
            onError: (payload) => {
                dispatch({
                    type: REQUEST_ERROR,
                    ...payload,
                })
            },
        })
    }

    if (action.type === GET_TOKEN) {
        return await request.send({
            config: action.config,
            onStart: (payload) => {
                dispatch({
                    type: GET_TOKEN_START,
                    ...payload,
                })
            },
            onSuccess: (payload) => {
                dispatch({
                    type: GET_TOKEN_SUCCESS,
                    ...payload,
                })
            },
            onError: (payload) => {
                dispatch({
                    type: GET_TOKEN_ERROR,
                    ...payload,
                })
            },
        })
    }
}

const createNetworkMiddleware = ({
    accessTokenAdapters,
    refreshTokenAdapters,
    tokenKey,
    concurrentRequests,
    transport,
    preRequestHook,
    postRequestHook
}) => networkMiddleware({
    accessTokenAdapters,
    refreshTokenAdapters,
    tokenKey,
    concurrentRequests,
    transport,
    preRequestHook,
    postRequestHook
})

export default createNetworkMiddleware

export {
    reducer as _network,
    REQUEST,
    REQUEST_START,
    REQUEST_SUCCESS,
    REQUEST_ERROR,
    GET_TOKEN,
    GET_TOKEN_START,
    GET_TOKEN_SUCCESS,
    GET_TOKEN_ERROR,
    REFRESH_TOKEN,
    REFRESH_TOKEN_START,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_ERROR,
    SET_SCOPE,
    STORE_TOKENS,
    STORE_TOKENS_START,
    STORE_TOKENS_SUCCESS,
    STORE_TOKENS_ERROR,
    REMOVE_TOKENS,
    REMOVE_TOKENS_START,
    REMOVE_TOKENS_SUCCESS,
    REMOVE_TOKENS_ERROR,
    broadcastChannelTransport
}

