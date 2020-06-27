import React, { useState, useCallback } from 'react';
import { filter, find, findIndex, append, update, curry, complement } from 'ramda';
import Meals from '../components/Meals';
import Meal from '../components/Meal';

const CalorieCounter = (props) => {
  const [meals, setMeals] = useState([]);
  const [prefillMeal, setPrefillMeal] = useState({ ...MEAL });

  const addMealHandler = useCallback((meal) => setMeals(addMeal(meal)), []);

  const removeMealHandler = useCallback((id) => setMeals(removeMeal(id)), []);

  const editMealHandler = useCallback((id) => setPrefillMeal(getMeal(id, meals)), [meals]);

  const updateMealHandler = useCallback((meal) => setMeals(updateMeal(meal)), []);

  const cancelEditMealHandler = useCallback(() => setPrefillMeal({ ...MEAL }), []);

  return (
    <div>
      <div>Calorie Counter</div>
      <Meal 
        addMeal={addMealHandler} 
        prefillMeal={prefillMeal} 
        cancelEditMeal={cancelEditMealHandler} 
        updateMeal={updateMealHandler} />
      <Meals 
        meals={meals} 
        removeMeal={removeMealHandler} 
        editMeal={editMealHandler} />
    </div>
  );
};

export const isSameMeal = curry((id, meal) => meal.id === id);

export const notSameMeal = complement(isSameMeal);

export const findMeal = (id, meals) => findIndex(isSameMeal(id), meals);

export const getMeal = curry((id, meals) => find(isSameMeal(id), meals));

export const addMeal = curry((meal, meals) => append(meal, meals));

export const removeMeal = curry((id, meals) => filter(notSameMeal(id), meals));

export const updateMeal = curry((meal, meals) => update(findMeal(meal.id, meals), meal)(meals));

const MEAL = { description: '', calories: '' };

export default CalorieCounter;