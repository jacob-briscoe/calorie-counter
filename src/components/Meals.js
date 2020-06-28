import React from 'react';
import { isEmpty, reduce, add, map, prop } from 'ramda';

const Meals = ({ meals, editMeal, removeMeal }) => {

  if (isEmpty(meals)) {
    return <ZeroMeals />
  }

  return (
    <table className='collapse f6 w-50 mw8 center'>
      <thead className='ttu'>
        <tr className='striped--near-white'>
          <th className='fw6 tl pa3 bg-white'>Meal</th>
          <th className='fw6 tl pa3 bg-white' scope="col">Calories</th>
        </tr>
      </thead>
      <tbody>
        {map(meal => (<Meal key={meal.id} meal={meal} editMeal={editMeal} removeMeal={removeMeal} />), meals)}
      </tbody>
      <tfoot className='bt'>
        <tr>
          <th className='pa3 tl' scope="row">Total:</th>
          <td className='pa3 tl' colSpan="2">{totalCalories(meals)}</td>
        </tr>
      </tfoot>
    </table>
  );
};

const Meal = ({ meal, editMeal, removeMeal }) => {
  return (
    <tr className='striped--near-white'>
      <th className='pa3 tl w-40' scope="row">{meal.description}</th>
      <td className='pa3 tl'>{meal.calories}</td>
      <td className='pa3 tr'>
        <button onClick={() => editMeal(meal.id)} className='bn bg-transparent'>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z" /></svg>
        </button>
        <button onClick={() => removeMeal(meal.id)} className='bn bg-transparent'>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
        </button>
      </td>
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