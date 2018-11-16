import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {Spin} from 'antd';

interface NsLookupProps {
    nsLookupStore?: any
}
@inject('nsLookupStore') @observer
export default class NsLookup extends React.Component<NsLookupProps, {}> {
    render() {
        return (
            <div className="nslookup">
                <Spin tip="Loading..." spinning={this.props.nsLookupStore.loading}>
                    <pre>{this.props.nsLookupStore.data && this.props.nsLookupStore.data.value}</pre>
                </Spin>
            </div>
        );
    }
}