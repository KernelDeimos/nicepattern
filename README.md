# nicepattern
A collection of helpful patterns built with ES6 classes.

## Sequence

Sequence allows you to conveniently separate the steps in a flow so that
individual steps can be later removed, added, reconfigured, or rearranged.

There are many uses for this kind of pattern, including:
- Separating conditional logic from complex flows.
- Providing away for plugins to add hooks within your framework.
- [Generating documentation](http://ericdube.com/article/sequence-documentation) for the steps in your code.

### Example: Basic Example

```javascript
const { Sequence } = require('nicepattern');

var seq = new Sequence([
  () => { console.log('Hello,'); },
  () => { console.log('yes;'); },
  () => { console.log('this is dog.'); },
]);

seq();
```

### Example: Objects

Items in a sequence can be given an identifier. Doing this consistently
makes it easy to insert new items around them or remove them later.

```javascript
const { Sequence } = require('nicepattern');

var seq = new Sequence([
  {
    name: 'greeting',
    fn: s => s + 'Hello, ',
  },
  {
    name: 'subject',
    fn: s => s + 'World!',
  }
]);

seq.replace('subject', {
  fn: s => s + 'yes; this is dog.',
})

// Prints: "Hello, yes; this is dog."
console.log(seq(''));
```

### Example: Inserting

Inserting new items into a sequence is a great way to decouple conditional
logic from a complex flow, or to allow plugins in inject custom behaviour.

```javascript
const { Sequence } = require('nicepattern');

var seq = new Sequence([
  { name: 'init', fn: () => console.log('init') },
  { name: 'default', fn: () => console.log('default') },
  { name: 'cleanup', fn: () => console.log('cleanup') },
]);

seq2 = seq.clone();

seq2.insertAfter('init', {
  name: 'pluginInit',
  fn: () => console.log('pluginInit'),
});

seq2.insertBefore('default', {
  name: 'conditionalBehaviour',
  fn: () => console.log('conditionalBehaviour'),
});

// Prints: init, default, cleanup
seq();

// Prints: init, pluginInit, conditionalBehaviour, default, cleanup
seq2();
```

### Example: Arguments

If an item is not first in the sequence, its first argument will be the
return value of the previous item; otherwise it will be the first value
passed when calling the sequence.

Additional arguments may be passed when calling the sequence, and these
will be available to all items.

```javascript
const { Sequence } = require('nicepattern');

var seq = new Sequence([
  (a, b, c) => {
    console.log(a, b, c);
    return 'hello';
  },
  (a, b, c) => {
    console.log(a, b, c);
    return `${a}, for ${b}; ${c}.`;
  },
]);

// Prints: "hello, for yes; this is dog."
console.log(seq('goodbye', 'yes', 'this is dog'));
```

### Example: Async

The moment a sequence function returns a Promise object, the sequence will
enter async mode. In async mode, the return value of the sequence will be
a promise. It is possible to disable this behaviour when constructing a
sequence, which makes it possible to build promise chains using a
sequence as well.

```javascript
const { Sequence } = require('nicepattern');

var asyncTest = async () => {
  var seq = new Sequence([
    x => x + 1,
    x => new Promise((rslv, rjct) => {
      setTimeout(() => {
        rslv(x + 1);
      }, 500)
    }),
    x => x + 1,
  ]);
  // Prints: 4
  console.log(await seq(1))
}

var noAsyncTest = () => {
  var seq = new Sequence([
    x => x + 1,
    x => new Promise((rslv, rjct) => {
      setTimeout(() => {
        rslv(x + 1);
      }, 500)
    }),
    x => x + 1,
  ], null /* reference example coming soon */, {
    noAsync: true,
  });
  // Prints: "Promise { <pending> }"
  console.log(seq(1))
}

asyncTest(); // "4", after some time
noAsyncTest(); // "Promise { <pending> }", immediately
```
