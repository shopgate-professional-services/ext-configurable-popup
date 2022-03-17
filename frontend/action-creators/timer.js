import {
  SET_TIMER_START_TIME_POPUP,
  RESET_TIMER_START_TIME_POPUP,
} from '../constants';

/**
 * Sets the timer start time
 * @return {Object} The dispatched action object.
 */
export const setTimerStartTime = () => ({
  type: SET_TIMER_START_TIME_POPUP,
});

/**
 * Resets the timer start time
 * @return {Object} The dispatched action object.
 */
export const resetTimerStartTime = () => ({
  type: RESET_TIMER_START_TIME_POPUP,
});
