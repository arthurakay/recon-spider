import * as React from 'react';
import {inject, observer} from 'mobx-react';
import ValueItem from '../models/base/ValueItem';
import {Table} from 'antd';

const HeaderValues = (values: Array<any>) => {
    const valueItems:any = [];

    for (let j=0; j<values.length; j++) {
        let valueItem: ValueItem = values[j];

        valueItems.push(<li>{valueItem.name}</li>);
    }

    return (
        <ul>{valueItems}</ul>
    );
};

interface HeadersProps {
    headerStore?: any
}

@inject('headerStore') @observer
export default class Headers extends React.Component<HeadersProps, {}> {
    render() {
        const columns = [{
            title: 'Header',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Value',
            dataIndex: 'values',
            key: 'values',
            render: HeaderValues
        }];

        return  (
            <Table columns={columns} dataSource={this.props.headerStore.data} />
        );
    }
}