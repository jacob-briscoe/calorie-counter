import React from 'react';
import MealSummary from './MealSummary';
import { mealListData } from './MealList.stories';

export default {
  title: 'Meal Summary',
  component: MealSummary,
  excludeStories: /.*Data$/
};


export const NoMeals = () => <MealSummary meals={[]} />;

export const WithMeals = () => <MealSummary meals={mealListData} />;

