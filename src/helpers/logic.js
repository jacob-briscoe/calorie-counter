import * as R from 'ramda';

export const notEqual = R.curry((val, other) => R.not(R.equals(val, other)));

export const stringIsBlank = R.pipe(
  R.defaultTo(''),
  R.trim,
  R.length,
  R.gt(1)
);

export const stringIsNotBlank = R.complement(stringIsBlank);
