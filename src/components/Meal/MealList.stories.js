import React from 'react';
import { action } from '@storybook/addon-actions';
import MealList from './MealList';

export default {
  title: 'Meal List',
  component: MealList,
  excludeStories: /.*Data$/
};

export const actionsData = {
  onEditMeal: action('onEditMeal'),
  onCancelMeal: action('onCancelMeal'),
  onDeleteMeal: action('onDeleteMeal')
};

export const mealData = [
  { id: 1, description: 'Breakfast', calories: 400 },
  { id: 2, description: 'Lunch', calories: 1400 },
  { id: 3, description: 'Dinner', calories: 2030 },
];

export const Empty = () => <MealList {...actionsData} meals={[]} />;

export const Entries = () => <MealList {...actionsData} meals={mealData} />;
