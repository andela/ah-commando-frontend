module.exports = {
  '@tag': ['Like or Dislike a Resource'],
  'Step 1: show like buttons on homepage': (browser) => {
    browser
      .url('http://localhost:9090')
      .waitForElementVisible('body')
      .waitForElementVisible('div[class="like"]', 1000)
      .pause(2000);
  },
  'Step 2: log in a user': (browser) => {
    browser
      .click('button[datatest=signin-button]')
      .pause(1500)
      .waitForElementVisible('div[class=form]')
      .pause(2000)
      .setValue('input[name=email]', 'dominicisioma000@gmail.com')
      .setValue('input[name=password]', 'P@ssword123')
      .click('button[id=signin]')
      .pause(1200);
  },
  'Step 3: click like button': (browser) => {
    browser
      .click('div[class="like"]')
      .pause(1500)
      .end();
  },
};
