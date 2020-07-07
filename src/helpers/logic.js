import * as R from 'ramda';

export const notEqual = R.curry((val, other) => R.not(R.equals(val, other)));
