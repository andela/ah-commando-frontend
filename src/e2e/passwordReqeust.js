module.exports = {
  '@tag': ['RequestPassword'],
  'Request Password form test': (browser) => {
    browser
      .url('http://localhost:9090')
      .waitForElementVisible('[data-test="homepage"]')
      .waitForElementVisible('[datatest="loginButton"]')
      .pause(1000)
      .assert.visible('[datatest="loginButton"]')
      .pause(1000)
      .click('[datatest="loginButton"]')
      .pause(2000)
      .waitForElementVisible('[datatest="request-passwordBtn"]')
      .pause(1000)
      .assert.visible('[datatest="request-passwordBtn"]')
      .pause(1000)
      .click('[datatest="request-passwordBtn"]')
      .pause(1000)
      .setValue('#passwordEmail', 'kafilatabdulwahab01@gmail.com')
      .pause(2000)
      .click('[datatest="send-password-link"]')
      .pause(5000)
      .end();
  },
};
