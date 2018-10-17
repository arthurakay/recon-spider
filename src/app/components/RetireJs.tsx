import * as React from 'react';
import {inject, observer} from 'mobx-react';
import ValueItem from '../models/base/ValueItem';

interface RetireJsProps {
    retireJsStore?: any
}

@inject('retireJsStore') @observer
export default class RetireJs extends React.Component<RetireJsProps, {}> {

    render() {
        const rows: any = [];

        for (let i=0; i<this.props.retireJsStore.data.length; i++) {
            const row = this.props.retireJsStore.data[i];

            const values:any = [];

            for (let j=0; j<row.values.length; j++) {
                let valueItem: ValueItem = row.values[j];

                values.push(<li>{valueItem.name}</li>);
            }

            rows.push(
                <tr>
                    <td>{row.name}</td>
                    <td><ul>{values}</ul></td>
                </tr>
            );
        }

        return  (
            <div id="Headers">
                <table cellPadding={0} cellSpacing={0} style={{width: '100%'}}>
                    <tr>
                        <th>JS Library</th>
                        <th>Version</th>
                    </tr>
                    {rows}
                </table>
            </div>
        );
    }
}