class Sequence extends Function {
  constructor (funcs, reference, config) {
    config = config || {};
    function seqf(...args) {
      if ( ! seqf.config.noClone ) args = [...args];
      if ( args[0] instanceof Promise && ! seqf.config.noAsync ) {
        return seqf.runAsync(args);
      }
      return seqf.run(args);
    }
    Object.setPrototypeOf(seqf, Sequence.prototype);
    seqf.chain = [...funcs];
    seqf.config = config;
    if ( reference ) {
      for ( let i = 0 ; i < seqf.chain.length ; i++ ) {
        let entry = seqf.chain[i];
        if ( ! entry.fn ) {
          let refEntry = reference.get(entry.name);
          if ( refEntry ) entry.fn = refEntry.fn;
        }
      }
    }
    return seqf;
  }
  run (args) {
    var r;
    for ( let i = 0 ; i < this.chain.length ; i++ ) {
      var c = this.getContext_(f);
      var f = (f => typeof f === 'function' ? f : f.fn)(this.chain[i]);
      r = f.bind(c)(...args);
      args = [r, ...args.slice(1)];
      if ( r instanceof Promise ) {
        return this.runAsync(args, i + 1);
      }
    }
    return r;
    // return this.chain.reduce((args, f) => {
    //   var c = this.getContext_(f);
    //   var r = typeof f === 'function' ? f(...args) : f.fn.bind(c)(...args);
    //   return [r, ...args.slice(1)];
    // }, args)[0];
  }
  runAsync (args, i) {
    var p = args[0];
    var ro_args = args.slice(1);
    if ( ! ( p instanceof Promise ) ) {
      p = Promise.resolve(p);
    }

    var chain = i ? this.chain.slice(i) : this.chain;

    return chain.reduce((p, f) => p.then(input => {
      var aaaa = [input, ...ro_args];
      var c = this.getContext_(f);
      var r = typeof f === 'function' ? f(...aaaa) : f.fn.bind(c)(...aaaa);
      return r;
    }), p);
  }
  getContext_(item) {
    return {
      self: item,
      sequence: this,
    };
  }
  require_(name) {
    var i = 0;
    for ( ; i < this.chain.length ; i++ ) {
      let cmpF = this.chain[i];
      if ( cmpF.name == name ) break;
    }
    if ( i == this.chain.length ) throw new Error(
      `${name} is not in the chain`);
    return i;
  }
  insert_(offset, name, func) {
    var i = this.require_(name);
    this.chain.splice(i + offset,0,func);
  };

  get (name) {
    var i = this.require_(name);
    return this.chain[i];
  }

  insertBefore (name, func) {
    this.insert_(0, name, func);
    return this;
  }
  insertAfter (name, func) {
    this.insert_(1, name, func);
    return this;
  }
  remove (name) {
    var i = this.require_(name);
    this.chain.splice(i, 1);
    return this;
  }

  replace (name, o) {
    var i = this.require_(name);
    if ( ! this.config.noAddName ) {
      if ( typeof o == 'function' ) {
        o = { name: name, fn: o };
      } else if ( ! o.name ) o.name = name;
    }
    this.chain[i] = o;
    return this;
  }

  clone () {
    return new Sequence([...this.chain]);
  }
}

module.exports = {
  Sequence: Sequence,
};
