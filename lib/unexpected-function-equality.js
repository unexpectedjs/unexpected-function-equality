var esprima = require('esprima');
var escodegen = require('escodegen');

function stringifyFunction(fn) {
  // Allow return statements at the top level by wrapping the code into a function before parsing it:
  var functionAst = esprima.parse('!' + fn.toString()).body[0].expression
    .argument;
  if (fn._name) {
    functionAst.id = { type: 'Identifier', name: fn._name };
  } else if (functionAst.id && functionAst.id.name === 'anonymous') {
    functionAst.id = null;
  }
  return escodegen.generate({ type: 'Program', body: [functionAst] });
}

module.exports = {
  name: 'unexpected-function-equality',
  version: require('../package.json').version,
  installInto: function (expect) {
    expect.addAssertion(
      '<function> to equal <function>',
      function (expect, subject, value) {
        expect(
          stringifyFunction(subject),
          'to equal',
          stringifyFunction(value)
        );
      }
    );
  },
};
