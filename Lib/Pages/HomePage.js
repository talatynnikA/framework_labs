const PageBase = require('../Base/PageBase');
const InstrumentMenuComponent = require('../Components/InstrumentMenuComponent');
const ChartComponent = require('../Components/ChartComponent');
const TradesComponent = require('../Components/TradesComponent');
const HamburgerComponent = require('../Components/HamburgerComponent');

class HomePage extends PageBase {
	constructor(
		webdriver,
		driver,
		targetUrl = 'div.logo:nth-child(2) > a:nth-child(1) > img:nth-child(1)',
		waitTimeout = 200000
	) {
		super(webdriver, driver, targetUrl, waitTimeout);
		this.menu = new InstrumentMenuComponent(webdriver, driver);
		this.chart = new ChartComponent(webdriver, driver);
		this.trades = new TradesComponent(webdriver, driver);
		this.hamburger = new HamburgerComponent(webdriver, driver);
	}

	async clickCloseAlertButton() {
		await this.clickWhenClickableByCss('li.active > a:nth-child(1)', this.waitTimeout);
	}

	async clickCloseWindowButton() {
		await this.clickWhenClickableByCss(
			'.js_chat_trigger',
			this.waitTimeout
		);
	}
}

module.exports = HomePage;
