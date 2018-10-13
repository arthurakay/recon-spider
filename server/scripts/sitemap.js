class TreeNode {
    constructor(options) {
        this.key = options.key;
        this.title = options.title;
        this.children = options.children || [];
    }
}

function sortChildren(a, b) {
    if (a.title < b.title) {
        return -1;
    }

    if (a.title > b.title) {
        return 1;
    }

    return 0;
}

function findChild(title, node) {
    if (node.children.length === 0) {
        return false;
    }

    const child = node.children.find(child => child.title === title);

    return child || false;
}

function insertNodeRecursive(parts = [], node, title) {
    const child = findChild(parts[0], node);

    if (child) {
        // if more parts exist, recurse the tree
        if (parts.length > 1) {
            insertNodeRecursive(parts.slice(1), child, `${title}/${parts[0]}`)
        }
    } else {
        node.children.push(
            new TreeNode({
                key: `${title}/${parts[0]}`,
                title: parts[0]
            })
        );
        node.children.sort(sortChildren);
    }
}

function parseTree(domain = '', urlPaths = []) {
    const sitemap = urlPaths
        .sort()
        .map(url => url.replace(domain, '').slice(1))
        // the first record will always be the site root
        .slice(1);

    const root = new TreeNode({
        key: domain,
        title: '/'
    });

    for (let i=0; i<sitemap.length; i++) {
        const url = sitemap[i];

        // root node
        if (url === '/') {
            continue;
        }

        const parts = url.split('/');

        insertNodeRecursive(parts, root, domain);
    }

    return root;
}

module.exports = {
    parseTree
};