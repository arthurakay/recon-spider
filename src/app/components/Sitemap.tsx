import * as React from 'react';
import {inject, observer} from 'mobx-react';
import RCTree from 'rc-tree';
import 'rc-tree/assets/index.css';

interface TreeProps {
    sitemapStore?: any
}

const TreeComponent:any = RCTree;

@inject('sitemapStore') @observer
export default class Sitemap extends React.Component<TreeProps, {}> {
    render() {
        return (
            <div>
                <h2>Sitemap</h2>

                <TreeComponent
                    className="myCls"
                    showLine
                    selectable={ false }
                    defaultExpandAll
                    onExpand={() => {}}
                    onSelect={() => {}}
                    onCheck={() => {}}
                    treeData={this.props.sitemapStore.data}
                />
            </div>
        );
    }
}