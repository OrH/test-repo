const domain = require('cqrs-domain');

module.exports = domain.defineCommand({
  aggregate: 'book',
  name: 'openBook',
}, (data, aggregate) => {
  aggregate.apply('bookOpened', data);
});
