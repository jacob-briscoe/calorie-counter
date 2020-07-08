import { equal, notEqual, stringIsBlank, stringIsNotBlank } from './logic';

describe('logic functions', () => {

  describe('equal', () => {

    it('can handle various inputs', () => {
      expect(equal(null, null)).toBeTruthy();
      expect(equal(undefined, undefined)).toBeTruthy();
      expect(equal(null, undefined)).toBeFalsy();
      expect(equal('', '')).toBeTruthy();
      expect(equal(1, 1)).toBeTruthy();
      expect(equal(1.10001, 1.10001)).toBeTruthy();
      expect(equal(true, true)).toBeTruthy();
      expect(equal(true, false)).toBeFalsy();
      expect(equal(false, false)).toBeTruthy();
      expect(equal({ a: '1' }, { a: '1' })).toBeTruthy();
      expect(equal({ a: '1' }, { a: '' })).toBeFalsy();
      expect(equal({ a: '1' }, { b: '' })).toBeFalsy();
      expect(equal({ a: '1' }, { a: true })).toBeFalsy();
      expect(equal({ a: '1', x: 'abc' }, { a: '1' })).toBeFalsy();
    });

  });

  describe('notEqual', () => {

    it('can handle various inputs', () => {
      expect(notEqual(1, 2)).toBeTruthy();
      expect(notEqual(null, null)).toBeFalsy();
      expect(notEqual(undefined, { a: '1' })).toBeTruthy();
    });

  });

  describe('stringIsBlank', () => {

    it('can handle various inputs', () => {
      expect(stringIsBlank(null)).toBeTruthy();
      expect(stringIsBlank(undefined)).toBeTruthy();
      expect(stringIsBlank('')).toBeTruthy();
      expect(stringIsBlank('    ')).toBeTruthy();
      expect(stringIsBlank('  a  ')).toBeFalsy();
      expect(stringIsBlank('abc')).toBeFalsy();
    });

  });

  describe('stringIsNotBlank', () => {

    it('can handle various inputs', () => {
      expect(stringIsNotBlank(null)).toBeFalsy();
      expect(stringIsNotBlank(undefined)).toBeFalsy();
      expect(stringIsNotBlank('')).toBeFalsy();
      expect(stringIsNotBlank('  ')).toBeFalsy();
      expect(stringIsNotBlank(' a ')).toBeTruthy();
    });

  });

});
