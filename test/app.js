'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var bitrixVersion = 'start';

describe('generator-bitrix:app', function () {
  before(function () {
    this.timeout(180000);

    return new Promise(function (resolve) {
      helpers.run(path.join(__dirname, '../app'))
        .withPrompts({bitrixVersion: [bitrixVersion]})
        .on('end', function () {
          resolve();
        });
    });
  });

  it('exists files', function () {
    assert.file([
      'index.php'
    ]);
  });

  it('archive removed', function () {
    assert.noFile([
      bitrixVersion + '_encode_php5.tar.gz'
    ]);
  });
});
