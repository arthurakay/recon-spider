import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {Tabs, Icon} from 'antd';

import Headers from '../components/Headers';
import MetaTags from '../components/MetaTags';
import NsLookup from '../components/NsLookup';
import RetireJs from '../components/RetireJs';
import Wappalyzer from '../components/Wappalyzer';
import WhoIs from '../components/WhoIs';
import Dirb from '../components/Dirb';
import Status from '../components/Status';

const TabPane = Tabs.TabPane;

interface MainContentProps {
    crawlerStore?: any
}

@inject('crawlerStore') @observer
export default class MainContent extends React.Component<MainContentProps, {}> {
    render() {
        return (
            <div className="MainContent-view">
                <Tabs
                    defaultActiveKey="0"
                >
                    <TabPane
                        tab={<span><Icon type="loading" />Status</span>}
                        key="0"
                    >
                        <Status/>
                    </TabPane>
                    <TabPane
                        tab={<span><Icon type="cloud" />NSLookup</span>}
                        key="1"
                    >
                        <NsLookup />
                    </TabPane>
                    <TabPane
                        tab={<span><Icon type="global" />HTTP Headers</span>}
                        key="2"
                    >
                        <Headers />
                    </TabPane>
                    <TabPane
                        tab={<span><Icon type="code" />Meta Tags</span>}
                        key="3"
                    >
                        <MetaTags />
                    </TabPane>
                    <TabPane
                        tab={<span><Icon type="exception" />RetireJS</span>}
                        key="4"
                    >
                        <RetireJs />
                    </TabPane>
                    <TabPane
                        tab={<span><Icon type="desktop" />Wappalyzer</span>}
                        key="5"
                    >
                        <Wappalyzer />
                    </TabPane>
                    <TabPane
                        tab={<span><Icon type="question-circle" />WhoIs</span>}
                        key="6"
                    >
                        <WhoIs />
                    </TabPane>
                    <TabPane
                        tab={<span><Icon type="audit" />dirb</span>}
                        key="7"
                    >
                        <Dirb />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}