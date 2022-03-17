import {
  INCREASE_ORDERS_PLACED_COUNT_POPUP,
} from '../constants';

/**
 * Increment the orders placed count
 * @return {Object} The dispatched action object.
 */
export const increaseOrdersPlacedCount = () => ({
  type: INCREASE_ORDERS_PLACED_COUNT_POPUP,
});
