import { BaseError } from './base-error';

export class UserDoesNotExist extends BaseError {
	constructor() {
		super(`E-mail ou senha incorretos.`);
		this.name = this.constructor.name;
	}
}
