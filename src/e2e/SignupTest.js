module.exports = {
  '@tag': ['authors'],
  'Signup form test': (browser) => {
    browser
      .url('http://localhost:9090')
      .waitForElementVisible('[data-test="homepage"]', 2000)
      .assert.visible('[data-test="header"]')
      .waitForElementVisible('[datatest="signup-button"]')
      .assert.visible('[datatest="signup-button"]')
      .click('[datatest="signup-button"]')
      .pause(2000)
      .assert.visible('[datatest="signup-form"]')
      .setValue('input[name=firstname]', 'Johnson')
      .setValue('input[name=lastname]', 'Dower')
      .setValue('input[name=username]', 'johndower1_')
      .setValue('#email', 'Johndower@gmail.com')
      .setValue('#password', 'Password1$')
      .setValue('#passwordConfirm', 'Password1$')
      .pause(2000)
      .click('[datatest="signup-submit"]')
      .saveScreenshot('tests_output/edit.png')
      .end();
  },
};
