interface VitalSigns {
  oxygenSaturation: number;
  bloodPressure: number;
  heartRate: number;
  breathRate: number;
  bodyTemperature: number;
}

const toVitalSigns = (data: never): VitalSigns => {
  const { oxygenSaturation, bloodPressure, heartRate, breathRate, bodyTemperature } = data;
  return { oxygenSaturation, bloodPressure, heartRate, breathRate, bodyTemperature };
};

export { VitalSigns, toVitalSigns };
