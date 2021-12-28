const ComponentBase = require('../Base/ComponentBase');

class InstrumentMenuComponent extends ComponentBase {
	constructor(webdriver, driver, waitTimeout = 200000) {
		super(webdriver, driver, waitTimeout);
	}

	async clickMenuSelector() {
		await this.clickWhenClickableByCss('li.active > a:nth-child(1) > span:nth-child(2)', this.waitTimeout);
	}

	async clickFavoritesMenuItem() {
		await this.clickWhenClickableByCss(
			'div.menu_item:nth-child(1) > a:nth-child(1)',
			this.waitTimeout
		);
	}

	async clickAllMenuItem() {
		await this.clickWhenClickableByCss(
			'div.menu_item:nth-child(2) > a:nth-child(1)',
			this.waitTimeout
		);
	}


	async clickAllCurrencyMenuItem() {
		await this.clickWhenClickableByCss(
			'#sortable>div:first-of-type',
			this.waitTimeout
		);
	}


	async clickAllCurrencyMainMenuItem() {
		await this.clickWhenClickableByCss(
			'.instrumentsAnimatedContainer > :first-child',
			this.waitTimeout
		);
	}


	async clickInstrumentBySymbol(symbol) {
		await this.clickWhenClickableByCss(
			`div.card:nth-child(26) > div:nth-child(1) > a:nth-child(5)`,

			this.waitTimeout
		);
	}

	async goToFavorites() {
		await this.clickMenuSelector();
		await this.clickFavoritesMenuItem();
	}

	async goToCurrencyPairs() {
		await this.clickMenuSelector();
		await this.clickAllMenuItem();
		await this.clickAllCurrencyMenuItem();
		await this.clickAllCurrencyMainMenuItem();
	}

	async openCurrencyPairFromFavorites(symbol) {
		await this.goToFavorites();
		await this.clickInstrumentBySymbol(symbol);
	}

	async openCurrencyPairFromMain(symbol) {
		await this.goToCurrencyPairs();
		await this.clickInstrumentBySymbol(symbol);
	}
}

module.exports = InstrumentMenuComponent;
