import * as React from 'react';
import {inject, observer} from 'mobx-react';
import ValueItem from '../models/base/ValueItem';
import {Table, Spin} from 'antd';

const MetaTagValues = (values: Array<any>) => {
    const valueItems:any = [];

    for (let j=0; j<values.length; j++) {
        let valueItem: ValueItem = values[j];

        valueItems.push(<li>{valueItem.name}</li>);
    }

    return (
        <ul>{valueItems}</ul>
    );
};

interface MetaTagsProps {
    metaTagsStore?: any
}

@inject('metaTagsStore') @observer
export default class MetaTags extends React.Component<MetaTagsProps, {}> {
    render() {
        const columns = [{
            title: 'Meta Tag',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Value',
            dataIndex: 'values',
            key: 'values',
            render: MetaTagValues
        }];

        return (
            <Spin tip="Loading..." spinning={this.props.metaTagsStore.loading}>
                <Table columns={columns} dataSource={this.props.metaTagsStore.data} />
            </Spin>
        );
    }
}