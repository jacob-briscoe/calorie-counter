import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { numberToLocale } from '../../helper/format';

const Meal = ({ meal }) => (
  <Card>
    <CardContent>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h2">{meal.description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">{numberToLocale(meal.calories)}</Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

Meal.propTypes = {
  meal: PropTypes.shape({
    description: PropTypes.string,
    calories: PropTypes.number
  }).isRequired
};

export default Meal;