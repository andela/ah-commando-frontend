module.exports = {
  '@tag': ['articles'],
  'User should be able to share articles': (browser) => {
    browser
      .url('http://localhost:9090/articles/multi-byte-invoice-payment')
      .pause(3000)
      .assert.visible('div[class="read-article"]')
      .pause(500)
      .assert.visible('[class="option-icon dropdown"]')
      .pause(1000)
      .assert.visible('[data-icon="ellipsis-h"]')
      .pause(200)
      .moveToElement('[data-icon="ellipsis-h"]', 1, 1)
      .pause(1000)
      .moveToElement('[aria-label="email"]', 1, 1)
      .pause(2000)
      .moveToElement('[aria-label="twitter"]', 1, 1)
      .pause(2000)
      .moveToElement('[aria-label="facebook"]', 1, 1)
      .pause(2000)
      .moveToElement('[aria-label="email"]', 1, 1)
      .pause(2000)
      .moveToElement('[aria-label="twitter"]', 1, 1)
      .pause(1000)
      .assert.visible('[aria-label="twitter"]')
      .assert.visible('[aria-label="facebook"]')
      .assert.visible('[aria-label="email"]')
      .pause(1000)
      .click('[aria-label="twitter"]')
      .pause(5000)
      .end();
  },
};
