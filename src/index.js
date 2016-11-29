require('babel-core');
import Hapi from 'hapi';

import settings from './config/settings';
import endpoints from './routes';

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: settings.PORT
});

server.route(endpoints);

server.start((err) => {
  if (err) {
    console.error(`Server starts failed!!!`, err);
  } else {
    console.log( `Server started at ${server.info.uri}`);
  }
});
