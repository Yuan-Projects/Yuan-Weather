import wx from '../utils/wx.mock.js';

import {
  getCitiesByKeyword,
  getWeatherDataByLocation,
  adaptAPIResponse,
  getTopCities } from '../utils/heweather.js';

describe('getCitiesByKeyword', () => {
  test('getCitiesByKeyword() is defined', () => {
    expect(getCitiesByKeyword).toBeTruthy();
  });

  test('Supports callback function', done => {
    const expectedData = {
      cid: 'CN101010100', location: '北京',
      parent_city: '北京',
      admin_area: '北京',
      cnty: '中国',
      lat: '39.90498734',
      lon: '116.4052887',
      tz: '+8.00',
      type: 'city'
    };
    getCitiesByKeyword('beijing', data => {
      expect(data[0]).toMatchObject(expectedData);
      done();
    });
  });
});