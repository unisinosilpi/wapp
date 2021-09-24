import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Elder, toElder } from '../models/elder';
import { IEldersService } from './elders-service';
import { VitalSigns } from '../models/vital-signs';

@Injectable({
  providedIn: 'root',
})
class ApiEldersService implements IEldersService {
  domain = 'http://localhost:8081';
  service = 'elder';

  constructor(public httpClient: HttpClient) { }

  async getElders(): Promise<Elder[]> {
    const elders = await (this.httpClient.get(`${this.domain}/${this.service}/`).toPromise()) as Array<never>;
    return elders.map(elder => toElder(elder));
  };

  async registerVitalSigns(vitalSigns: VitalSigns, nurseId: string, elderId: string): Promise<Elder> {
    const url = `${this.domain}/${this.service}/${elderId}/vitalsigns/`;
    const body = { ...vitalSigns, nurseId };
    const elder = await (this.httpClient.post(url, body).toPromise()) as never;
    return toElder(elder);
  };
}

export { ApiEldersService };
