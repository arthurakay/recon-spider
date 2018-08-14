import * as React from 'react';
import {inject, observer} from 'mobx-react';
import Loading from '../components/Loading';
import TabPanel from '../components/TabPanel';

interface MainContentProps {
    crawlerStore?: any
}

@inject('crawlerStore') @observer
export default class MainContent extends React.Component<MainContentProps, {}> {
    render() {
        if (this.props.crawlerStore.loading) {
            return (<Loading loading={true} />);
        }

        return (
            <div className="MainContent-view">
                <Loading loading={this.props.crawlerStore.loading} />
                <TabPanel tabs={[
                    {name: 'One', component: <div />},
                    {name: 'Two', component: <div />},
                    {name: 'Three', component: <div />}
                ]} />
            </div>
        );
    }
}