unexpected-function-equality
============================

[![NPM version](https://badge.fury.io/js/unexpected-function-equality.svg)](http://badge.fury.io/js/unexpected-function-equality)
[![Build Status](https://travis-ci.org/unexpectedjs/unexpected-function-equality.svg?branch=master)](https://travis-ci.org/unexpectedjs/unexpected-function-equality)
[![Coverage Status](https://coveralls.io/repos/unexpectedjs/unexpected-function-equality/badge.svg)](https://coveralls.io/r/unexpectedjs/unexpected-function-equality)
[![Dependency Status](https://david-dm.org/unexpectedjs/unexpected-function-equality.svg)](https://david-dm.org/unexpectedjs/unexpected-function-equality)

Plugin for Unexpected 10+ that overrides the `<function> to equal <function>`
assertion with an implementation that disregards whitespace. This is
accomplished by parsing and pretty-printing the functions, then doing a string
comparison.

Example:

```js
var expect = require('unexpected').clone()
    .use(require('unexpected-function-equality'));

it('should consider the two functions equal', function () {
    expect(function (a) { return 123 - 456; }, 'to equal', function (a) {
        return (123) - 456;
    });
});
```

This is handy when testing code that generates code.


License
-------

Unexpected-function-equality is licensed under a standard 3-clause BSD license -- see the `LICENSE` file for details.
