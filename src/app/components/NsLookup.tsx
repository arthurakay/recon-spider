import * as React from 'react';
import {inject, observer} from 'mobx-react';

interface NsLookupProps {
    nsLookupStore?: any
}
@inject('nsLookupStore') @observer
export default class NsLookup extends React.Component<NsLookupProps, {}> {
    render() {
        return (
            <div className="nslookup">
                <pre>{this.props.nsLookupStore.data && this.props.nsLookupStore.data.value}</pre>
            </div>
        );
    }
}