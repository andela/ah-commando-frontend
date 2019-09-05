module.exports = {
  '@tag': ['authors'],
  'Social Login': (browser) => {
    browser
      .url('http://localhost:9090')
      .waitForElementVisible('body')
      .waitForElementVisible('button[id=signin]', 5000)
      .pause(2000);
  },
  'Step 2: click Login Button': (browser) => {
    browser
      .click('#signin')
      .pause(2000)
      .waitForElementVisible('.modal', 3000)
      .pause(2000);
  },
  'Step 3: click the social icon': (browser) => {
    browser
      .click('span[name=google]')
      .pause(9000)
      .waitForElementVisible('body[id=yDmH0d]', 3000)
      .pause(2000);
  },
  'Step 4: input email data into google form': (browser) => {
    browser
      .waitForElementVisible('input[id=identifierId]')
      .pause(1000)
      .setValue('input[id=identifierId]', 'dominicisioma000@gmail.com')
      .pause(2000)
      .waitForElementVisible('div[id=identifierNext]', 3000)
      .click('div[id=identifierNext]')
      .pause(1000);
  },
  'Step 5: input password into google form': (browser) => {
    browser
      .waitForElementVisible('input[name=password]')
      .pause(1000)
      .setValue('input[name=password]', process.env.GMAIL_PASSWORD)
      .pause(1000)
      .waitForElementVisible('div[id=passwordNext]', 3000)
      .click('div[id=passwordNext]')
      .pause(1000);
  },
  'Step 6: redirect user to login': (browser) => {
    browser
      .waitForElementVisible('div[data-test=loginPageComponent]')
      .pause(3000)
      .end();
  },
};
