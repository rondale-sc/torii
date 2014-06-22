'use strict';

var path = require('path');
var fs   = require('fs');

function EmberCLIMain(project) {
  this.project = project;
  this.name    = 'Ember CLI Torii';
}

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

EmberCLIMain.prototype.treeFor = function treeFor(name) {
  var treePath =  path.join('node_modules', 'torii');

  if (!this.toriiIncluded) {
    this.app.import('vendor/torii/dist/torii.amd.js');
    this.toriiIncluded = true;
  }

  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

EmberCLIMain.prototype.included = function included(app) {
  this.app = app;
};

module.exports = EmberCLIMain;

