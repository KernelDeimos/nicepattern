const { Sequence } = require('../src/Sequence');

module.exports = () => {

  var seq = new Sequence([
    { name: 'init', fn: () => console.log('init') },
    { name: 'default', fn: () => console.log('default') },
    { name: 'cleanup', fn: () => console.log('cleanup') },
  ]);



  seq.insertAfter('init', {
    name: 'pluginInit',
    fn: () => console.log('pluginInit'),
  });

  seq.insertBefore('default', {
    name: 'conditionalBehaviour',
    fn: () => console.log('conditionalBehaviour'),
  });

  // Prints: init, pluginInit, conditionalBehaviour, default, cleanup
  seq();
}

if ( require.main == module ) module.exports();
