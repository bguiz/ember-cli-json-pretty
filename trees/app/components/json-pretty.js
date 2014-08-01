/*global Ember*/

var JsonPrettyComponent = Ember.Component.extend({
    attributeBindings: ['obj', 'shouldHighlight'],
    classNames: ['json-pretty'],

    obj: Ember.required(),
    shouldHighlight: true,

    preformattedText: function() {
        var obj = this.get('obj');
        var out;
        try {
            out = JSON.stringify(obj, null, 4);
        }
        catch (exc) {
            out = "Failed to parse input obj:\n"+obj;
        }
        if (out && this.get('shouldHighlight')) {
            out = this.highlightSyntax(out);
        }
        return new Ember.Handlebars.SafeString(out);
    }.property('obj'),

    //Thanks to: http://jsfiddle.net/KJQ9K/
    highlightSyntax: function(json) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    },
});

export default JsonPrettyComponent;
