import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { ifElse, equals, __, always, compose, curry, isNil, T, F } from 'ramda';
import Input from './UI/Input';

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
      <h1 className="f3 lh-copy">Meal</h1>
      <form onSubmit={mealFormHandler}>

        <Input
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
          required />

        <MealControl isEditingMeal={isEditingMeal} cancelEditMeal={cancelEditMeal} />
      </form>
    </div>
  );
};

const MealControl = ({ isEditingMeal, cancelEditMeal }) => {
  const controlText = mealControlText(isEditingMeal);

  return (
    <Fragment>
      <button type="submit" className='dt w3 f6 bg-blue ba b--black-10 br-100 tc dtc h3 v-mid pa2'>
        <span className='white f3 tc'>+</span>
      </button>
      {isEditingMeal && (
        <button type="button" onClick={cancelEditMeal}>Cancel</button>
      )}
    </Fragment>
  );
};

// <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24" x="0"/></g><g><g><g><path d="M21,10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-0.1c-2.73,2.71-2.73,7.08,0,9.79s7.15,2.71,9.88,0 C18.32,15.65,19,14.08,19,12.1h2c0,1.98-0.88,4.55-2.64,6.29c-3.51,3.48-9.21,3.48-12.72,0c-3.5-3.47-3.53-9.11-0.02-12.58 s9.14-3.47,12.65,0L21,3V10.12z M12.5,8v4.25l3.5,2.08l-0.72,1.21L11,13V8H12.5z"/></g></g></g></svg>

export const isNotEditingMeal = ifElse(isNil, F, T);
export const mealControlText = ifElse(equals(__, false), always('+'), always('Update'));

export default Meal;