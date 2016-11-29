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

server.ext('onPreResponse', (request, reply) => {
  const response = request.response;
  if (!response.isBoom) {
      return reply.continue();
  }

  // Sadly had to uglily customise the error message here
  const error = response;
  if (error.output.payload.message.includes('Invalid request payload JSON format')) {
    error.output.payload.error = 'Could not decode request: JSON parsing failed';
  }
  return reply(error);
});

server.start((err) => {
  if (err) {
    console.error(`Server starts failed!!!`, err);
  } else {
    console.log( `Server started at ${server.info.uri}`);
  }
});
