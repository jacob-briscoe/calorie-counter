import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { ifElse, equals, __, always, compose, curry, isNil, T, F } from 'ramda';

const Meal = ({ addMeal, cancelEditMeal, updateMeal, prefillMeal }) => {
  const [isEditingMeal, setEditingMeal] = useState(false);
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');

  const setMealEditingStatus = useCallback(compose(setEditingMeal, isNotEditingMeal), []);

  useEffect(() => {
    setMealEditingStatus(prefillMeal.id);
    setDescription(prefillMeal.description);
    setCalories(prefillMeal.calories);
  }, [setMealEditingStatus, prefillMeal]);

  const updateOrAddMeal = useCallback(
    curry(
      (isUpdating, meal) =>
        ifElse(equals(__, true), () => updateMeal(meal), () => addMeal(meal))
          (isUpdating)
    )
    , []);

  const reset = useCallback(() => {
    setEditingMeal(false);
    setDescription('');
    setCalories('');
  }, [setDescription, setCalories]);

  const mealFormHandler = useCallback((event) => {
    event.preventDefault();

    let meal = {
      id: Math.random(),
      ...prefillMeal,
      description,
      calories
    };

    updateOrAddMeal(isEditingMeal, meal);

    reset();
  }, [isEditingMeal, prefillMeal, description, calories, updateOrAddMeal, reset]);

  return (
    <div>
      <h1>Meal</h1>
      <form onSubmit={mealFormHandler}>

        {/* <Input
          type="text"
          id="description"
          label='Description'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
          helperText='Describe the meal.' />

        <Input
          type="number"
          id="calories"
          label='Calories'
          value={calories}
          onChange={(event) => setCalories(event.target.value)}
          required /> */}

        <MealControl isEditingMeal={isEditingMeal} cancelEditMeal={cancelEditMeal} />
      </form>
    </div>
  );
};

const MealControl = ({ isEditingMeal, cancelEditMeal }) => {
  // const controlText = mealControlText(isEditingMeal);

  return (
    <Fragment>
      <button type="submit">
        <span>+</span>
      </button>
      {isEditingMeal && (
        <button type="button" onClick={cancelEditMeal}>Cancel</button>
      )}
    </Fragment>
  );
};

export const isNotEditingMeal = ifElse(isNil, F, T);
export const mealControlText = ifElse(equals(__, false), always('+'), always('Update'));

export default Meal;