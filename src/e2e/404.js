module.exports = {
  '@tag': ['Not found'],
  'Fall back to 404 page when route is not found': (browser) => {
    browser
      .url('http://localhost:9090/non-existent-route/404')
      .pause(3000)
      .assert.visible('[class="not-found"]')
      .pause(1000)
      .assert.visible('a')
      .assert.containsText('a', 'click here')
      .pause(2000)
      .click('a')
      .pause(2000)
      .end();
  },
};
