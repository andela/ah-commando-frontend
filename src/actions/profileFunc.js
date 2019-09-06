/* eslint-disable prefer-promise-reject-errors */
const profileFunc = (article) => new Promise((resolve, reject) => {
  process.nextTick(() => (article
    ? resolve({
      article: {
        title: 'title',
        description: 'description',
      },
    })
    : reject({
      error: 'title cannot be empty',
    })));
});

export default profileFunc;
