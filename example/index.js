const dedent = require('dedent-js');

module.exports = [
  {
    title: 'Basic Example',
    category: 'Sequence',
    module: require('./sequence_basic_example.js'),
  },
  {
    title: 'Objects',
    category: 'Sequence',
    explain: dedent`
      Items in a sequence can be given an identifier. Doing this consistently
      makes it easy to insert new items around them or remove them later.
    `.trim(),
    module: require('./sequence_object_example.js'),
  },
  {
    title: 'Inserting',
    category: 'Sequence',
    explain: dedent`
      Inserting new items into a sequence is a great way to decouple conditional
      logic from a complex flow, or to allow plugins in inject custom behaviour.
    `.trim(),
    module: require('./sequence_insert_example.js'),
  },
  {
    title: 'Arguments',
    category: 'Sequence',
    explain: dedent`
      If an item is not first in the sequence, its first argument will be the
      return value of the previous item; otherwise it will be the first value
      passed when calling the sequence.

      Additional arguments may be passed when calling the sequence, and these
      will be available to all items.
    `.trim(),
    module: require('./sequence_args_example.js'),
  },
  {
    title: 'Async',
    category: 'Sequence',
    explain: dedent`
      The moment a sequence function returns a Promise object, the sequence will
      enter async mode. In async mode, the return value of the sequence will be
      a promise. It is possible to disable this behaviour when constructing a
      sequence, which makes it possible to build promise chains using a
      sequence as well.
    `.trim(),
    module: require('./sequence_async_example.js'),
  },
];
