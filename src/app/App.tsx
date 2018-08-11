import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Config from './components/Config';

declare let module: any;

ReactDOM.render(
    <Config />,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}