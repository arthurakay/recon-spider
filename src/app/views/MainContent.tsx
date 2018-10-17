import * as React from 'react';
import {inject, observer} from 'mobx-react';
import Loading from '../components/Loading';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import Headers from '../components/Headers';
import MetaTags from '../components/MetaTags';
import NsLookup from '../components/NsLookup';
import RetireJs from '../components/RetireJs';

interface MainContentProps {
    crawlerStore?: any
}

@inject('crawlerStore') @observer
export default class MainContent extends React.Component<MainContentProps, {}> {
    render() {
        return (
            <div className="MainContent-view">
                <Loading loading={this.props.crawlerStore.loading} />

                <Tabs>
                    <TabList>
                        <Tab>NsLookup</Tab>
                        <Tab>HTTP Headers</Tab>
                        <Tab>Meta Tags</Tab>
                        <Tab>JS Libraries</Tab>
                    </TabList>

                    <TabPanel>
                        <NsLookup />
                    </TabPanel>
                    <TabPanel>
                        <Headers />
                    </TabPanel>
                    <TabPanel>
                        <MetaTags />
                    </TabPanel>
                    <TabPanel>
                        <RetireJs />
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}