import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { notEqual } from '../../helpers/logic';

const MealEntry = ({ onSaveMeal, onCancelMealEntry, meal }) => {
  const [displayFormEntry, setDisplayFormEntry] = useState(false);

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
  <button onClick={onAddMeal} className="btn btn-primary">Add Meal</button>
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
    <div className="container">
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" id="description" aria-describedby="descriptionHelp" value={description} onChange={e => setDescription(e.target.value)} />
          <small id="descriptionHelp" className="form-text text-muted">Describe the meal, snack, or whatever it may be.</small>
        </div>
        <div className="form-group">
          <label htmlFor="calories">Calories</label>
          <input type="number" className="form-control" id="calories" value={calories || ''} onChange={e => setCalories(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary mr-3">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onCancelMeal}>Cancel</button>
      </form>
    </div>
  );
};

export const DEFAULT_MEAL = {
  id: null,
  description: '',
  calories: 0
};

export const MEAL_SHAPE = PropTypes.shape({
  id: PropTypes.number,
  description: PropTypes.string,
  calories: PropTypes.number
});

MealEntry.propTypes = {
  meal: MEAL_SHAPE
};

MealEntry.defaultProps = {
  meal: { ...DEFAULT_MEAL }
};

export default MealEntry;