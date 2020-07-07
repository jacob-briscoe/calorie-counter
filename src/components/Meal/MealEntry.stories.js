import React from 'react';
import { action } from '@storybook/addon-actions';
import MealEntry from './MealEntry';

export default {
  title: 'Meal Entry',
  component: MealEntry,
  excludeStories: /.*Data$/
};

export const actionsData = {
  onSaveMeal: action('onSaveMeal')
  // onCancelMeal: action('onCancelMeal')
};

export const mealData = {
  id: 1,
  description: 'Breakfast',
  calories: '1000'
};



export const NoAction = () => <MealEntry />

export const Add = () => <MealEntry {...actionsData} mealEntryView />;

export const Editing = () => <MealEntry mealEntryView {...actionsData} meal={{...mealData}} />;
