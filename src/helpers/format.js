import * as R from 'ramda';

export const localizedNumber = (num) => num.toLocaleString();

export const stringToInt = (stringNum) => R.pipe(
  parseInt,
  R.defaultTo(0)
)(stringNum);
