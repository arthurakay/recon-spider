import * as React from 'react';
import {Provider} from 'mobx-react';
import Stores from '../stores/_AllStores';
import Config from './Config';
import MainContent from './MainContent';

const PageWrapper = () => (
    <div id="main" className="container-fluid">
        <div className="row">
            <div className="col-md-3">
                <Config />
            </div>
            <div className="col-md-9">
                <MainContent />
            </div>
        </div>
    </div>
);

const PageWrapperProvider = () => (
    <Provider
        headerStore={Stores.headerStore}
        crawlerStore={Stores.crawlerStore}
        sitemapStore={Stores.sitemapStore}
    >
        <PageWrapper />
    </Provider>
);

export default PageWrapperProvider;