import * as React from 'react';
import {makeRequest} from '../Request';

export default class Hello extends React.Component<{}, {}> {
    public onSubmit = (e: any) => {
        // don't actually submit the form
        e.preventDefault();

        const form = e.currentTarget;

        makeRequest({
            url: '/api/crawl',
            method: 'POST',
            data: {
                domain: form.domain.value,
                maxDepth: form.maxDepth.value
            }
        });
    };

    render() {
        return (
            <div>
                <h3>recon-spider</h3>

                <p>What site are we crawling today?</p>

                <form onSubmit={this.onSubmit}>
                    <label htmlFor="domain">Domain:</label>
                    <input
                        id="domain"
                        name="domain"
                        type="text"
                        placeholder="https://www.domain.com"
                    />

                    <label htmlFor="maxDepth">Maximum Depth:</label>
                    <input
                        id="maxDepth"
                        name="maxDepth"
                        type="number"
                        defaultValue="2"
                    />

                    <input
                        type="submit"
                        value="Crawl!"
                    />
                </form>
            </div>
        );
    }
}