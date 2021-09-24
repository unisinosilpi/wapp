import { Elder } from '../models/elder';
import { VitalSigns } from '../models/vital-signs';

abstract class IEldersService {
  getElders(): Promise<Elder[]> { return; };
  registerVitalSigns(vitalSigns: VitalSigns, nurseId: string, elderId: string): Promise<Elder> { return; };
}

export { IEldersService };
