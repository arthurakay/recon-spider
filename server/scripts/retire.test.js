const {mergeJS, serializeJs} = require('./retire');

const results = {
    "retire-example": [],
    "jquery": ["3.3.1"],
    "jquery.validator": [],
    "jquery-mobile": [],
    "jquery-ui-dialog": [],
    "jquery-ui-autocomplete": [],
    "jquery-ui-tooltip": [],
    "jquery.prettyPhoto": [],
    "jPlayer": [],
    "tinyMCE": [],
    "YUI": [],
    "prototypejs": [],
    "ember": [],
    "dojo": [],
    "angularjs": [],
    "backbone.js": [],
    "mustache.js": [],
    "handlebars.js": [],
    "plupload": [],
    "DOMPurify": [],
    "react": [],
    "DWR": [],
    "moment.js": [],
    "ckeditor": [],
    "vue": [],
    "ExtJS": []
};

test('retire > mergeJs() and serializeJs', () => {
    const defaultJS = serializeJs();
    expect(JSON.stringify(defaultJS)).toBe('[]');

    mergeJS(results);

    const updatedJs = serializeJs();
    expect(JSON.stringify(updatedJs)).toBe('[{"name":"jquery","values":["3.3.1"]}]');
});