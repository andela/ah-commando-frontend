const article = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
module.exports = {
  '@tag': ['articles'],
  'User should be able to create articles': (browser) => {
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
      .url('http://localhost:9090/create-article/')
      .pause(2000)
      .waitForElementVisible('input[name="title"]')
      .setValue('input[name="title"]', 'Lorem Ipsum')
      .pause(3000)
      .waitForElementVisible('[data-placeholder="Tell us your story..."]')
      .setValue('[data-placeholder="Tell us your story..."]', article)
      .pause(2000)
      .assert.visible('[datatest="publish-button"]')
      .click('[datatest="publish-button"]')
      .pause(500)
      .setValue('input[id=file]', '/Users/chux/Documents/Screenshot 2019-09-10 at 00.23.36.png')
      .pause(4000)
      .assert.visible('input[class="tag-input-field"]')
      .setValue('input[class="tag-input-field"]', 'lorem ipsum tags ')
      .pause(1000)
      .assert.visible('textarea[name="description"]')
      .setValue('textarea[name="description"]', 'Thanks guys for watching to this point. Happy reviewing!!!')
      .pause(1000)
      .assert.visible('[datatest="publish-final"]')
      .click('[datatest="publish-final"]')
      .pause(3000)
      .end();
  },
};
