import { isSameMeal, notSameMeal, removeMeal, findMeal, addMeal, getMeal, updateMeal } from './CalorieCounter';
import { nth } from 'ramda';

const MEALS = [
  { id: 1, description: '1', calories: 200 },
  { id: 2, description: '3', calories: 400 },
  { id: 3, description: '2', calories: 600 },
];

const SAMPLE_MEAL = () => ({ id: Math.random(), description: '2nd breakfast', calories: 500 });

describe('isSameMeal', () => {

  it('works in both situations', () => {
    const isMeal1 = isSameMeal(1);
    const isMeal2 = isSameMeal(2);

    const meal = {
      id: 1
    };

    expect(isMeal1(meal)).toEqual(true);
    expect(isMeal2(meal)).toEqual(false);
  });

});

describe('notSameMeal', () => {

  it('works in both situations', () => {
    const isNotMeal1 = notSameMeal(1);
    const isNotMeal2 = notSameMeal(2);

    const meal = {
      id: 1
    };

    expect(isNotMeal1(meal)).toEqual(false);
    expect(isNotMeal2(meal)).toEqual(true);
  });

});

describe('findMeal', () => {

  it('can be found', () => {
    expect(findMeal(1, MEALS)).toEqual(0);
    expect(findMeal(3, MEALS)).toEqual(2);
  });

  it('cannot be found', () => {
    expect(findMeal(99, MEALS)).toEqual(-1);
    expect(findMeal(1234, MEALS)).toEqual(-1);
  });

});

describe('addMeal', () => {
  it('is added', () => {
    const existingMealsCount = MEALS.length;

    expect(addMeal(SAMPLE_MEAL(), MEALS).length).toEqual(existingMealsCount + 1);

    expect(MEALS.length).toEqual(existingMealsCount);
  });
});

describe('getMeal', () => {
  it('can find a meal', () => {
    expect(getMeal(1)(MEALS)).toEqual(nth(0, MEALS));
    expect(getMeal(2)(MEALS)).toEqual(nth(1, MEALS));
  });
});

describe('removeMeal', () => {

  it('was done', () => {
    const existingMealsCount = MEALS.length;

    expect(removeMeal(1, MEALS).length).toEqual(existingMealsCount - 1);
  });

  it('NOOP because not found', () => {
    const existingMealsCount = MEALS.length;

    expect(removeMeal(3333, MEALS).length).toEqual(existingMealsCount);
  });

});

describe('updateMeal', () => {

  it('was updated', () => {
    const mealToUpdate = {
      ...getMeal(1)(MEALS),
      calories: 201
    };

    const results = updateMeal(mealToUpdate, MEALS);
    expect(getMeal(1)(results).calories).toEqual(201);
  });

});