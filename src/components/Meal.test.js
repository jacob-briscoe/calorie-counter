import { mealControlText } from './Meal';

describe('mealControlText', () => {

  it('isEitherAddorUpdate', () => {
    let isUpdating = true;

    expect(mealControlText(isUpdating)).toEqual('Update');

    isUpdating = false;
    expect(mealControlText(isUpdating)).toEqual('Add');
  });

});
