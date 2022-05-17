import { BroadcastChannel } from 'broadcast-channel'

import { REQUEST }  from '../actionTypes'

const receiver = ({
    data,
    channelId,
    subscribe,
    onSubscribeChange,
    onInit = () => {},
    custom = {},
}) => {
    if (!channelId) {
        throw new Error('unable to determine channel id')
    }

    const NetworkCommunication = new BroadcastChannel(channelId, {
        webWorkerSupport: false,
    })

    const unsubscribe = subscribe(() => {
        onSubscribeChange({
            unsubscribe: custom.unsubscribe || unsubscribe,
            data,
            NetworkCommunication,
        })
    })

    onInit({ data })
}

const sender = ({
    config,
    channelId,
    custom = {},
}) => {
    const defaults = {
        broadcastChannelOptions: {
            webWorkerSupport: false,
        },
        onMessageParser: ({ id, message }) => {
            if (id === message.id) {
                return message.payload.response
            }

            return false
        },
        postMessageConstructor: ({ config, target, origin }) => {
            const payload = ({
                type: REQUEST,
                id: config.id,
                config,
            })

            if (target) {
                payload.target = target
            }

            if (origin) {
                payload.origin = origin
            }

            return payload
        }
    }

    const broadcastChannelOptions = custom.broadcastChannelOptions
        || defaults.broadcastChannelOptions
    const onMessageParser = custom.onMessageParser
        || defaults.onMessageParser
    const postMessageConstructor = custom.postMessageConstructor
        || defaults.postMessageConstructor

    return new Promise((resolve, reject) => {
        try {
            if (!channelId) {
                throw new Error('unable to obtain channel id')
            }

            const NetworkCommunication = new BroadcastChannel(channelId, broadcastChannelOptions)

            NetworkCommunication.onmessage = (message) => {
                const response = onMessageParser({
                    id: config.id,
                    message,
                })

                if (response) {
                    resolve(response)
                }
            }

            const message = postMessageConstructor({
                config,
                target: custom.target,
                origin: custom.origin,
            })

            NetworkCommunication.postMessage(message)
        } catch (error) {
            reject(error)
        }
    })
}

export {
    receiver,
    sender,
}
