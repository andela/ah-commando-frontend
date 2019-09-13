module.exports = {
  '@tag': ['authors'],
  'Profile page test': (browser) => {
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
      .pause(2000)
      .url('http://localhost:9090/articles/Chief-Brand-Representative')
      .pause(2000)
      .assert.visible('.unfollow-btn')
      .pause(1000)
      .click('.unfollow-btn')
      .pause(2000)
      .end();
  },
};
