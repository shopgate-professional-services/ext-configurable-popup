import {
  SET_TIMER_START_TIME,
  RESET_TIMER_START_TIME,
} from '../constants';

/**
 * Reset the orders placed count, and increment reset counts
 * @return {Object} The dispatched action object.
 */
export const resetTimerStartTime = () => ({
  type: RESET_TIMER_START_TIME,
});

/**
 * Sets the timer start time
 * @return {Object} The dispatched action object.
 */
export const setTimerStartTime = () => ({
  type: SET_TIMER_START_TIME,
});

