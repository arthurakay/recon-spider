import * as React from 'react';
import {inject, observer} from 'mobx-react';
import ValueItem from '../models/base/ValueItem';
import {Table} from 'antd';

const WappValues = (values: Array<any>) => {
    const valueItems:any = [];

    for (let j=0; j<values.length; j++) {
        let valueItem: ValueItem = values[j];

        valueItems.push(<li>{valueItem.name}</li>);
    }

    return (
        <ul>{valueItems}</ul>
    );
};

interface WappalyzerProps {
    wappalyzerStore?: any
}

@inject('wappalyzerStore') @observer
export default class Wappalyzer extends React.Component<WappalyzerProps, {}> {
    render() {
        const columns = [{
            title: 'Library',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Value',
            dataIndex: 'values',
            key: 'values',
            render: WappValues
        }];

        return  (
            <Table columns={columns} dataSource={this.props.wappalyzerStore.data} />
        );
    }
}