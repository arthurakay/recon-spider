import {initStores} from '../stores/_AllStores';

/**
 * Initialize Socket.IO connection
 */
export function initSocket() {
    return new Promise((resolve) => {
        const global = (<any>window);
        global.SOCKET = global.io();

        initStores();
        resolve();
    });
}