import * as React from 'react';
import {inject, observer} from 'mobx-react';
import ValueItem from '../models/base/ValueItem';

interface WappalyzerProps {
    wappalyzerStore?: any
}

@inject('wappalyzerStore') @observer
export default class Wappalyzer extends React.Component<WappalyzerProps, {}> {

    render() {
        const rows: any = [];

        for (let i=0; i<this.props.wappalyzerStore.data.length; i++) {
            const row = this.props.wappalyzerStore.data[i];

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
            <div id="Wappalyzer">
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