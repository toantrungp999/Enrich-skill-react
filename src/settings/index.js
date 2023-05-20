/* eslint-disable no-undef */
import devSettings from './dev';
import stagSettings from './stag';
import prodSettings from './prod';

let settings = {};
switch (process.env.MODE) {
  case 'stag':
    settings = stagSettings;
    break;
  case 'prod':
    settings = prodSettings;
    break;
  default:
    settings = devSettings;
    break;
}

export default settings;
