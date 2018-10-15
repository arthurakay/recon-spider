import * as React from 'react';
import {inject, observer} from 'mobx-react';

interface MetaTagsProps {
    metaTagsStore?: any
}

@inject('metaTagsStore') @observer
export default class MetaTags extends React.Component<MetaTagsProps, {}> {

    render() {
        const rows: any = [];

        for (let i=0; i<this.props.metaTagsStore.data.length; i++) {
            const row = this.props.metaTagsStore.data[i];

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
                        <th>Meta Tag</th>
                        <th>Values</th>
                    </tr>
                    {rows}
                </table>
            </div>
        );
    }
}