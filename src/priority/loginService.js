import * as priority from 'priority-web-sdk';

// let priority;
class LoginService {
	async login() {
		// const priorityImport = await import('priority-web-sdk');
		// priority = priorityImport;

		const config = {
			url: 'https://www.eshbelsaas.com/ui/34',
			tabulaini: 'tabmob.ini',
			devicename: '',
			language: 1,
			company: 'demo',
			appname: 'attendance',
			username: 'apidemo',
			password: '123'
		};

		console.log(" => priority.login(config)");

		const login = priority.login(config);

		return login;
	}
}

export default new LoginService();
