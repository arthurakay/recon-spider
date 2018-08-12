import Header from '../models/Header';
import MetaTag from '../models/MetaTag';

interface ApiResponse {
    headers: Array<Header>,
    metaTags: Array<MetaTag>,
    url: Array<string>
}

/**
 * Initialize Socket.IO connection
 */
export function initSocket(): void {
    const global = (<any>window);
    global.SOCKET = global.io();

    global.SOCKET.on('api', (jsonMsg: string) => {
        const response: ApiResponse = JSON.parse(jsonMsg);

        console.log(response);
    });
}