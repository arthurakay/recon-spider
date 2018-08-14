import * as React from 'react';
import {inject, observer} from 'mobx-react';

interface ConfigProps {
    crawlerStore?: any
}

@inject('crawlerStore') @observer
export default class Config extends React.Component<ConfigProps, {}> {
    public onSubmit = (e: any) => {
        // don't actually submit the form
        e.preventDefault();

        const form = e.currentTarget;

        this.props.crawlerStore.crawlWebsite(
            form.domain.value,
            form.maxDepth.value
        );
    };

    render() {
        return (
            <div>
                <h3>recon-spider</h3>

                <p>What site are we crawling today?</p>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="domain">Domain:</label>
                        <input
                            id="domain"
                            name="domain"
                            type="text"
                            className="form-control"
                            placeholder="https://www.domain.com"
                        />

                        <label htmlFor="maxDepth">Maximum Depth:</label>
                        <input
                            id="maxDepth"
                            name="maxDepth"
                            type="number"
                            defaultValue="2"
                            className="form-control"
                        />

                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={this.props.crawlerStore.loading}
                        >
                            Crawl!
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}