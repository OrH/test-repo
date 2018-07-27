const { inspect } = require('util');
const { DomainConstructor } = require('./eventsourcing');


DomainConstructor()
  .then((domain) => {
    console.log('Issuing command');
    return domain.handlePromise({ name: 'openBook', data: { rana: 'pippo' } });
  })
  .then((resp) => {
    console.log('------');
    console.log(inspect(resp, { colors: true, depth: null }));
    console.log('------');
  })
  .catch((err) => {
    console.log('++++++');
    console.log(err);
    console.log('++++++');
  });
