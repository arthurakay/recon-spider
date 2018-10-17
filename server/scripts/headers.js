const HEADERS = new Map();

class Header {
    constructor({name = '', values = []}) {
        this.name = name;
        this.values = values;
    }
}

/**
 * Add new parameters to our Map
 * @param newHeaders {Object}
 */
function mergeHeaders(newHeaders) {
    for (let headerName in newHeaders) {
        if (!HEADERS.has(headerName)) {
            HEADERS.set(headerName, new Set());
        }

        let header = HEADERS.get(headerName);

        header.add(newHeaders[headerName]);
    }
}

/**
 * Convert the Map() of headers into an array for client consumption
 * @return {Array}
 */
function serializeHeaders() {
    const results = [];

    HEADERS.forEach((valueSet, name) => {
        results.push(
            new Header({
                name,
                values: Array.from(valueSet)
            })
        )
    });

    return results;
}

module.exports = {
    mergeHeaders,
    serializeHeaders
};