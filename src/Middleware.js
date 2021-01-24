const { Sequence } = require('./Sequence');

function toChain(f, name) {
  if ( f instanceof Sequence ) return f.chain;
  return [f];
}

class Middleware {
  constructor (preFunc, postFunc, name) {
    this.preFunc = preFunc;
    this.postFunc = postFunc;
    this.name = name || 'Middleware';
  }
  apply (sequence) {
    var s = sequence.clone();
    s.chain = [
      ...toChain(this.preFunc, `${this.name}.preFunc`),
      ...sequence.chain,
      ...toChain(this.postFunc, `${this.name}.postFunc`),
    ];
    return s;
  }
}

module.exports = {
  Middleware: Middleware,
};
