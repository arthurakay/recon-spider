const HEADERS = new Map();

function mergeHeaders(newHeaders) {
    for (let headerName in newHeaders) {
        if (!HEADERS.has(headerName)) {
            HEADERS.set(headerName, new Set());
        }

        let header = HEADERS.get(headerName);

        header.add(newHeaders[headerName]);
    }
}

function serializeHeaders() {
    const json = {};

    HEADERS.forEach((valueSet, key) => {
        json[key] = Array.from(valueSet);
    });

    return json;
}

module.exports = {
    mergeHeaders,
    serializeHeaders
};