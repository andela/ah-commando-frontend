module.exports = {
  '@tag': ['SearchPage'],
  'Search page test': (browser) => {
    browser
      .url('http://localhost:9090')
      .pause(2000)
      .waitForElementVisible('[datatest="search-icon"]')
      .pause(2000)
      .click('[datatest="search-icon"]')
      .pause(2000)
      .assert.visible('[datatest="input-search"]')
      .pause(2000)
      .setValue('[datatest="input-search"]', 'on')
      .pause(2000)
      .keys(browser.Keys.ENTER)
      .pause(5000)
      .end();
  },
};
