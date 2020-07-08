import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { numberToLocalizedString } from '../../helpers/format';

const MealList = ({ meals, onEditMeal, onDeleteMeal }) => (
  R.ifElse(R.isEmpty,
    R.always(ZeroMeals()),
    R.partial(ShowMealItems, [onEditMeal, onDeleteMeal]))
    (meals)
);

MealList.propTypes = {
  meals: PropTypes.array,
  onEditMeal: PropTypes.func.isRequired,
  onDeleteMeal: PropTypes.func.isRequired
};

MealList.defaultProps = {
  meals: []
};

const ZeroMeals = () => (
  <h3>No meals yet, add one!</h3>
);

const ShowMealItems = (onEditMeal, onDeleteMeal, meals) => (
  <div className="table-responsive">
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Meal</th>
          <th scope="col">Calories</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {toMealItems(onEditMeal, onDeleteMeal)(meals)}
        <tr>
          <th scope="col">Total:</th>
          <td>{totalCalories(meals)}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
);

const MealItem = (onEditMeal, onDeleteMeal, meal) => (
  <tr key={meal.id}>
    <td>{meal.description}</td>
    <td>{numberToLocalizedString(meal.calories)}</td>
    <td><button onClick={() => onEditMeal(meal.id)} className="btn btn-link">Edit</button> <button onClick={() => onDeleteMeal(meal.id)} className="btn btn-link">Delete</button></td>
  </tr>
);

const totalCalories = R.pipe(
  R.map(R.prop('calories')),
  R.sum,
  numberToLocalizedString
);

const toMealItems = (onEditMeal, onDeleteMeal) => R.map(R.partial(MealItem, [onEditMeal, onDeleteMeal]));

export default MealList;