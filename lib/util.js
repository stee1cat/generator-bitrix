/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

'use strict';

var Util = {
  componentNameToPath: function (name) {
    return name.replace(/[^a-z.]+/ig, '').toLowerCase();
  },
  componentNameToClassPrefix: function (name) {
    var prefix = this.removeSeparators(name);

    return prefix.replace(/[^a-z]+/ig, '');
  },
  removeSeparators: function (string) {
    var parts = string.split(/[\s._-]/i);
    var result = '';
    var i = 0;

    for (i = 0; i < parts.length; i++) {
      result += this.ucfirst(parts[i]);
    }

    return result;
  },
  ucfirst: function (string) {
    var firstLetter = string.substr(0, 1);

    return firstLetter.toUpperCase() + string.substr(1);
  }
};

module.exports = Util;
