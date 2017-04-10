/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

'use strict';

var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var tarball = require('tarball-extract');
var fs = require('fs');

var bitrixVersion = 'standart';
var bitrixArchiveUrl = 'https://1c-bitrix.ru/download/files/';

module.exports = Generator.extend({
  prompting: function () {
    var done = this.async();
    var self = this;

    this.log(yosay(
      'Welcome to the Yeoman ' + chalk.blue('Bitrix') + ' generator!'
    ));

    var prompts = [{
      name: 'bitrixVersion',
      message: 'Bitrix version:',
      type: 'list',
      choices: [{
        name: 'Start',
        value: 'start'
      },
      {
        name: 'Standart',
        value: 'standart'
      },
      {
        name: 'Small Business',
        value: 'small_business'
      },
      {
        name: 'Expert',
        value: 'expert'
      },
      {
        name: 'Business',
        value: 'business'
      }],
      default: bitrixVersion
    }];

    return this.prompt(prompts)
      .then(function (response) {
        self.props = response;
        bitrixVersion = response.bitrixVersion;
        done();
      });
  },
  writing: {
    cms: function () {
      var fileName = bitrixVersion + '_encode_php5';
      var extension = '.tar.gz';
      var filePath = './' + fileName + extension;
      var url = bitrixArchiveUrl + fileName + extension;
      var done = this.async();

      this.log('Downloading and setting up your Bitrix application');
      tarball.extractTarballDownload(url, filePath, './', {}, function () {
        /* istanbul ignore next  */
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        done();
      });
    }
  }
});
