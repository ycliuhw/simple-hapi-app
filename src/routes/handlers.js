import Boom from "boom";

export function cleanUpPostHandler(request, reply) {
  let payload = null;
  let response = {};
  try {
    payload = request.payload.payload;
  } catch (err) {
    response = Boom.badRequest('Invalid request payload JSON format');
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
  return reply(response);
}
