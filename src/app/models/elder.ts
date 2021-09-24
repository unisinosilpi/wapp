import { toVitalSignsRegistration, VitalSignsRegistration } from './vital-signs-registration';

interface Elder {
  id: string;
  name: string;
  vitalSignsHistory: VitalSignsRegistration[];
}

const toElder = (data: never): Elder => {
  const { id, name, vitalSignsHistory } = data;
  const history = (vitalSignsHistory as Array<any>).map(v => toVitalSignsRegistration(v as never));
  return { id, name, vitalSignsHistory: history };
};

export { Elder, toElder };
