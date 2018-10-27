/**
 * Function that runs in the context of the browser window
 */
const evaluatePage = async () => {
    function getExtratorFuncs(retireJsRepo) {
        const extratorFuncs = {};

        for (let component in retireJsRepo) {
            const results = [];
            const funcs = retireJsRepo[component].extractors.func;

            if (funcs) {
                for (let i = 0; i < funcs.length; i++) {
                    results.push(funcs[i]);
                }

                extratorFuncs[component] = results;
            }
        }

        return extratorFuncs;
    }

    const repo = await window.__exposedFunction();
    const extractorFuncs = getExtratorFuncs(repo);

    /**
     * given an array of <script />, parse the values
     * @param {array} values An array of strings containing the URIs to various JavaScript resources
     * @param {array} tags An array of <script /> tags
     * @return {array} ['url', 'url']
     */
    function assembleScriptUrls(values = [], tags = []) {
        for (let i = 0; i < tags.length; i++) {
            const tag = tags[i];
            let src = tag.src;

            if (src) {
                values.push(src);
            }
        }

        return values;
    }

    /**
     * scrape the page for <script />
     * @return {array} ['url', 'url']
     */
    function getScriptTags() {
        let results = assembleScriptUrls([], document.querySelectorAll('script'));
        return assembleScriptUrls(results, document.head.querySelectorAll('script'));
    }

    /**
     * find any JavaScript used on the page utilizing a variety of approaches (RetireJS)
     * @return {object}
     *     {
     *         'js-library': [...values...]
     *     }
     */
    function detectJS() {
        const retireJs = {};

        for (let component in extractorFuncs) {
            const results = [];
            const funcs = extractorFuncs[component];

            if (funcs) {
                for (let i = 0; i < funcs.length; i++) {
                    try {
                        const result = eval(funcs[i]);
                        results.push(result);
                    } catch (e) {
                        // fail silently; error means library is not detected
                    }
                }

                // only report JS libs that are identified
                if (results.length > 0) {
                    retireJs[component] = results;
                }
            }
        }

        return retireJs;
    }

    /**
     * given an array of <meta />, parse the values
     * @param {object} values
     * @param {array} tags An array of <meta /> tags
     * @return {object}
     *     {
     *         'metaTagName': [...values...]
     *     }
     */
    function assembleMetaInfo(values, tags = []) {
        for (let i = 0; i < tags.length; i++) {
            const tag = tags[i];
            let name = tag.name || tag['http-equiv'];

            if (name) {
                if (!values[name]) {
                    values[name] = [];
                }
                values[name].push(tag.content);
            } else if (tag.attributes.charset) {
                name = 'charset';

                if (!values[name]) {
                    values[name] = [];
                }
                values[name].push(tag.attributes.charset.value);
            }
        }

        return values;
    }

    /**
     * scrape the page for <meta />
     * @return {object}
     *     {
     *         'metaTagName': [...values...]
     *     }
     */
    function getMetaTags() {
        const meta = {};

        // look in the HTML <head> first
        let tags = document.head.querySelectorAll('meta');
        assembleMetaInfo(meta, tags);

        // then look in the HTML <body>
        tags = document.querySelectorAll('meta');
        assembleMetaInfo(meta, tags);

        return meta;
    }

    /* Define the return values */
    let returnData = {};
    let error = false;

    try {
        returnData = {
            retireJs: detectJS(),
            vulnerabilities: null,
            metaTags: getMetaTags(),
            scripts: getScriptTags()
        };
    } catch (e) {
        error = true;
    }

    return {
        error: error,
        data: returnData
    };
};

module.exports = {
    fn: evaluatePage
};