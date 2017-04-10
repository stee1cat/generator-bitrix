/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

'use strict';

var Generator = require('yeoman-generator');
var yosay = require('yosay');
var fs = require('fs');

module.exports = Generator.extend({
  prompting: function () {
    var done = this.async();
    var self = this;

    var prompts = [{
      name: 'componentName',
      message: 'Component name:',
      type: 'input'
    }];

    return this.prompt(prompts)
      .then(function (response) {
        self.props = response;

        done();
      });
  },
  writing: function () {
    var destinationPath = 'local/components/' + this.props.componentName.toLowerCase() + '/class.php';

    this.fs.copyTpl(this.templatePath('class.php'), this.destinationPath(destinationPath), {
      componentName: this.props.componentName
    });
  }
});
