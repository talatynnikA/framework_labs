const { assert } = require('chai');

const ComponentBase = require('../Base/ComponentBase');

class TradesComponent extends ComponentBase {
	constructor(webdriver, driver, waitTimeout = 200000) {
		super(webdriver, driver, waitTimeout);
	}

	async clickOpenedTradesButton() {
		await this.clickWhenClickableByCss('span.trigger:nth-child(3)', this.waitTimeout);
	}

	async clickSummaryButton() {
		await this.clickWhenClickableByCss('.bottombar_link > a:nth-child(1)', this.waitTimeout);
	}

	async clickCloseAllTradesButton() {
		await this.clickWhenClickableByCss(
			'.bottombar_content',
			this.waitTimeout
		);
	}

	// Need one active trade
	async clickCloseLastTradeButton() {
		await this.clickWhenClickableByCss(
			'#p-24-5042816406 > div:nth-child(1) > div:nth-child(10) > div:nth-child(1) > a:nth-child(2)',
			this.waitTimeout
		);
	}

	// Need one active trade
	async clickDuplicateLastTradeButton() {
		await this.clickWhenClickableByCss(
			'.block_chart_sidebar > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > form:nth-child(1) > div:nth-child(3) > div:nth-child(4) > span:nth-child(2) > button:nth-child(1)',
			this.waitTimeout
		);
	}

	async clickSubmitDuplicationButton() {
		await this.clickWhenClickableByCss(
			'.block_chart_sidebar > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > form:nth-child(1) > div:nth-child(3) > div:nth-child(4) > span:nth-child(2) > button:nth-child(1)',
			this.waitTimeout
		);
	}

	async checkDuplicationMessage() {
		let element = await this.waitForElementByCss('.popup_state_content', this.waitTimeout);

		console.log(await element.getText());

		assert.equal(
			await element.getText(),
			'Your request to open a new trade was executed successfully.'
		);
	}

	async clickSubmitCloseTradeButton() {
		await this.clickWhenClickableByCss('#closeSaveButton', this.waitTimeout);
	}

	async checkCloseMessage() {
		let element = await this.waitForElementByCss('.popup_state_content', this.waitTimeout);

		assert.equal(
			await element.getText(),
			'Your request to close an existing trade was executed successfully.'
		);
	}

	async checkActiveTradesCount() {
		let element = await this.waitForElementByCss(
			'.notradesmessage',
			this.waitTimeout
		);

		assert.equal(await element.getText(), "You don't have any open trade(s).");
	}
}

module.exports = TradesComponent;
