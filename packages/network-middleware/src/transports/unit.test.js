import { receiver, sender } from './broadcastChannel.js'
import { clearNodeFolder } from 'broadcast-channel'

describe('broadcastchannel unit tests', () => {
    beforeAll(async () => {
        const hasRun = await clearNodeFolder()
        console.log(hasRun) // > true on NodeJs, false on Browsers
    })

    // skipping because https://piconetworks.atlassian.net/browse/EN-625
    it.skip('should test receiver and sender', () => {
        receiver({
            data: 'data',
            channelId: 'id',
            subscribe: () => null,
            onSubscribeChange: () => null,
        })

        sender({
            config: 'config',
            channelId: 'id',
        })

        try {
            receiver({
                data: 'data'
            })
        } catch (error) {
            expect(error).toEqual(new Error('unable to determine channel id'))
        }

        try {
            sender()
        } catch (error) {
            expect(error).toEqual(new Error('Cannot read property \'config\' of undefined'))
        }
    })

    afterAll(async () => {
        const hasRun = await clearNodeFolder()
        console.log(hasRun) // > true on NodeJs, false on Browsers
    })
})