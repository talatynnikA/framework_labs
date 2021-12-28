const webdriver = require('selenium-webdriver');
const LoginPage = require('../Lib/Pages/LoginPage');
const HomePage = require('../Lib/Pages/HomePage');
const OpenTicketPage = require('../Lib/Pages/OpenTicketPage');
const SettingsPage = require('../Lib/Pages/SettingsPage');

const driver = require('../Lib/Driver/ChromeDriver');



describe('liteforex tests', async function () {
	process.on('unhandledRejection', error => {
		throw error;
	});

	before(async () => {
		this.loginPage = new LoginPage(webdriver, driver);
		this.homePage = new HomePage(webdriver, driver);
		this.openTicketPage = new OpenTicketPage(webdriver, driver);
		this.settingsPage = new SettingsPage(webdriver, driver);
	});

	it('Should login and add currency pair to Favorites', async () => {
		this.loginPage.log('- login page');
		await this.loginPage.navigate();
		this.loginPage.log('- Log in to account');
		await this.loginPage.logIntoAccount();
		this.loginPage.log('- Open currency pair');
		await this.homePage.menu.openCurrencyPairFromMain('AUDJPY');
		this.loginPage.log('- Add currency pair to favorites');
		await this.homePage.chart.clickAddToFavoritesButton();
		await this.homePage.menu.goToFavorites();
		await this.homePage.chart.checkMessage();
	});

	it('Should raise wrong amount error', async () => {
		this.loginPage.log('- Open buy window');
		await this.homePage.chart.clickBuyButton();
		this.loginPage.log('- Try buy zero');
		await this.openTicketPage.fillAmountField('0');
		await this.openTicketPage.checkErrorMessage();
		await this.homePage.clickCloseWindowButton();
	});

	it('Should change trade bid and confirm', async () => {
		let bid = '100000000';
		await this.homePage.chart.clickBuyButton();
		this.loginPage.log('- Fill bid field');
		await this.openTicketPage.fillAmountField(bid);
		this.loginPage.log('- Check if bid changed');
		await this.openTicketPage.checkIsAmountChanged(bid);
		this.loginPage.log('- Make bid');
		await this.openTicketPage.clickAcceptButton(true);
		await this.homePage.clickCloseAlertButton();
	});

	it('Should prohibit trade acception', async () => {
		await this.homePage.chart.clickBuyButton();
		this.loginPage.log('- Fill bid field');
		await this.openTicketPage.fillAmountField('1000');
		this.loginPage.log('- Try to buy with no money');
		await this.openTicketPage.clickAcceptButton(false);
		this.loginPage.log('- Close buy window');
		await this.homePage.clickCloseWindowButton();
		await this.homePage.clickCloseAlertButton();
	});

	it('Should close trade', async () => {
		this.loginPage.log('- Close last trade');
		await this.homePage.trades.clickCloseLastTradeButton();
		this.loginPage.log('- Submit close');
		await this.homePage.trades.clickSubmitCloseTradeButton();
		await this.homePage.clickCloseAlertButton();
		// await this.homePage.trades.checkCloseMessage();
	});

	it('Should open trade', async () => {
		this.loginPage.log('- Open new trade');
		await this.homePage.chart.clickBuyButton();
		await this.openTicketPage.fillAmountField('1000');
		await this.openTicketPage.clickAcceptButton(true);
		// await this.homePage.clickCloseWindowButton();
		await this.homePage.clickCloseAlertButton();
	});

	it('Should duplicate trade', async () => {
		this.loginPage.log('- Duplicate trade');
		await this.homePage.trades.clickDuplicateLastTradeButton();
		await this.homePage.trades.clickSubmitDuplicationButton();
		this.loginPage.log('- Check if duplicated');
		await this.homePage.trades.checkDuplicationMessage();
		await this.homePage.clickCloseAlertButton();
	});

	it('Should close all trades', async () => {
		this.loginPage.log('- Close all active trades');
		await this.homePage.trades.clickCloseAllTradesButton();
		this.loginPage.log('- Submit close trades');
		await this.homePage.trades.clickSubmitCloseTradeButton();
		await this.homePage.trades.checkActiveTradesCount();
	});

	after(async () => {
		this.loginPage.log('- Remove currency pair from favorites');
		await this.homePage.chart.clickAddToFavoritesButton();
		this.loginPage.log('- Checking Webdriver logs');
		await this.loginPage.dumpWebDriverLogs();
	});



	after(async () => driver.quit());
});

