import * as React from 'react';
import {inject, observer} from 'mobx-react';

interface HeadersProps {
    headerStore?: any
}

@inject('headerStore') @observer
export default class Headers extends React.Component<HeadersProps, {}> {

    render() {
        const rows: any = [];

        for (let i=0; i<this.props.headerStore.data.length; i++) {
            const row = this.props.headerStore.data[i];

            const values:any = [];

            for (let j=0; j<row.values.length; j++) {
                values.push(<li>{row.values[j]}</li>);
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
                        <th>Header</th>
                        <th>Values</th>
                    </tr>
                    {rows}
                </table>
            </div>
        );
    }
}