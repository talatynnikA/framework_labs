const PageBase = require('../Base/PageBase');

class LoginPage extends PageBase {
	constructor(
		webdriver,
		driver,
		targetUrl = 'https://my.liteforex.com/ru?openPopup=%2Fru%2Flogin%2Fpopup%3FreturnUrl%3D%252Fru%252F',
		waitTimeout = 200000
	) {
		super(webdriver, driver, targetUrl, waitTimeout);
	}

	async fillLoginField(login) {
		await this.sendKeysWhenEnabledByCss(
			'#loginform-login',
			login,
			this.waitTimeout
		);
	}

	async fillPasswordField(password) {
		await this.sendKeysWhenEnabledByCss(
			'#loginform-password',
			password,
			this.waitTimeout
		);
	}

	async clickLoginButton() {
		await this.clickWhenClickableByCss('button.btn_blue:nth-child(1)');
	}

	async fillLoginForm() {
		const login = 'shkolar.neymeka@bk.ru';
		const password = 'V$#C8BZC6Nn*5jr';

		await this.fillLoginField(login);
		await this.fillPasswordField(password);
	}

	async submitLoginForm() {
		await this.clickLoginButton();
	}

	async logIntoAccount() {
		await this.fillLoginForm();
		await this.submitLoginForm();
	}
}

module.exports = LoginPage;
