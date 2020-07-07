import React, { useState, useCallback, useEffect } from 'react';
import * as R from 'ramda';
import { notEqual } from '../../helpers/logic';

const MealEntry = ({ onSaveMeal, onCancelMealEntry, meal, showForm }) => {
  const [displayFormEntry, setDisplayFormEntry] = useState(showForm);

  useEffect(() =>
    R.ifElse(notEqual(DEFAULT_MEAL),
      () => setDisplayFormEntry(true),
      () => setDisplayFormEntry(false))
      (meal)
    , [meal]);

  const toggleFormHandler = useCallback(() => setDisplayFormEntry(prev => R.not(prev)), []);

  const onSaveMealHandler = useCallback((e) => {
    toggleFormHandler();
    onSaveMeal(e);
  }, [toggleFormHandler, onSaveMeal]);

  return R.ifElse(
    R.equals(true),
    R.always(<FormEntry onSaveMeal={onSaveMealHandler} onCancelMeal={onCancelMealEntry} meal={meal} />),
    R.always(<NoAction onAddMeal={toggleFormHandler} />))(displayFormEntry);
};

const NoAction = ({ onAddMeal }) => (
  <button onClick={onAddMeal}>Add Meal</button>
);

const FormEntry = ({ onSaveMeal, onCancelMeal, meal }) => {
  const [description, setDescription] = useState(meal && meal.description);
  const [calories, setCalories] = useState(meal && meal.calories);

  const submitHandler = useCallback((event) => {
    event.preventDefault();

    const caloriesToInt = R.pipe(
      parseInt,
      R.defaultTo(0)
    )(calories);

    onSaveMeal({
      ...meal,
      description,
      calories: caloriesToInt
    });
  }, [meal, description, calories, onSaveMeal]);

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="description">Description:</label>
        <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
        <label htmlFor="calories">Calories:</label>
        <input type="number" id="calories" value={calories || ''} onChange={e => setCalories(e.target.value)} />
      </div>
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancelMeal}>Cancel</button>
      </div>
    </form>);
};

export const DEFAULT_MEAL = {
  id: null,
  description: '',
  calories: 0
};

MealEntry.defaultProps = {
  meal: { ...DEFAULT_MEAL },
  showForm: false
};

export default MealEntry;