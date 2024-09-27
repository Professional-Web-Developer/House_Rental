// Test/tests/registerTest.js
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Register Page Test', function() {
  this.timeout(60000); // Setting a timeout of 60 seconds for the entire test
  let driver;

  before(async function() {
    let options = new chrome.Options();
    options.addArguments('--start-maximized');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  });

  after(async function() {
    await driver.quit();
  });

  it('should register a new user and redirect to login page', async function() {
    await driver.get('http://localhost:5173/user/register');

    console.log(await driver.getCurrentUrl()); // Log the current URL
    console.log(await driver.getPageSource()); // Log the HTML source of the page

    // Wait for the form to be visible
    await driver.wait(until.elementLocated(By.css('form')), 60000); // 60 seconds

    // Wait for each input field to be visible
    await driver.wait(until.elementLocated(By.name('name')), 60000); // 60 seconds
    await driver.wait(until.elementLocated(By.name('email')), 60000); // 60 seconds
    await driver.wait(until.elementLocated(By.name('mobile')), 60000); // 60 seconds
    await driver.wait(until.elementLocated(By.name('password')), 60000); // 60 seconds

    // Interact with the form
    await driver.findElement(By.name('name')).sendKeys('John Doe');
    await driver.findElement(By.name('email')).sendKeys('test@example.com');
    await driver.findElement(By.name('mobile')).sendKeys('1234567890');
    await driver.findElement(By.name('password')).sendKeys('Password@123', Key.RETURN);

    // Wait for redirection
    await driver.wait(until.urlContains('/user/login'), 60000); // 60 seconds

    // Verify redirection
    let loginHeader = await driver.findElement(By.tagName('h1')).getText();
    assert.strictEqual(loginHeader, 'Login');
  });
});
