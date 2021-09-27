import { BaseError } from './base-error';

class ElderDoesNotExist extends BaseError {
  constructor(id: string) {
    super(`O institucionalizado <${id}> não está corretamente cadastrado.`);
    this.name = this.constructor.name;
  }
}

export { ElderDoesNotExist };
