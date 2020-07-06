import React from 'react';
import { map, isEmpty, ifElse } from 'ramda';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Meal from './Meal';

const MealList = ({ meals }) => {
  const listItems = ifElse(isEmpty, NoMealsListItem, ShowMealItems);

  return (
    <List>
      {listItems(meals)}
    </List>);
};

const MealListItem = meal => (
  <ListItem key={meal.id}>
    <Meal meal={meal} />
  </ListItem>
);

const NoMealsListItem = () => (
  <ListItem>
    <ListItemText primary="No meals yet, add one." />
  </ListItem>
);

const ShowMealItems = map(MealListItem);

export default MealList;