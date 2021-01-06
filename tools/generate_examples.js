const dedent = require('dedent-js');
var examples = require('../example/index');

var category = process.argv.slice(2)[0];
if ( category ) examples = examples.filter(ex => ex.category == category);

for ( let example of examples ) {
  var code = example.module.toString();
  code = code.substring( code.indexOf('{') + 1 , code.lastIndexOf('}') );
  console.log([
    `### Example: ${ example.title }`, '',
    ...(example.explain ? [example.explain, ''] : []),
    "```javascript",
    `const { Sequence } = require('nicepattern');`, '',
    dedent(code).trim(),
    "```", '',
  ].join('\n'));
}
