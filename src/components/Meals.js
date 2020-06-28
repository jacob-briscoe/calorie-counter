import React from 'react';
import { isEmpty, reduce, add, map, prop } from 'ramda';

const Meals = ({ meals, editMeal, removeMeal }) => {

  if (isEmpty(meals)) {
    return <ZeroMeals />
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Meal</th>
          <th scope="col">Calories</th>
        </tr>
      </thead>
      <tbody>
        {map(meal => (<Meal key={meal.id} meal={meal} editMeal={editMeal} removeMeal={removeMeal} />), meals)}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">Total:</th>
          <td colSpan="2">{totalCalories(meals)}</td>
        </tr>
      </tfoot>
    </table>
  );
};

const Meal = ({ meal, editMeal, removeMeal }) => {
  return (
    <tr>
      <th scope="row">{meal.description}</th>
      <td>{meal.calories}</td>
      <td><button onClick={() => removeMeal(meal.id)}>Delete</button> | <button onClick={() => editMeal(meal.id)}>Edit</button></td>
    </tr>
  );
};

const ZeroMeals = () => {
  return (
    <div>
      No meals, add one!
    </div>
  );
};

export const totalCalories = (meals) => reduce(add, 0, map(prop('calories'), meals));

export default Meals;