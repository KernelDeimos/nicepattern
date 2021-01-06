const { Sequence } = require('../src/Sequence');

module.exports = () => {

  var seq = new Sequence([
    () => { console.log('Hello,'); },
    () => { console.log('yes;'); },
    () => { console.log('this is dog.'); },
  ]);

  seq();

}

if ( require.main == module ) module.exports();
