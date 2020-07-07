import * as R from 'ramda';

export const randomInt = (max) =>
  R.pipe(
    Math.floor,
    R.multiply(Math.random()),
    Math.floor
  )(max);

