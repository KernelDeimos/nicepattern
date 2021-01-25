const { Sequence } = require('./Sequence');

function toChain(f, name) {
  if ( f instanceof Sequence ) return f.chain;
  if ( Array.isArray(f) ) return f;
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

class CompositeMiddleware {
  constructor (middlewares, name) {
    this.middlewares = middlewares;
  }
  apply (sequence) {
    var s = sequence.clone();
    for ( let middleware of this.middlewares ) {
      s = middleware.apply(s);
    }
    return s;
  }
}

module.exports = {
  Middleware: Middleware,
  CompositeMiddleware: CompositeMiddleware,
};
