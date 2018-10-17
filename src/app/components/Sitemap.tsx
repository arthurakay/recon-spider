import * as React from 'react';
import {inject, observer} from 'mobx-react';
import RCTree from 'rc-tree';
import 'rc-tree/assets/index.css';

interface TreeProps {
    sitemapStore?: any
}

interface NodeSelectedEvent {
    selected: boolean;
    selectedNodes: Array<any>;
    node: any;
    event: any;
    nativeEvent: any;
}

const TreeComponent:any = RCTree;

@inject('sitemapStore') @observer
export default class Sitemap extends React.Component<TreeProps, {}> {
    onSelect = (selectedKeys: Array<string>, info: NodeSelectedEvent) => {
        if (selectedKeys.length === 0) {
            // de-selected
            return;
        }

        console.log(selectedKeys, info);
    }

    render() {
        return (
            <div>
                <h2>Sitemap</h2>

                <TreeComponent
                    className="myCls"
                    showLine
                    selectable
                    defaultExpandAll
                    onSelect={this.onSelect}
                    treeData={this.props.sitemapStore.data}
                />
            </div>
        );
    }
}