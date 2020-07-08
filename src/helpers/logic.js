import * as R from 'ramda';

export const equal = R.curry((val, other) => R.equals(val, other));

export const notEqual = R.complement(equal);

export const stringIsBlank = R.pipe(
  R.defaultTo(''),
  R.trim,
  R.length,
  R.gt(1)
);

export const stringIsNotBlank = R.complement(stringIsBlank);
