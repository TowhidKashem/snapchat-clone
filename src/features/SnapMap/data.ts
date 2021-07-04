import { Object } from 'types';

export const abbrConditionMap: Object<string> = {
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

export const conditionIconMap: Object<string> = {
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
