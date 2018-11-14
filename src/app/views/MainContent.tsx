import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {Tabs, Icon} from 'antd';

import Loading from '../components/Loading';
import Headers from '../components/Headers';
import MetaTags from '../components/MetaTags';
import NsLookup from '../components/NsLookup';
import RetireJs from '../components/RetireJs';
import Wappalyzer from '../components/Wappalyzer';

const TabPane = Tabs.TabPane;

interface MainContentProps {
    crawlerStore?: any
}

@inject('crawlerStore') @observer
export default class MainContent extends React.Component<MainContentProps, {}> {
    render() {
        return (
            <div className="MainContent-view">
                <Loading loading={this.props.crawlerStore.loading} />

                <Tabs
                    defaultActiveKey="1"
                >
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
                </Tabs>
            </div>
        );
    }
}