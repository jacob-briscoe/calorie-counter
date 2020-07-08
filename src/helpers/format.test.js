import { numberToLocalizedString, stringToInt } from './format';

describe('format functions', () => {

  describe('numberToLocalizedString', () => {

    it('can handle various inputs', () => {
      expect(numberToLocalizedString(null)).toEqual('0');
      expect(numberToLocalizedString(undefined)).toEqual('0');
      expect(numberToLocalizedString('')).toEqual('0');
      expect(numberToLocalizedString(3030)).toEqual('3,030');
      expect(numberToLocalizedString(30030)).toEqual('30,030');
    });

  });

  describe('stringToInt', () => {

    it('can handle various inputs', () => {
      expect(stringToInt(null)).toEqual(0);
      expect(stringToInt(undefined)).toEqual(0);
      expect(stringToInt('')).toEqual(0);
      expect(stringToInt('12343')).toEqual(12343);
      expect(stringToInt('12343.101')).toEqual(12343);
    });

  });

});
