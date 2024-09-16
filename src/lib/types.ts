type SwitchValue = "on" | "off" | boolean;

export type MessageDataMQTT = {
  soil_moisture?: number;
  temperature?: number;
  humidity?: number;
  lamp1?: SwitchValue;
  lamp2?: SwitchValue;
  lamp3?: SwitchValue;
  lamp4?: SwitchValue;
  pump?: SwitchValue;
};

export type LampData = {
  toolId: number;
  inputName: string;
  name: string;
};
