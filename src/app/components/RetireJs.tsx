import * as React from 'react';
import {inject, observer} from 'mobx-react';
import ValueItem from '../models/base/ValueItem';
import {Table, Spin} from 'antd';

const RetireJsValues = (values: Array<any>) => {
    const valueItems:any = [];
    const info:any = [];

    for (let j=0; j<values.length; j++) {
        let valueItem: ValueItem = values[j];

        for (let k=0; k<valueItem.info.length; k++) {
            let infoItem: any = valueItem.info[k];
            info.push(<Vulnerability {...infoItem} />);
        }

        valueItems.push(
            <li>
                {valueItem.name}
                <ul>{info}</ul>
            </li>
        );
    }

    return (
        <ul>{valueItems}</ul>
    );
};

interface VulnerabilityProp {
    severity: string;
    identifiers: {
        CVE: Array<string>;
        issue: string;
        summary: string;
    };
    info: Array<string>;
}

const Vulnerability = (props: VulnerabilityProp) => {
    return (
        <div className="retirejs-vulnerability">
            <h4>Issue: {props.identifiers.summary}</h4>
            <p>Severity: {props.severity}</p>
            <p>CVEs: {props.identifiers.CVE.join(', ')}</p>
        </div>
    );
};

interface RetireJsProps {
    retireJsStore?: any
}

@inject('retireJsStore') @observer
export default class RetireJs extends React.Component<RetireJsProps, {}> {
    render() {
        const columns = [{
            title: 'Header',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Version / Info',
            dataIndex: 'values',
            key: 'values',
            render: RetireJsValues
        }];

        return  (
            <Spin tip="Loading..." spinning={this.props.retireJsStore.loading}>
                <Table columns={columns} dataSource={this.props.retireJsStore.data} />
            </Spin>
        );
    }
}