module.exports = {
  '@tag': ['Category page'],
  'Category page test': (browser) => {
    browser
      .url('http://localhost:9090')
      .pause(1000)
      .waitForElementVisible('[datatest="nav-link"]')
      .pause(1000)
      .click('[datatest="nav-link"]')
      .pause(10000)
      .end();
  },
};
