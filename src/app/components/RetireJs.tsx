import * as React from 'react';
import {inject, observer} from 'mobx-react';
import ValueItem from '../models/base/ValueItem';

interface VulnerabilityProp {
    severity: string;
    identifiers: {
        CVE: Array<string>;
        issue: string;
        summary: string;
    };
    info: Array<string>;
}

const Vulnerability = (props: VulnerabilityProp) => {
    console.log(props)
    return (
        <div className="retirejs-vulnerability">
            <h4>Issue: {props.identifiers.summary}</h4>
            <p>Severity: {props.severity}</p>
            <p>CVEs: {props.identifiers.CVE.join(', ')}</p>
        </div>
    );
};

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
            const info:any = [];

            for (let j=0; j<row.values.length; j++) {
                let valueItem: ValueItem = row.values[j];

                values.push(<li>{valueItem.name}</li>);

                for (let k=0; k<valueItem.info.length; k++) {
                    let infoItem: any = valueItem.info[k];
                    info.push(<Vulnerability {...infoItem} />);
                }
            }

            rows.push(
                <tr>
                    <td>{row.name}</td>
                    <td><ul>{values}</ul></td>
                    <td>{info}</td>
                </tr>
            );
        }

        return  (
            <div id="Headers">
                <table cellPadding={0} cellSpacing={0} style={{width: '100%'}}>
                    <tr>
                        <th>JS Library</th>
                        <th>Version</th>
                        <th>Info</th>
                    </tr>
                    {rows}
                </table>
            </div>
        );
    }
}