import {functions} from './firebase'

export const sendMessage = (title, body, url, img_link) => {
    var sendMessage = functions.httpsCallable('sendMessage');
    return sendMessage({notification: {
        title, body, url, img_link
    }})
}