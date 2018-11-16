import * as React from 'react';
import {inject, observer} from 'mobx-react';
import { Tree, Spin } from 'antd';
import TreeNode from '../models/TreeNode';

const TreeNodeComp = Tree.TreeNode;

interface TreeProps {
    sitemapStore?: any
}

interface TreeState {
    selectedKeys: Array<string>
}

@inject('sitemapStore') @observer
export default class Sitemap extends React.Component<TreeProps, TreeState> {
    state: Readonly<TreeState> = {
        selectedKeys: []
    };

    /*
       TODO: Add icons after the node -- launch page in new window
       TODO: Properly display root node?
     */
    renderTreeNodes = (data: Array<TreeNode>) => {
        return data.map((item: TreeNode) => {
            if (item.children) {
                return (
                    <TreeNodeComp
                        title={item.title}
                        key={item.key}
                        dataRef={item}
                    >
                        {this.renderTreeNodes(item.children)}
                    </TreeNodeComp>
                );
            }
            return <TreeNodeComp {...item} />;
        });
    }

    /*
        TODO: don't allow users to select nodes that aren't actually pages
     */
    onSelect = (selectedKeys: Array<string>, info: any) => {
        this.setState({ selectedKeys });

        if (info.selected) {
            this.props.sitemapStore.setFilter(selectedKeys[0]);
        } else {
            this.props.sitemapStore.setFilter();
        }
    }

    render() {
        return (
            <div>
                <h2>Sitemap</h2>

                <Spin tip="Loading..." spinning={this.props.sitemapStore.loading}>
                    <Tree
                        autoExpandParent
                        defaultExpandAll
                        defaultExpandParent
                        onSelect={this.onSelect}
                        selectedKeys={this.state.selectedKeys}
                    >
                        {this.renderTreeNodes([this.props.sitemapStore.data])}
                    </Tree>
                </Spin>
            </div>
        );
    }
}