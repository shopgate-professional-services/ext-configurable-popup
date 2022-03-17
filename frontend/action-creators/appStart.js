import {
  INCREASE_APP_START_COUNT_POPUP,
} from '../constants';

/**
 * Increments the app start count
 * @return {Object} The dispatched action object.
 */
export const increaseAppStartCount = () => ({
  type: INCREASE_APP_START_COUNT_POPUP,
});
