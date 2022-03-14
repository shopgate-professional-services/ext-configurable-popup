import {
  INCREASE_OCCURRENCE_COUNT,
  INCREASE_REJECTION_COUNT,
  SET_LAST_POPUP_TIMESTAMP,
} from '../constants';

/**
 * Sets the last popup timestamp
 * @return {Object} The dispatched action object.
 */
export const setLastPopupTimestamp = () => ({
  type: SET_LAST_POPUP_TIMESTAMP,
});

/**
 * Sets the last popup timestamp
 * @param {string} id the id of the popup
 * @return {Object} The dispatched action object.
 */
export const increaseRejectionCount = id => ({
  type: INCREASE_REJECTION_COUNT,
  id,
});

/**
 * Sets the popup occurrence count
 * @param {string} id the id of the popup
 * @return {Object} The dispatched action object.
 */
export const increaseOccurranceCount = id => ({
  type: INCREASE_OCCURRENCE_COUNT,
  id,
});

