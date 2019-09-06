module.exports = {
  '@tag': ['authors'],
  'This is the first test': (browser) => {
    browser
      .url('http://localhost:9090')
      .waitForElementVisible('[data-test="first-test"]')
      .assert.containsText('[data-test="first-test"]', 'Home')
      .assert.visible('[data-test="login-link"]')
      .pause(1000)
      .click('[data-test="login-link"]')
      .saveScreenshot('tests_output/homepage.png')
      .pause(5000)
      .end();
  },
};
