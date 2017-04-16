/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

'use strict';

var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var util = require('../lib/util');

module.exports = Generator.extend({
  prompting: function () {
    var done = this.async();
    var self = this;

    this.log(yosay(
      'Welcome to the Yeoman ' + chalk.blue('Bitrix') + ' generator!'
    ));

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
    var classPrefix = util.componentNameToClassPrefix(this.props.componentName);
    var destinationPath = 'local/components/' + util.componentNameToPath(this.props.componentName) + '/class.php';

    this.fs.copyTpl(this.templatePath('class.php'), this.destinationPath(destinationPath), {
      classPrefix: classPrefix
    });
  }
});
