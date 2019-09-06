// module.exports = {
//   '@tag': ['authors'],
//   'Profile page test': (browser) => {
//     browser
//       .url('http://localhost:9090/profile')
//       .waitForElementVisible('[datatest="edit-button"]')
//       .assert.visible('[datatest="edit-button"]')
//       .pause(1000)
//       .click('[datatest="edit-button"]')
//       .assert.visible('input[name=email]')
//       .setValue('input[name=email]', 'igwechino@gmail.com')
//       .assert.visible('input[name=username]')
//       .setValue('input[name=username]', 'nono')
//       .assert.visible('textarea[name=bio]')
//       .setValue('textarea[name=bio]', 'this is a simple bio')
//       .assert.visible('input[type=file]')
//       .setValue('input[type=file]', '/Users/igwechinonso/Downloads/event.jpeg')
//       .pause(7000)
//       .assert.visible('[datatest="submit-button"]')
//       .click('[datatest="submit-button"]')
//       .saveScreenshot('tests_output/edit.png')
//       .pause(5000)
//       .end();
//   },
// };
