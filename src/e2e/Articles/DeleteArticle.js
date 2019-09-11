module.exports = {
  '@tag': ['articles'],
  'User should be able to delete articles': (browser) => {
    browser
      .url('http://localhost:9090')
      .pause(2000)
      .waitForElementVisible('[datatest="signin-button"]')
      .assert.visible('[datatest="signin-button"]')
      .click('[datatest="signin-button"]')
      .pause(500)
      .assert.visible('[data-test="signin-form"]')
      .pause(1000)
      .setValue('#email', 'ngwobiachukwudi@gmail.com')
      .pause(200)
      .setValue('#password', 'P@ssword123')
      .pause(200)
      .click('[datatest="loginButton"]')
      .pause(3000)
      .url('http://localhost:9090/articles/ghghgg')
      .pause(3000)
      .assert.visible('div[class="read-article"]')
      .pause(500)
      .assert.visible('[class="delete-icon"]')
      .pause(1000)
      .moveToElement('[class="delete-icon"]', 200, 2000)
      .waitForElementVisible('[class="delete-icon"]')
      .pause(2000)
      .click('[class="delete-icon"]')
      .pause(2000)
      .assert.visible('button[class="swal-button swal-button--confirm swal-button--danger"]')
      .pause(500)
      .click('button[class="swal-button swal-button--confirm swal-button--danger"]')
      .pause(1000)
      .end();
  },
};
