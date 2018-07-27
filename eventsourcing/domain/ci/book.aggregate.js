const domain = require('cqrs-domain');

module.exports = [
  domain.defineAggregate({
    name: 'book',
    defaultPreConditionPayload: 'data',
    defaultCommandPayload: 'data',
    defaultEventPayload: 'data',
    // skipHistory: true
    // applyLastEvent: true
  }),
];
