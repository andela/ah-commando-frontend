module.exports = {
  '@tag': ['Logout'],
  'User should be able to logout': (browser) => {
    browser
      .url('http://localhost:9090')
      .pause(2000)
      .waitForElementVisible('[datatest="signin-button"]')
      .assert.visible('[datatest="signin-button"]')
      .click('[datatest="signin-button"]')
      .pause(2000)
      .assert.visible('[data-test="signin-form"]')
      .pause(1000)
      .setValue('#email', 'ngwobiachukwudi@gmail.com')
      .pause(1000)
      .setValue('#password', 'P@ssword123')
      .pause(1000)
      .click('[datatest="loginButton"]')
      .pause(4000)
      .assert.visible('[data-test="userImage"]')
      .pause(1000)
      .click('[data-test="userImage"]')
      .assert.visible('[data-test="drop-down"]')
      .pause(1000)
      .click('[data-test="drop-down"]')
      .pause(3000)
      .end();
  },
};
