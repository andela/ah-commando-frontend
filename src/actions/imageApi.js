const imageApi = (image) => new Promise((resolve, reject) => {
  process.nextTick(() => (image
    ? resolve({
      image: {
        image: 'http://path/to/image',
      },
    })
  // eslint-disable-next-line prefer-promise-reject-errors
    : reject({
      error: 'image not found',
    })));
});

export default imageApi;
