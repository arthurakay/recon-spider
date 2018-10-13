import * as React from 'react';
import {inject, observer} from 'mobx-react';
import Loading from '../components/Loading';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';

interface MainContentProps {
    crawlerStore?: any,
    sitemapStore?: any
}

const TreeComponent:any = Tree;

@inject('crawlerStore', 'sitemapStore') @observer
export default class MainContent extends React.Component<MainContentProps, {}> {
    render() {
        if (this.props.crawlerStore.loading) {
            return (<Loading loading={true} />);
        }

        return (
            <div className="MainContent-view">
                <Loading loading={this.props.crawlerStore.loading} />
                <TreeComponent
                    className="myCls"
                    showLine
                    selectable={ false }
                    defaultExpandAll
                    onExpand={() => {}}
                    onSelect={() => {}}
                    onCheck={() => {}}
                    treeData={this.props.sitemapStore.root}
                />
            </div>
        );
    }
}