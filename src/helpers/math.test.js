import { randomInt } from './math';

describe('math functions', () => {

  describe('randomInt', () => {

    it('can handle various inputs', () => {
      expect(randomInt(null)).toBeGreaterThanOrEqual(0);
      expect(randomInt(undefined)).toBeGreaterThanOrEqual(0);
      expect(randomInt(3)).toBeLessThanOrEqual(3);
    });

  });

});