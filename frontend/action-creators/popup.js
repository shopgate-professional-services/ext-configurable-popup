import {
  INCREASE_OCCURRENCE_COUNT_POPUP,
  INCREASE_REJECTION_COUNT_POPUP,
  SET_LAST_POPUP_TIMESTAMP_POPUP,
} from '../constants';

/**
 * Sets the last popup timestamp
 * @return {Object} The dispatched action object.
 */
export const setLastPopupTimestamp = () => ({
  type: SET_LAST_POPUP_TIMESTAMP_POPUP,
});

/**
 * Increments the popup rejection count
 * @param {string} id the id of the popup
 * @return {Object} The dispatched action object.
 */
export const increaseRejectionCount = id => ({
  type: INCREASE_REJECTION_COUNT_POPUP,
  id,
});

/**
 * Increments the popup occurrence count
 * @param {string} id the id of the popup
 * @return {Object} The dispatched action object.
 */
export const increaseOccurranceCount = id => ({
  type: INCREASE_OCCURRENCE_COUNT_POPUP,
  id,
});

