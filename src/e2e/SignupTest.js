module.exports = {
  '@tag': ['authors'],
  'Signup form test': (browser) => {
    browser
      .url('http://localhost:9090api/v1')
      .waitForElementVisible('[data-test="homepage"]')
      .pause(2000)
      .click('[data-test="signup-button"]')
      .assert.visible('[data-test="modal"]');
  },
};
