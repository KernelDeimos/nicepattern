const { Sequence } = require('./Sequence');
const { Middleware, CompositeMiddleware } = require('./Middleware');

module.exports = {
  Sequence: Sequence,
  Middleware: Middleware,
  CompositeMiddleware: CompositeMiddleware,
};
