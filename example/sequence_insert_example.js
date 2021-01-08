const { Sequence } = require('../src/Sequence');

module.exports = () => {

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
}

if ( require.main == module ) module.exports();
