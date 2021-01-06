const { Sequence } = require('../src/Sequence');

module.exports = () => {

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

}

if ( require.main == module ) module.exports();
