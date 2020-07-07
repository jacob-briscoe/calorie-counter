import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { localizedNumber } from '../../helpers/format';

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
  <table>
    <thead>
      <tr>
        <th>Meal</th>
        <th>Calories</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {toMealItems(onEditMeal, onDeleteMeal)(meals)}
    </tbody>
    <tfoot>
      <tr>
        <td>Total:</td>
        <td>{totalCalories(meals)}</td>
      </tr>
    </tfoot>
  </table>
);

const MealItem = (onEditMeal, onDeleteMeal, meal) => (
  <tr key={meal.id}>
    <td>{meal.description}</td>
    <td>{localizedNumber(meal.calories)}</td>
    <td><button onClick={() => onEditMeal(meal.id)}>Edit</button> | <button onClick={() => onDeleteMeal(meal.id)}>Delete</button></td>
  </tr>
);

const totalCalories = R.pipe(
  R.map(R.prop('calories')),
  R.sum,
  localizedNumber
);

const toMealItems = (onEditMeal, onDeleteMeal) => R.map(R.partial(MealItem, [onEditMeal, onDeleteMeal]));

export default MealList;