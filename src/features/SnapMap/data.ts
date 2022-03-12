export const celsiusToFahrenheit = (celsius: number): number =>
  Math.round(celsius * 1.8 + 32);

export type Weather = {
  temperature: number;
  condition: string;
};

export const abbrConditionMap: Record<string, string> = {
  sn: 'snow',
  sl: 'sleet',
  h: 'hail',
  t: 'thunderstorm',
  s: 'showers',
  c: 'clear',
  hr: 'heavy-rain',
  lr: 'light-rain',
  hc: 'heavy-cloud',
  lc: 'light-cloud'
};

export const conditionIconMap: Record<string, string> = {
  snow: 'faSnowflake',
  sleet: 'faIcicles',
  hail: 'faCloudMeatball',
  thunderstorm: 'faPooStorm',
  showers: 'faCloudShowersHeavy',
  clear: 'faSun',
  'heavy-rain': 'faCloudShowersHeavy',
  'light-rain': 'faCloudRain',
  'heavy-cloud': 'faCloud',
  'light-cloud': 'faCloudSun'
};
