'use strict';
/*globals module, require*/

var path = require('path');
var fs = require('fs');

function EmberCliJsonPretty(project) {
    this.project = project;
    this.name = 'ember-cli-json-pretty';
}

function unwatchedTree(dir) {
    return {
        read: function() { return dir; },
        cleanup: function() { /* do nothing */ },
    };
}

EmberCliJsonPretty.prototype.treeFor = function treeFor(name) {
    var treepath = path.normalize('node_modules/ember-cli-json-pretty/trees/'+name);
    return (fs.existsSync(treepath)) ? unwatchedTree(treepath) : null;
};

EmberCliJsonPretty.prototype.included = function included(app) {
    this.app = app;
    this.app.import('vendor/ember-cli-json-pretty/styles/styles.css');
};

module.exports = EmberCliJsonPretty;
