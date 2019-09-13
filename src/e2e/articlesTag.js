module.exports = {
  '@tag': ['articlesTag'],
  'User should be able to see articles list on clicking a tag': (browser) => {
    browser
      .url('http://localhost:9090/articles/Regional-Group-Manager')
      .pause(3000)
      .assert.visible('div[class="read-article"]')
      .pause(500)
      .moveToElement('div[class="comment-delete"]', 10, 10)
      .waitForElementVisible('div[class="article-tag-div"]')
      .pause(3000)
      .click('li[class="liTag"]')
      .pause(3000)
      .waitForElementVisible('articlesList')
      .pause(3000)
      .end();
  },
};
