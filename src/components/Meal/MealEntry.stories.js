import React from 'react';
import { action } from '@storybook/addon-actions';
import MealEntry from './MealEntry';

export default {
  title: 'Meal Entry',
  component: MealEntry,
  excludeStories: /.*Data$/
};

export const actionsData = {
  onSaveMeal: action('onSaveMeal'),
  onCancelMealEntry: action('onCancelMealEntry')  
};

export const mealData = {
  id: 1,
  description: 'Breakfast',
  calories: '1000'
};

export const Initial = () => <MealEntry {...actionsData} />

export const Edit = () => <MealEntry {...actionsData} meal={mealData} />
