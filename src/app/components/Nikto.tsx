import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {Spin} from 'antd';

interface NiktoProps {
    niktoStore?: any
}
@inject('niktoStore') @observer
export default class Nikto extends React.Component<NiktoProps, {}> {
    render() {
        return (
            <div className="nikto">
                <Spin tip="Loading..." spinning={this.props.niktoStore.loading}>
                    <pre>{this.props.niktoStore.data && this.props.niktoStore.data.value}</pre>
                </Spin>
            </div>
        );
    }
}