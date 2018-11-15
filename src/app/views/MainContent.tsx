import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {Icon, Menu} from 'antd';

import Headers from '../components/Headers';
import MetaTags from '../components/MetaTags';
import NsLookup from '../components/NsLookup';
import RetireJs from '../components/RetireJs';
import Wappalyzer from '../components/Wappalyzer';
import WhoIs from '../components/WhoIs';
import Dirb from '../components/Dirb';
import Status from '../components/Status';

const SubMenu = Menu.SubMenu;

interface MainContentProps {
    crawlerStore?: any
}

@inject('crawlerStore') @observer
export default class MainContent extends React.Component<MainContentProps, {}> {
    state = {
        current: 'status',
    }

    handleClick = (e: any) => {
        this.setState({
            current: e.key,
        });
    }

    render() {
        let display;

        switch (this.state.current) {
            case 'nslookup':
                display = <NsLookup />;
                break;

            case 'whois':
                display = <WhoIs />;
                break;

            case 'headers':
                display = <Headers />;
                break;

            case 'meta':
                display = <MetaTags />;
                break;

            case 'retirejs':
                display = <RetireJs />;
                break;

            case 'wappalyzer':
                display = <Wappalyzer />;
                break;

            case 'dirb':
                display = <Dirb />;
                break;

            default:
                display = <Status />;
        }

        return (
            <div className="MainContent-view">
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="status">
                        <Icon type="loading" />Status
                    </Menu.Item>

                    <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Utilities</span>}>
                        <Menu.Item key="nslookup">NSLookup</Menu.Item>
                        <Menu.Item key="whois">WhoIs</Menu.Item>
                    </SubMenu>

                    <SubMenu title={<span className="submenu-title-wrapper"><Icon type="global" />HTML</span>}>
                        <Menu.Item key="headers">HTTP Response Headers</Menu.Item>
                        <Menu.Item key="meta">Meta Tags</Menu.Item>
                    </SubMenu>

                    <SubMenu title={<span className="submenu-title-wrapper"><Icon type="exception" />Vulnerabilities</span>}>
                        <Menu.Item key="retirejs">RetireJS</Menu.Item>
                        <Menu.Item key="wappalyzer">Wappalyzer</Menu.Item>
                    </SubMenu>

                    <SubMenu title={<span className="submenu-title-wrapper"><Icon type="audit" />Scanners</span>}>
                        <Menu.Item key="dirb">dirb</Menu.Item>
                    </SubMenu>
                </Menu>

                <div className="MainContent-inner">
                    {display}
                </div>
            </div>
        );
    }
}