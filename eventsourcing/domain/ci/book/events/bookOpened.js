const domain = require('cqrs-domain');

module.exports = domain.defineEvent({}, (data, aggregate) => {
  aggregate.set(data);
});
