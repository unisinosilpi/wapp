import { BaseError } from './base-error';

export class InternalServerError extends BaseError {
	constructor() {
		super('Ops, tivemos um erro interno... Por favor, tente novamente mais tarde.');
		this.name = this.constructor.name;
	}
}
