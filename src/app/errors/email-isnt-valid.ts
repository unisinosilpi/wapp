import { BaseError } from './base-error';

export class EmailIsNotValid extends BaseError {
	constructor() {
		super(`Por favor, digite um e-mail válido.`);
		this.name = this.constructor.name;
	}
}
