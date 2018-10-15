import * as React from 'react';
import {inject, observer} from 'mobx-react';
import Sitemap from '../components/Sitemap';
import Config from '../components/Config';


@inject('crawlerStore') @observer
export default class LeftContent extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <Config />
                <Sitemap />
            </div>
        );
    }
}