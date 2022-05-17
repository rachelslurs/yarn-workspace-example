import reducer from './reducer'

import {
    SET_SCOPE,
    STORE_TOKENS_START,
    REMOVE_TOKENS_START
} from './actionTypes'

describe('NetworkMiddleware reducer tests', () => {
    const initialState = {
        access_token: {},
        refresh_token: {},
        scope: 'user',
    }

    let nextState
    it('should set correct scope', () => {
        nextState = {
            ...initialState,
            scope: 'guest'
        }

        expect(
            reducer(initialState, {
                type: SET_SCOPE,
                scope: 'guest',
            })
        ).toEqual({
            ...nextState
        })
    })

    it('should set correct tokens', () => {
        nextState = {
            ...initialState,
            access_token: {
                tokenKey: null,
            },
            refresh_token: {
                tokenKey: null,
            },
        }

        expect(
            reducer(initialState, {
                type: STORE_TOKENS_START,
                tokenKey: 'tokenKey',
            })
        ).toEqual({
            ...nextState
        })
    })

    it('should remove tokens', () => {
        nextState = {
            ...initialState,
            access_token: {
                tokenKey: null,
            },
            refresh_token: {
                tokenKey: null,
            },
        }

        expect(
            reducer(initialState, {
                type: REMOVE_TOKENS_START,
                tokenKey: 'tokenKey',
            })
        ).toEqual({
            ...nextState
        })
    })
})
