import merge from 'lodash/merge';

const { NODE_ENV } = process.env;
const settings = {

  default: {
    NODE_ENV,

    NEW_RELIC: {
      ENABLED: true,
      LICENSE_KEY: '7507ee8e10',
      APPLICATION_ID: '15967387'
    },

    GENERAL: {
      TIME_OUT: 30000,
      DATE_FORMAT: 'DD MMM YYYY'
    },


  development: {

  },

  integration: {

  },

  staging: {

  },

  production: {

  }

};
const output = settings[NODE_ENV] ?
  merge(settings.default, settings[NODE_ENV]) :
  merge(settings.default, settings.development);

export default output;
