import { SORT_ORDER } from 'constants/index';

export const toggleOrder = (currentOrder: string): string => {
  if (
    !SORT_ORDER.hasOwnProperty(currentOrder) ||
    currentOrder === SORT_ORDER.ASC
  )
    return SORT_ORDER.DESC;
  return SORT_ORDER.ASC;
};

export default toggleOrder;
