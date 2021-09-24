import { BaseError } from './base-error';

class MissingParameterError extends BaseError {
  constructor() {
    super(`Nossa integração está com defeito. Por favor, entre em contato com a administração do sistema. <MissingParameterError>`);
    this.name = this.constructor.name;
  }
}

export { MissingParameterError };
