import React from 'react';
import MealList from './MealList';

export default {
  title: 'Meal List',
  component: MealList,
  excludeStories: /.*Data$/
};

export const mealListData = [
  {
    id: 1,
    description: 'Breakfast',
    calories: 1000
  },
  {
    id: 2,
    description: 'Lunch',
    calories: 2000
  },
  {
    id: 3,
    description: 'Dinner',
    calories: 3000
  },
];

export const None = () => <MealList meals={[]} />;

export const Multiple = () => <MealList meals={mealListData} />;

