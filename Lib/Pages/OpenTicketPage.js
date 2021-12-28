const { assert } = require('chai');
const PageBase = require('../Base/PageBase');

class OpenTicketPage extends PageBase {
	constructor(
		webdriver,
		driver,
		targetUrl = 'https://my.litefinance.com/ru/trading/chart?symbol=EURJPY',
		waitTimeout = 20000
	) {
		super(webdriver, driver, targetUrl, waitTimeout);
	}

	async getTitle() {
		let element = await this.waitForElementByCss(
			'.title > h2:nth-child(3)',
			this.waitTimeout
		);
		return await element.getText();
	}

	async fillAmountField(amount) {
		await this.sendKeysWhenEnabledByCss(
			`#price_value_1${(await this.getTitle()).replace('/', '')}`,
			amount,
			this.waitTimeout
		);
		await this.clickSomewere();
	}

	async clickAcceptButton(expectedValue) {
		let title = await this.getTitle();
		await this.clickWhenClickableByCss('.ticketActionButton');
		if (expectedValue) await this.checkAlertMessage(title, expectedValue);
	}

	async clickSomewere() {
		await this.clickWhenClickableByCss(
			'.block_chart_sidebar > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > form:nth-child(1) > div:nth-child(3) > div:nth-child(4) > span:nth-child(2) > button:nth-child(1)'
		);
	}

	async checkErrorMessage() {
		let element = await this.waitForElementByCss(
			'.popup_state_content',
			this.waitTimeout
		);

		assert.equal(await element.getText(), 'The minimum trade amount is 1000.');
	}

	async checkAlertMessage(title, expectedValue) {
		let element = await this.waitForElementByCss('.row2', this.waitTimeout);

		assert.equal((await element.getText()).includes(title), expectedValue);
	}

	async checkIsAmountChanged(expectedAmount) {
		let element = await this.waitForElementByCss(
			'#total-available',
			this.waitTimeout
		);
		assert.notEqual(
			parseInt(expectedAmount),
			parseInt((await element.getText()).replace(',', ''))
		);
	}
}

module.exports = OpenTicketPage;
