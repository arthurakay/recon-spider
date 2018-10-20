import * as React from 'react';
import {Provider} from 'mobx-react';
import Stores from '../stores/_AllStores';
import LeftContent from './LeftContent';
import MainContent from './MainContent';

const PageWrapper = () => (
    <div id="main" className="container-fluid">
        <div className="row">
            <div className="col-md-3">
                <LeftContent />
            </div>
            <div className="col-md-9">
                <MainContent />
            </div>
        </div>
    </div>
);

const PageWrapperProvider = () => (
    <Provider
        crawlerStore={Stores.crawlerStore}
        headerStore={Stores.headerStore}
        metaTagsStore={Stores.metaTagsStore}
        nsLookupStore={Stores.nsLookupStore}
        retireJsStore={Stores.retireJsStore}
        sitemapStore={Stores.sitemapStore}
        wappalyzerStore={Stores.wappalyzerStore}
    >
        <PageWrapper />
    </Provider>
);

export default PageWrapperProvider;