import { ajax, getCurrentPage, getLevel, getWeek } from '../utils/util';

describe('ajax()', () => {
  test('ajax() function is defined', () => {
    expect(ajax).toBeDefined();
  });
});

// TODO
/*
describe('getCurrentPage()', () => {
  test('getCurrentPage() returns a string', () => {
    expect(typeof getCurrentPage()).toEqual('string');
  });
});
*/

describe('getLevel()', () => {
  test('Throws an exception when not a valid number was passed', () => {
    expect(() => {
      getLevel()
    }).toThrow();
  });
  test('Throws an exception when the parameter is less than 0', () => {
    expect(() => {
      getLevel(-1)
    }).toThrow();
  });
  test('500 => Level 5', () => {
    expect(getLevel(500)).toEqual('level_5');
  });
  test('151 => Level 4', () => {
    expect(getLevel(151)).toEqual('level_4');
  });
  test('150 => Level 3', () => {
    expect(getLevel(150)).toEqual('level_3');
  });
  test('100 => Level 3', () => {
    expect(getLevel(100)).toEqual('level_2');
  });
  test('50 => Level 5', () => {
    expect(getLevel(50)).toEqual('level_1');
  });
});

describe('getUrlArg()', () => {

});

describe('getWeek', () => {
  test('getWeek() is defined', () => {
    expect(getWeek).toBeDefined();
  });

  test('Throws an exception if the parameter is not a number', () => {
    expect(() => {
      getWeek();
    }).toThrow();
  });

  test('Throws an exception if the parameter is greater than 6', () => {
    expect(() => {
      getWeek(7);
    }).toThrow();
  });

  test('Throws an exception if the parameter is less than 0', () => {
    expect(() => {
      getWeek(-1);
    }).toThrow();
  });

  test('Throws an exception if the parameter is a float number', () => {
    expect(() => {
      getWeek(1.5);
    }).toThrow();
  });
});