/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-bitrix:component', function () {
  before(function () {
    return new Promise(function (resolve) {
      helpers.run(path.join(__dirname, '../component'))
        .withPrompts({componentName: 'test'})
        .on('end', function () {
          resolve();
        });
    });
  });

  it('exists files', function () {
    assert.file([
      'local/components/test/class.php'
    ]);
  });
});
