import Component from '@ember/component';
import { computed } from '@ember/object'
import { htmlSafe } from '@ember/string';
import layout from './template';

export default Component.extend({
	layout,
	attributeBindings: ['obj', 'shouldHighlight'],
	classNames: ['json-pretty'],

	obj: null,
	shouldHighlight: true,

	preformattedText: computed('obj', function() {
		let obj = this.get('obj');
		let out;
		try {
			out = JSON.stringify(obj, null, 4);
		}
		catch (exc) {
			out = "Failed to parse input obj:\n"+obj;
		}
		if (out && this.get('shouldHighlight')) {
			out = this.highlightSyntax(out);
		}
		return new htmlSafe(out);
	}),

	//Thanks to: http://jsfiddle.net/KJQ9K/
	highlightSyntax(json) {
		json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
			let cls = 'number';
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					cls = 'key';
				}
				else {
					cls = 'string';
				}
			} else if (/true|false/.test(match)) {
				cls = 'boolean';
			} else if (/null/.test(match)) {
				cls = 'null';
			}
			return '<span class="' + cls + '">' + match + '</span>';
		});
	}
});
