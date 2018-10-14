import * as React from 'react';
import {inject, observer} from 'mobx-react';
import Loading from '../components/Loading';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import Headers from './Headers';

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
                        <Tab>HTTP Response Headers</Tab>
                    </TabList>

                    <TabPanel>
                        <Headers />
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}