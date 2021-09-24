import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Elder, toElder } from '../models/elder';
import { IEldersService } from './elders-service';
import { VitalSigns } from '../models/vital-signs';
import { InternalServerError } from '../errors/internal-server-error';
import { ElderDoesNotExist } from '../errors/elder-does-not-exist';
import { MissingParameterError } from '../errors/missing-parameter';

@Injectable({
  providedIn: 'root',
})
class ApiEldersService implements IEldersService {
  domain = 'http://localhost:8081';
  service = 'elder';

  constructor(public httpClient: HttpClient) { }

  async getElders(): Promise<Elder[]> {
    try {
      const elders = await (this.httpClient.get(`${this.domain}/${this.service}/`).toPromise()) as Array<never>;
      return elders.map(elder => toElder(elder));
    } catch (err) {
      throw new InternalServerError();
    }
  };

  async registerVitalSigns(vitalSigns: VitalSigns, nurseId: string, elderId: string): Promise<Elder> {
    try {
      const url = `${this.domain}/${this.service}/${elderId}/vitalsigns/`;
      const body = { ...vitalSigns, nurseId };
      const elder = await (this.httpClient.post(url, body).toPromise()) as never;
      return toElder(elder);
    } catch (err) {
      // eslint-disable-next-line curly
      if (err.name === 'ElderDoesNotExist') throw new ElderDoesNotExist(elderId);
      // eslint-disable-next-line curly
      if (err.name === 'MissingParameterError') throw new MissingParameterError();
      throw new InternalServerError();
    }
  };
}

export { ApiEldersService };
