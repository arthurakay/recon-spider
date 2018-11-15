import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {Spin, Card, Col, Row} from 'antd';

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

                <Row gutter={16}>
                    <Col span={8}>
                        <Spin spinning={this.props.crawlerStore.loading}>
                            <Card title="Site Crawler" bordered={false}>
                                Using headless-chrome-crawler to discover pages on the website.
                            </Card>
                        </Spin>
                    </Col>

                    <Col span={8}>
                        <Spin spinning={this.props.nsLookupStore.loading}>
                            <Card title="NSLookup" bordered={false}>
                                Name server lookup, querying the DNS of the domain to obtain domain and/or IP mappings and other DNS records.
                            </Card>
                        </Spin>
                    </Col>

                    <Col span={8}>
                        <Spin spinning={this.props.whoisStore.loading}>
                            <Card title="WhoIs" bordered={false}>
                                Querying public WHOIS information for the domain.
                            </Card>
                        </Spin>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Spin spinning={this.props.crawlerStore.loading}>
                            <Card title="HTTP Headers" bordered={false}>
                                Parsing the HTTP response headers for each page on the website.
                            </Card>
                        </Spin>
                    </Col>

                    <Col span={8}>
                        <Spin spinning={this.props.crawlerStore.loading}>
                            <Card title="Meta Tags" bordered={false}>
                                Parsing the HTML &lt;meta /&gt; tags on each page of the website.
                            </Card>
                        </Spin>
                    </Col>

                    <Col span={8}>
                        <Spin spinning={this.props.crawlerStore.loading}>
                            <Card title="RetireJS" bordered={false}>
                                Checking all JavaScript found on the website against known vulnerabilities.
                            </Card>
                        </Spin>
                    </Col>
                </Row>


                <Row gutter={16}>
                    <Col span={8}>
                        <Spin spinning={this.props.wappalyzerStore.loading}>
                            <Card title="Wappalyzer" bordered={false}>
                                Using Wappalyzer to analyze which technologies are used on the website.
                            </Card>
                        </Spin>
                    </Col>

                    <Col span={8}>
                        <Spin spinning={this.props.dirbStore.loading}>
                            <Card title="dirb" bordered={false}>
                                Using the DIRB scanner, audit the website for existing (and possibly hidden) web objects.
                            </Card>
                        </Spin>
                    </Col>

                    <Col span={8}>

                    </Col>
                </Row>

            </div>
        );
    }
}