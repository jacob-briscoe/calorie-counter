import * as R from 'ramda';
import { randomInt } from '../../helpers/math';

const MEAL_DATA = {
  meals: []
};

const setMeals = (meals) => {
  MEAL_DATA.meals = meals;
  return [...MEAL_DATA.meals];
}

export const allMeals = () => [...MEAL_DATA.meals];

export const save = R.curry((meal) => R.ifElse(R.isNil,
  () => addMeal(meal)(MEAL_DATA.meals),
  () => updateMeal(meal)(MEAL_DATA.meals)
)(meal.id));

export const removeMeal = R.curry((id) =>
  R.pipe(
    R.remove(findMealIndex(id), 1),
    setMeals
  )(MEAL_DATA.meals));

const addMeal = (meal) =>
  R.pipe(
    R.prepend({
      ...meal,
      id: randomInt()
    }),
    setMeals
  );

const updateMeal = (meal) =>
  R.pipe(
    R.adjust(
      findMealIndex(meal.id),
      R.always({ ...meal })
    ),
    setMeals
  );

const byMealId = R.propEq('id');

const findMealIndex = (id) => R.findIndex(byMealId(id), MEAL_DATA.meals);

export const findMeal = R.curry((id) => R.find(byMealId(id))(MEAL_DATA.meals));



