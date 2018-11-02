import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PageWrapper from './views/PageWrapper';
import {initSocket} from './utils/SocketUtils';
import {initStores} from './stores/_AllStores';

import 'antd/dist/antd.css';

declare let module: any;

initSocket()
    .then(() => {
        ReactDOM.render(
            <PageWrapper />,
            document.getElementById('root')
        );

        if (module.hot) {
            module.hot.accept();
        }
    })
    .then(() => {
        initStores();
    });