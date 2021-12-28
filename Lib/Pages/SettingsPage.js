const PageBase = require('../Base/PageBase');

const StringCreator = require('../Utils/StringCreator');

class SettingsPage extends PageBase {
	constructor(
		webdriver,
		driver,
		targetUrl = 'https://my.litefinance.com/ru/profile',
		waitTimeout = 20000
	) {
		super(webdriver, driver, targetUrl, waitTimeout);

		this.name = StringCreator.makeString(7);
		this.surname = StringCreator.makeString(11);
	}

	async clickCloseSettingsButton() {
		await this.clickWhenClickableByCss(
			'div.menu_item:nth-child(2) > a:nth-child(1)',
			this.waitTimeout
		);
	}

	async clickOpenNameSettingsButton() {
		await this.clickWhenClickableByCss('.btn_large', this.waitTimeout);
	}

	async fillNameField() {
		await this.sendKeysWhenEnabledByCss(
			'#usereditform-about',
			this.name,
			this.waitTimeout
		);
	}

	async fillSurnameField() {
		await this.sendKeysWhenEnabledByCss(
			'#usereditform-about',
			this.surname,
			this.waitTimeout
		);
	}

	async fillProfileForm() {
		await this.fillNameField();
		await this.fillSurnameField();
	}

	async clickSaveProfileInfoButton() {
		await this.clickWhenClickableByCss('button.btn');
	}

	async changeProfileData() {
		await this.fillProfileForm();
		await this.clickSaveProfileInfoButton();
	}
}

module.exports = SettingsPage;
