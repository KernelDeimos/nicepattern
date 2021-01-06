const { Sequence } = require('../src/Sequence');

module.exports = () => {

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

}

if ( require.main == module ) module.exports();
