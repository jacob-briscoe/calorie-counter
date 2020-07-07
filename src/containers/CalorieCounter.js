import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import MealEntry, { DEFAULT_MEAL } from '../components/Meal/MealEntry';
import MealList from '../components/Meal/MealList';
import { randomInt } from '../helpers/math';

const CalorieCounter = ({ initialMeals, initialEditMeal }) => {
  const [meals, setMeals] = useState([...initialMeals]);
  const [editMeal, setEditMeal] = useState({ ...initialEditMeal });

  const resetEditMeal = useCallback(() => setEditMeal({ ...DEFAULT_MEAL }), []);

  const saveMealHandler = useCallback((meal) => {
    R.pipe(
      addOrUpdate(meal),
      setMeals
    )(meals);

    resetEditMeal();

  }, [resetEditMeal, meals]);

  const editMealHandler = useCallback((id) => {
    R.pipe(
      findMeal(id),
      setEditMeal
    )(meals);
  }, [meals]);

  const deleteMealHandler = useCallback((id) => {
    R.pipe(
      R.remove(findMealIndex(id), 1),
      setMeals
    )(meals);
  }, [meals]);

  const cancelMealEntryHandler = useCallback(() => {
    resetEditMeal();
  }, [resetEditMeal]);

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
  initialMeals: [],
  initialEditMeal: DEFAULT_MEAL
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

const updateMeal = (meal, meals) =>
  R.adjust(
    findMealIndex(meal.id)(meals),
    R.always({ ...meal }),
    meals);

const byMealId = R.propEq('id');

const findMeal = (id) => R.find(byMealId(id));

const findMealIndex = (id) => R.findIndex(byMealId(id));

export default CalorieCounter;