
export function cleanUpPostHandler(request, reply) {
  let response = [];
  const { payload } = request.payload;
  if (Array.isArray(payload)) {
    response = payload.map(item => {
      if (typeof item === 'object') {
        const { slug, title, image } = item;
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
  reply({response});
}
