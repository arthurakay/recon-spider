import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {Spin} from 'antd';

interface DirbProps {
    dirbStore?: any
}
@inject('dirbStore') @observer
export default class Dirb extends React.Component<DirbProps, {}> {
    render() {
        return (
            <div className="dirb">
                <Spin tip="Loading..." spinning={this.props.dirbStore.loading}>
                    <pre>{this.props.dirbStore.data && this.props.dirbStore.data.value}</pre>
                </Spin>
            </div>
        );
    }
}