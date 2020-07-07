import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import MealEntry, { DEFAULT_MEAL } from '../components/Meal/MealEntry';
import MealList from '../components/Meal/MealList';
import { randomInt } from '../helpers/math';

const CalorieCounter = ({ initialMeals }) => {
  const [meals, setMeals] = useState([...initialMeals]);
  const [editMeal, setEditMeal] = useState({ ...DEFAULT_MEAL });

  const saveMealHandler = useCallback((meal) => {
    R.pipe(
      addOrUpdate(meal),
      setMeals
    )(meals);
    setEditMeal({ ...DEFAULT_MEAL });
  }, [meals]);

  const editMealHandler = useCallback((id) => {
    R.pipe(
      R.find(R.propEq('id', id)),
      setEditMeal
    )(meals);
  }, [meals]);

  const deleteMealHandler = useCallback((id) => {
    R.pipe(
      R.remove(findMeal({ id }), 1),
      setMeals
    )(meals);
  }, [meals]);

  const cancelMealEntryHandler = useCallback(() => {
    setEditMeal({ ...DEFAULT_MEAL });
  }, []);

  return (
    <div>
      <h3>Calorie Counter</h3>
      <hr />
      <MealEntry onSaveMeal={saveMealHandler} onCancelMealEntry={cancelMealEntryHandler} meal={editMeal} />
      <MealList meals={meals} onEditMeal={editMealHandler} onDeleteMeal={deleteMealHandler} />
    </div>
  );
};

CalorieCounter.defaultProps = {
  initialMeals: []
};

const addOrUpdate = R.curry((meal, ms) =>
  R.ifElse(R.isNil,
    () => addMeal(meal, ms),
    () => updateMeal(meal, ms))
    (meal.id));

const addMeal = (meal, meals) =>
  R.append({
    ...meal,
    id: randomInt(500)
  }, meals);

const updateMeal = (meal, meals) => {
  const mealIndex = findMeal(meal)(meals);
  const copyMeal = () => ({ ...meal });

  return R.adjust(mealIndex, copyMeal, meals);
};

const findMeal = (meal) => R.findIndex(R.propEq('id', meal.id));

export default CalorieCounter;