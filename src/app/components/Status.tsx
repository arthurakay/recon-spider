import * as React from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {Spin, Alert} from 'antd';
import Stores from '../stores/_AllStores';

interface StatusProps {
    crawlerStore?: any;
    dirbStore?: any;
    nsLookupStore?: any;
    wappalyzerStore?: any;
    whoisStore?: any;
}
@inject('crawlerStore', 'dirbStore', 'nsLookupStore', 'wappalyzerStore', 'whoisStore') @observer
export default class Status extends React.Component<StatusProps, {}> {
    render() {
        return (
            <div className="status">

                <h2>Spook.js</h2>

                <p>
                    Below are the tools involved in Spook.js -- the application will update each with a status as it
                    completes a scan of the website.
                </p>

                <Spin spinning={this.props.crawlerStore.loading}>
                    <Alert
                        message="Site Crawler"
                        description="Using headless-chrome-crawler to discover pages on the website."
                        type="info"
                    />
                </Spin>

                <Spin spinning={this.props.nsLookupStore.loading}>
                    <Alert
                        message="NSLookup"
                        description="Name server lookup, querying the DNS of the domain to obtain domain and/or IP mappings and other DNS records."
                        type="info"
                    />
                </Spin>

                <Spin spinning={this.props.crawlerStore.loading}>
                    <Alert
                        message="HTTP Headers"
                        description="Parsing the HTTP response headers for each page on the website."
                        type="info"
                    />
                </Spin>

                <Spin spinning={this.props.crawlerStore.loading}>
                    <Alert
                        message="Meta Tags"
                        description="Parsing the HTML <meta /> tags on each page of the website."
                        type="info"
                    />
                </Spin>

                <Spin spinning={this.props.crawlerStore.loading}>
                    <Alert
                        message="RetireJS"
                        description="Checking all JavaScript found on the website against known vulnerabilities."
                        type="info"
                    />
                </Spin>

                <Spin spinning={this.props.wappalyzerStore.loading}>
                    <Alert
                        message="Wappalyzer"
                        description="Using Wappalyzer to analyze which technologies are used on the website."
                        type="info"
                    />
                </Spin>

                <Spin spinning={this.props.whoisStore.loading}>
                    <Alert
                        message="WhoIs"
                        description="Querying public WHOIS information for the domain."
                        type="info"
                    />
                </Spin>

                <Spin spinning={this.props.dirbStore.loading}>
                    <Alert
                        message="dirb"
                        description="Using the DIRB scanner, audit the website for existing (and possibly hidden) web objects."
                        type="info"
                    />
                </Spin>

            </div>
        );
    }
}