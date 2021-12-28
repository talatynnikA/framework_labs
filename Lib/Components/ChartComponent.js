const { assert } = require('chai');

const ComponentBase = require('../Base/ComponentBase');

class ChartComponent extends ComponentBase {
	constructor(webdriver, driver, waitTimeout = 200000) {
		super(webdriver, driver, waitTimeout);
	}

	async clickAddToFavoritesButton() {
		await this.clickWhenClickableByCss('a.js_favorite_link:nth-child(4) > i:nth-child(1)', this.waitTimeout);
	}

	async clickMultichartButton() {
		await this.clickWhenClickableByCss('.lf-fullscreen > svg:nth-child(1)', this.waitTimeout);
	}

	async clickMaximizeChartButton() {
		await this.clickWhenClickableByCss(
			'.lf-fullscreen > svg:nth-child(1)',
			this.waitTimeout
		);
	}

	async checkMessage() {
		let element = await this.waitForElementByCss('html.page_loaded body.mobile_header_hidden div.page main.page_content header.page_header.page_header_bg.cf.js_cards_header div.page_header_part div.title a.js_favorite_link.btn.btn_icon i.icon.icon_star', this.waitTimeout);

		assert.equal(
			await element.getText(),
			'Instrument was added to your Favourites'
		);
	}

	// async checkMultichart() {
	// 	this.clickMultichartButton();

	// 	let element = await this.waitForElementByCss(
	// 		'div:nth-child(1) > .chartMini > .miniChartHeader',
	// 		this.waitTimeout
	// 	);

	// 	let event = new MouseEvent('mouseover', {
	// 		view: window,
	// 		bubbles: true,
	// 		cancelable: true,
	// 	});

	// 	await element.dispatchEvent(event);

	// 	this.clickMaximizeChartButton();

	// 	assert.equal(await element.Length, 2, 'Something wrong lol');
	// }

	async clickBuyButton() {
		await this.clickWhenClickableByCss(
			'.enableColorTransition:nth-child(3)',
			this.waitTimeout
		);
	}

	async clickSellButton() {
		await this.clickWhenClickableByCss(
			'.enableColorTransition:nth-child(1)',
			this.waitTimeout
		);
	}
}

module.exports = ChartComponent;
