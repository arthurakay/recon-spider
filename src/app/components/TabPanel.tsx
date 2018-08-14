import * as React from 'react';
import classnames from 'classnames';

interface Tab {
    name: string;
    component: any;
}

interface TabPanelProps {
    activeTab: number;
    tabs: Array<Tab>
}

export default class TabPanel extends React.Component<TabPanelProps, {}> {
    static defaultProps = {
        activeTab: 0
    };

    state = {
        activeTab: 0
    };

    constructor(props: TabPanelProps) {
        super(props);

        this.setState({
            activeTab: props.activeTab
        });
    }

    tabClick = (tabNumber: number) => {
        this.setState({activeTab: tabNumber});
    };

    render() {
        const tabs = [];

        for (let i = 0; i < this.props.tabs.length; i++) {
            const tab = this.props.tabs[i];

            tabs.push(
                <li
                    key={i}
                    onClick={() => this.tabClick(i)}
                    className={classnames({activeTab: this.state.activeTab === i})}
                ><a>{tab.name}</a></li>
            );
        }

        return (
            <div className="TabPanel-comp">
                <ul>
                    {tabs}
                </ul>
            </div>
        );
    }
}