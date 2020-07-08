import React, { useState, useCallback, useEffect } from 'react';
import * as R from 'ramda';
import MealEntry, { DEFAULT_MEAL, MEAL_SHAPE } from '../components/Meal/MealEntry';
import MealList from '../components/Meal/MealList';
import * as MealsRepository from '../repositories/meals/mealsRepository';

const CalorieCounter = ({ initialEditMeal }) => {
  const [meals, setMeals] = useState();

  useEffect(
    R.pipe(
      MealsRepository.allMeals,
      setMeals
    ), []);

  const [editMeal, setEditMeal] = useState({ ...initialEditMeal });

  const resetEditMealToDefault = useCallback(() => setEditMeal({ ...DEFAULT_MEAL }), []);

  const saveMealHandler = useCallback(
    R.pipe(
      MealsRepository.save,
      setMeals,
      resetEditMealToDefault
    ), [resetEditMealToDefault]);

  const editMealHandler = useCallback(
    R.pipe(
      MealsRepository.findMeal,
      setEditMeal
    ), []);

  const deleteMealHandler = useCallback(
    R.pipe(
      MealsRepository.removeMeal,
      setMeals
    ), []);

  return (
    <div className="container">
      <div className="row justify-content-center border-bottom">
        <div className="col-3">
          <span className="display-4">Meals</span><small className="font-weight-light ml-2">v{process.env.REACT_APP_VERSION}</small>
        </div>
      </div>
      <div className="row p-3">
        <div className="col-sm-4">
          <MealEntry onSaveMeal={saveMealHandler} onCancelMealEntry={() => resetEditMealToDefault()} meal={editMeal} />
        </div>
        <div className="col-sm-8">
          <MealList meals={meals} onEditMeal={editMealHandler} onDeleteMeal={deleteMealHandler} />
        </div>
      </div>
    </div>
  );
};

CalorieCounter.propTypes = {
  initialEditMeal: MEAL_SHAPE
};

CalorieCounter.defaultProps = {
  initialEditMeal: DEFAULT_MEAL
};

export default CalorieCounter;