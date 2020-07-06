import React from 'react';
import { map, prop, compose } from 'ramda';
import { sumOf } from '../../helper/math';
import Typography from '@material-ui/core/Typography';

const MealSummary = ({ meals }) => (
  <Typography variant="h5">{sumOfMealCalories(meals)}</Typography>
);

const mealCalories = map(prop('calories'));

const sumOfMealCalories = compose(
  sumOf,
  mealCalories
);

export default MealSummary;