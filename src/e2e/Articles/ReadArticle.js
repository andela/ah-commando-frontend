module.exports = {
  '@tag': ['articles'],
  'User should be able to read articles': (browser) => {
    browser
      .url('http://localhost:9090/articles/i-am-chuks-v20')
      .pause(3000)
      .assert.visible('div[class="read-article"]')
      .pause(500)
      .moveToElement('div[class="comment-delete"]', 10, 10)
      .waitForElementVisible('div[class="article-tag-div"]')
      .pause(2000)
      .end();
  },
};
