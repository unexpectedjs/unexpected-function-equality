var expect = require('unexpected')
  .clone()
  .use(require('../lib/unexpected-function-equality'));

it('should find two functions identical despite whitespace differences', function() {
  expect(
    function(a) {
      return 123;
    },
    'to equal',
    function(a) {
      return 123;
    }
  );
});

it('should provide a string diff of the pretty-printed functions when they actually differ', function() {
  expect(
    function() {
      expect(
        function(a) {
          return 1234;
        },
        'to equal',
        function(a) {
          return 123;
        }
      );
    },
    'to throw',
    'expected function (a) { return 1234; } to equal function (a) { return 123; }\n' +
      '\n' +
      ' function (a) {\n' +
      '-    return 1234;\n' +
      '+    return 123;\n' +
      ' }'
  );
});

it('should consider functions with different names to be different', function() {
  expect(
    function() {
      expect(
        function a() {},
        'to equal',
        function b() {}
      );
    },
    'to throw',
    'expected function a() {} to equal function b() {}\n' +
      '\n' +
      '-function a() {\n' +
      '+function b() {\n' +
      ' }'
  );
});

it('should let the _name property take precedence when comparing', function() {
  var functionWithUnderscoreName = function() {};
  functionWithUnderscoreName._name = 'foo';
  expect(functionWithUnderscoreName, 'to equal', function foo() {});
});

it('should disregard a name of "anonymous" from the Function constructor', function() {
  // eslint-disable-next-line no-new-func
  var fn = new Function();
  expect(fn.toString(), 'to match', /^function anonymous\(/);
  expect(fn, 'to equal', function() {});
});
