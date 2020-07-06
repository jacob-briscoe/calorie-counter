import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const MealEntry = ({ meal, onSaveMeal, onCancelMeal }) => {
  const id = meal.id;
  const [description, setDescription] = useState(meal.description);
  const [calories, setCalories] = useState(meal.calories);

  const currentMeal = useCallback(() => ({ id, description, calories }), [id, description, calories]);

  return (
    <Grid
      container
      direction="column"
      spacing={3}>
      <Grid item xs={6}>
        <TextField id="description" value={description} onChange={e => setDescription(e.target.value)} label="Description" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={3}>
        <TextField id="calories" value={calories} onChange={e => setCalories(e.target.value)} label="Calories" variant="outlined" type="number" fullWidth />
      </Grid>
      <Grid item xs={6} align="right">
        <Button color="secondary" onClick={onCancelMeal} style={{ marginRight: '10px' }}>Cancel</Button>
        <Button color="primary" onClick={() => saveMealHandler(currentMeal(), onSaveMeal)}>Save</Button>
      </Grid>
    </Grid>
  );
};

const saveMealHandler = (meal, delegateTo) => {
  delegateTo({
    meal: {
      ...meal,
      calories: parseInt(meal.calories)
    },
  });
};

MealEntry.defaultProps = {
  meal: {
    id: null,
    description: '',
    calories: ''
  }
};

MealEntry.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    calories: PropTypes.string
  }),
  onSaveMeal: PropTypes.func.isRequired,
  onCancelMeal: PropTypes.func.isRequired
};

export default MealEntry;