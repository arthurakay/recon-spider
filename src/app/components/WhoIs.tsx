import * as React from 'react';
import {inject, observer} from 'mobx-react';

interface WhoIsProps {
    whoisStore?: any
}
@inject('whoisStore') @observer
export default class WhoIs extends React.Component<WhoIsProps, {}> {
    render() {
        return (
            <div className="whois">
                <pre>{this.props.whoisStore.data && this.props.whoisStore.data.value}</pre>
            </div>
        );
    }
}