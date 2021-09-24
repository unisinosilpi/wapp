import { toVitalSigns, VitalSigns } from './vital-signs';

interface VitalSignsRegistration {
  vitalSigns: VitalSigns;
  nurseId: string;
  collectedAt: string;
}

const toVitalSignsRegistration = (data: never): VitalSignsRegistration => {
  const { vitalSigns, nurseId, collectedAt } = data;
  return { vitalSigns: toVitalSigns(vitalSigns), nurseId, collectedAt };
};

export { VitalSignsRegistration, toVitalSignsRegistration };
