import React, { useState, useEffect, Fragment } from 'react';

const Meal = ({ addMeal, cancelEditMeal, updateMeal, prefillMeal }) => {
  const [isEditingMeal, setEditingMeal] = useState(false);
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');

  useEffect(() => {
    if (prefillMeal.id) {
      setEditingMeal(true);
    } else {
      setEditingMeal(false);
    }

    setDescription(prefillMeal.description);
    setCalories(prefillMeal.calories);
  }, [prefillMeal]);

  const mealFormHandler = (event) => {
    event.preventDefault();

    if (isEditingMeal) {
      updateMeal({ ...prefillMeal, description, calories });
    } else {
      addMeal({ id: Math.random(), description, calories });
    }
  };

  return (
    <div>
      <h5>Add Meal</h5>
      <form onSubmit={mealFormHandler}>
        Description: <input type="text" name="description" onChange={(event) => setDescription(event.target.value)} value={description} />
        Calories: <input type="text" name="calories" onChange={(event) => setCalories(event.target.value)} value={calories} />
        <MealControl isEditingMeal={isEditingMeal} cancelEditMeal={cancelEditMeal} />
      </form>
    </div>
  );
};

const MealControl = ({ isEditingMeal, cancelEditMeal }) => {
  let controlText = isEditingMeal ? 'Update' : 'Add';
  return (
    <Fragment>
      <button type="submit">{controlText}</button>
      {isEditingMeal && (
        <button type="button" onClick={cancelEditMeal}>Cancel</button>
      )}
    </Fragment>
  );
};

export default Meal;