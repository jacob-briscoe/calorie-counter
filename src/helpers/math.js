import * as R from 'ramda';

const DEFAULT_MAX_RANDOM_NUM = 500;

export const randomInt = (max = DEFAULT_MAX_RANDOM_NUM) =>
  R.pipe(
    Math.floor,
    R.multiply(R.call(Math.random)),
    Math.floor
  )(max);
