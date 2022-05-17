/*global async */
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

export default class Request {
    constructor(params = {}) {
        const {
            retryDelay = 1000,
            concurrentRequests = 1,
            transport,
            preRequestHook,
            postRequestHook,
        } = params

        this.retryDelay = retryDelay
        this.concurrentRequests = concurrentRequests
        this.requests = {}
        this.transport = transport || axios
        this.preRequestHook = preRequestHook || async ((config) => config)
        this.postRequestHook = postRequestHook || async (({ response }) => response)
    }

    async send({
        config,
        onStart = () => {},
        onSuccess = () => {},
        onError = () => {},
    }) {
        const id = config.id || uuidv4()

        config.id = id

        config = await this.preRequestHook(config)

        await onStart({
            id,
            config
        })

        let requestInProgress = true
        while (requestInProgress) {
            const requestsInProgress = Object.keys(this.requests).length
            const isRequestQueueReady = requestsInProgress < this.concurrentRequests

            if (isRequestQueueReady) {
                try {
                    if (!config) {
                        throw Error('config must be provided')
                    }

                    this.requests[id] = config

                    let response = await this.transport(config)

                    if (!response || !response.data) {
                        throw {
                            message: 'no data in response',
                            response,
                        }
                    }

                    if (response?.data?.error) {
                        throw response.data
                    }

                    requestInProgress = false

                    response = await this.postRequestHook({
                        config,
                        response
                    })

                    delete this.requests[id]

                    await onSuccess({
                        id,
                        response,
                        config,
                    })

                    return response
                } catch (error) {
                    requestInProgress = false
                    delete this.requests[id]

                    await onError({
                        id,
                        error,
                        config,
                    })

                    throw error
                }
            }

            await this.wait(this.retryDelay)
        }
    }

    wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
}
