import {reduce, add} from 'ramda';

export const sumOf = reduce(add, 0);
