import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {Spin} from 'antd';

interface WhoIsProps {
    whoisStore?: any
}
@inject('whoisStore') @observer
export default class WhoIs extends React.Component<WhoIsProps, {}> {
    render() {
        return (
            <div className="whois">
                <Spin tip="Loading..." spinning={this.props.whoisStore.loading}>
                    <pre>{this.props.whoisStore.data && this.props.whoisStore.data.value}</pre>
                </Spin>
            </div>
        );
    }
}