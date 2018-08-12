import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Config from './components/Config';
import {initSocket} from './utils/SocketUtils';

declare let module: any;

initSocket();

ReactDOM.render(
    <Config />,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}