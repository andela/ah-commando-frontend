module.exports = {
  '@tag': ['HomePage'],
  'Signup form test': (browser) => {
    browser
      .url('http://localhost:9090/')
      .waitForElementVisible('[data-test="homepageComponent"]', 2000)
      .pause(3000)
      .getLocationInView('.banner')
      .pause(4000)
      .assert.visible('[datatest="BannerButtontest"]')
      .pause(3000)
      .click('[datatest="BannerButtontest"]')
      .pause(5000)
      .end();
  },
};
