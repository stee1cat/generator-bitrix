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
    var componentName = util.componentNameToPath(this.props.componentName);
    var classPrefix = util.componentNameToClassPrefix(this.props.componentName);
    var destinationPath = 'local/components/' + componentName;

    this.fs.copyTpl(this.templatePath('class.php'), this.destinationPath(destinationPath + '/class.php'), {
      classPrefix: classPrefix
    });

    this.fs.copyTpl(this.templatePath('.description.php'), this.destinationPath(destinationPath + '/.description.php'), {
      componentName: componentName
    });

    this.fs.copy(this.templatePath('.parameters.php'), this.destinationPath(destinationPath + '/.parameters.php'));
    this.fs.copy(this.templatePath('.default'), this.destinationPath(destinationPath + '/templates/.default'));
  }
});
