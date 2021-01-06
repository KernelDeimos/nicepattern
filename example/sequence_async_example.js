const { Sequence } = require('../src/Sequence');

module.exports = async () => {

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
}

if ( require.main == module ) module.exports();
