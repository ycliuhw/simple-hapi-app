import { cleanUpPostHandler } from './handlers';

export default [
  {
    method: "POST",
    path: "/",
    handler: cleanUpPostHandler
  }
];
