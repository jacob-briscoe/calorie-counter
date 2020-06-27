import { totalCalories } from './Meals';

describe('totalCalories', () => {

  it('is 0 when there are 0 meals', () => {
    const meals = [];
    expect(totalCalories(meals)).toEqual(0);
  });

  it('are all added together', () => {
    const meals = [
      { calories: 1 },
      { calories: 2 },
      { calories: 3 },
    ];
    expect(totalCalories(meals)).toEqual(6);
  });

});