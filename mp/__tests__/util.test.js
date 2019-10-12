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

  test('0 => 周日', () => {
    expect(getWeek(0)).toEqual('周日');
  });
  test('1 => 周一', () => {
    expect(getWeek(1)).toEqual('周一');
  });
  test('2 => 周二', () => {
    expect(getWeek(2)).toEqual('周二');
  });
  test('3 => 周三', () => {
    expect(getWeek(3)).toEqual('周三');
  });
  test('4 => 周四', () => {
    expect(getWeek(4)).toEqual('周四');
  });
  test('5 => 周五', () => {
    expect(getWeek(5)).toEqual('周五');
  });
  test('6 => 周六', () => {
    expect(getWeek(6)).toEqual('周六');
  });
});