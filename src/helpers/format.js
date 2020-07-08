import * as R from 'ramda';

export const DEFAULT_LOCALE = 'en-US';

const DEFAULT_TO_ZERO = R.defaultTo(0);

export const numberToLocalizedString = R.pipe(
  DEFAULT_TO_ZERO,
  R.call(R.always(new Intl.NumberFormat(DEFAULT_LOCALE).format))
);

export const stringToInt = R.pipe(
  parseInt,
  DEFAULT_TO_ZERO
);
