const ComponentBase = require('./ComponentBase');

class PageBase extends ComponentBase {
	constructor(webdriver, driver, targetUrl, waitTimeout = 100000) {
		super(webdriver, driver, waitTimeout);
		this.targetUrl = targetUrl;
		this.waitTimeout = waitTimeout;
	}

	async navigate() {
		await this.driver.navigate().to(this.targetUrl);
	}

	async returnFromDestination() {
		return this.driver.navigate().back();
	}

	async refreshPage() {
		return this.driver.navigate().refresh();
	}
}

module.exports = PageBase;
