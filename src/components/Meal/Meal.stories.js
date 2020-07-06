import React from 'react';
import Meal from './Meal';

export default {
  title: 'Meal',
  component: Meal,
  excludeStories: /.*Data$/
};

export const mealData = {
  id: 1,
  description: 'Breakfast',
  calories: 1000
};

export const View = () => <Meal meal={{ ...mealData }} />