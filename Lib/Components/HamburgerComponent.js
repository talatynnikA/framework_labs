const { assert } = require('chai');

const ComponentBase = require('../Base/ComponentBase');

class HamburgerComponent extends ComponentBase {
	constructor(webdriver, driver, waitTimeout = 200000) {
		super(webdriver, driver, waitTimeout);
	}

	async clickOpenHamburgerMenuButton() {
		await this.clickWhenClickableByCss('.icon_menu', this.waitTimeout);
	}

	async clickOpenSettingsMenuButton() {
		await this.clickWhenClickableByCss(
			'.js_guide_menu_profile > a:nth-child(1) > span:nth-child(2)',
			this.waitTimeout
		);
	}

	async clickOpenAccountSettingsButton() {
		await this.clickWhenClickableByCss(
			'.btn_large',
			this.waitTimeout
		);
	}
}

module.exports = HamburgerComponent;
