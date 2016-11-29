import Boom from "boom";

export function cleanUpPostHandler(request, reply) {
  let payload = null;
  let response = {};
  try {
    payload = request.payload.payload;
  } catch (err) {
    const errorMessage = 'Could not decode request: JSON parsing failed';
    response = Boom.badRequest('bad request!');
    response.output.payload.error = errorMessage;
    console.error(`cleanUpPostHandler -> `, err, `response -> `, response);
  }
  if (payload && Array.isArray(payload)) {
    response.response = payload.map(item => {
      if (typeof item === 'object') {
        const { slug, title, image, drm, episodeCount } = item;
        if (drm === false || episodeCount <= 0) {
          return null;
        }
        const showImage = typeof image === 'object' ? image.showImage : null;
        if (slug && title && image) {
          return {
            image: showImage,
            slug,
            title
          };
        }
      }
    }).filter(item => item);
  }
  reply(response);
}
