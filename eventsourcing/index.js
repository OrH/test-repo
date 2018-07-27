const path = require('path');
const Promise = require('bluebird');
const domain = require('cqrs-domain');
const uuid = require('uuid').v4;
const { inspect } = require('util');

const idGenerator = (suffix = '') => `${suffix}${uuid().toString()}`;

const domainLibrary = path.join(__dirname, 'domain');

const Domain = domain({
  domainPath: domainLibrary,
  commandRejectedEventName: 'rejectedCommand',
  retryOnConcurrencyTimeout: 2000,

  eventStore: { type: 'inmemory' },
  aggregateLock: { type: 'inmemory' },
  deduplication: { type: 'inmemory' },
});


Domain.defineCommand({
  name: 'name',
  payload: 'data',
  aggregateId: 'data.aggregateId',
  aggregate: 'aggregate',
  context: 'context',
});

Domain.defineEvent({
  correlationId: 'commandId',
  aggregate: 'aggregate',
  payload: 'data',
  aggregateId: 'data.aggregateId',
  context: 'context',
  revision: 'data.revision',
});


Domain.handlePromise = async ({ name, data }) => {
  const id = idGenerator('cmd-');
  const command = { id, name, data };

  return new Promise((resolve, reject) =>
    Domain.handle(command, (err, events, aggregateData, metaInfos) => {
      if (err) { return reject(err); }
      return resolve({ events, aggregateData, metaInfos });
    }));
};

const DomainConstructor = () =>
  new Promise((resolve, reject) =>
    Domain.init((errDomain, warningsDomain) => {
      if (errDomain) { return reject(errDomain); }
      if (warningsDomain) { return reject(new Error(warningsDomain)); }

      Domain.onEvent((evt) => {
        console.log('=====');
        console.log(evt);
        console.log('=====');
      });

      console.log(inspect(Domain.getInfo(), { colors: true, depth: null }));

      return resolve(Domain);
    }));

exports.DomainConstructor = DomainConstructor;
