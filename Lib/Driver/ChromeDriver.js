const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
const pref = new webdriver.logging.Preferences();
const driver = new webdriver.Builder()
	.withCapabilities(webdriver.Capabilities.firefox())
	.setLoggingPrefs(pref)
	.build();

module.exports = driver;
