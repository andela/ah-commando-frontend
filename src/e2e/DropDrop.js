module.exports = {
  '@tag': ['DropDown'],
  'Signup form test': (browser) => {
    browser
      .url('http://localhost:9090/')
      .waitForElementVisible('[data-test="homepageComponent"]', 2000)
      .pause(3000)
      .waitForElementVisible('[datatest="signin-button"]')
      .assert.visible('[datatest="signin-button"]')
      .click('[datatest="signin-button"]')
      .pause(2000)
      .assert.visible('[data-test="signin-form"]')
      .pause(1000)
      .setValue('#email', 'jjchinosoviolet@gmail.com')
      .pause(1000)
      .setValue('#password', 'Sevenup@1')
      .pause(3000)
      .click('[datatest="loginButton"]')
      .pause(4000)
      .assert.visible('[datatest="notifyButton"]')
      .pause(3000)
      .click('[datatest="notifyButton"]')
      .pause(5000)
      .click('[datatest="profileButton"]')
      .pause(5000)
      .end();
  },
};
