import * as React from 'react';
import {inject, observer} from 'mobx-react';

interface DirbProps {
    dirbStore?: any
}
@inject('dirbStore') @observer
export default class Dirb extends React.Component<DirbProps, {}> {
    render() {
        return (
            <div className="dirb">
                <pre>{this.props.dirbStore.data && this.props.dirbStore.data.value}</pre>
            </div>
        );
    }
}