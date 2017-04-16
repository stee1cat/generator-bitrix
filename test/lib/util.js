/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

var assert = require('yeoman-assert');
var Util = require('../../lib/util');

describe('util', function () {
  it('#ucfirst()', function () {
    assert.textEqual(Util.ucfirst('uppercaseTest'), 'UppercaseTest');
    assert.textEqual(Util.ucfirst('a'), 'A');
    assert.textEqual(Util.ucfirst(''), '');
  });

  it('#removeSeparators()', function () {
    assert.textEqual(Util.removeSeparators('remove_separators'), 'RemoveSeparators');
    assert.textEqual(Util.removeSeparators('remove-separators'), 'RemoveSeparators');
    assert.textEqual(Util.removeSeparators('remove separators'), 'RemoveSeparators');
    assert.textEqual(Util.removeSeparators('-_. '), '');
  });

  it('#componentNameToClassPrefix()', function () {
    assert.textEqual(Util.componentNameToClassPrefix('component_name-to class.prefix12'), 'ComponentNameToClassPrefix');
  });

  it('#componentNameToPath()', function () {
    assert.textEqual(Util.componentNameToPath('component Name.To-Path'), 'componentname.topath');
  });
});
