'use strict';

var yeoman = require('yeoman-generator'),
  chalk = require('chalk'),
  yosay = require('yosay'),
  mkdirp = require('mkdirp'),
  tarball = require('tarball-extract'),
  ncp = require('ncp').ncp,
  rmdir = require('rmdir'),
  fs = require('fs'),

  bitrixVersion = 'standart',
  bitrixArchiveUrl = 'http://www.1c-bitrix.ru/download/';

var removeDirectory = function (directoryName) {
  rmdir(directoryName, function (error, dirs, files) {
    if (error) {
      return console.error(error);
    }
  });
};

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

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

    this.prompt(prompts, function (response) {
      this.props = response;
      bitrixVersion = response.bitrixVersion;
      done();
    }.bind(this));
  },
  writing: {
    cms: function () {
      this.log('Downloading and setting up your Bitrix application');
      var fileName = bitrixVersion + '_encode_php5';
      var url = bitrixArchiveUrl + fileName + '.tar.gz';
      this.tarball(url, './' + fileName, function (error) {
        if (error) {
          return done(error);
        }
        else {
          ncp(fileName, './', function (error) {
            if (error) {
              return console.error(error);
            }
            else {
              removeDirectory(fileName + '/');
            }
          });
        }
      });
    }
  }
});
