import { createSelector } from 'reselect';
import {
  REDUX_NAMESPACE_POPUP,
  TIMER_TIMESPAN,
  TRIGGER_APP_STARTS,
  TRIGGER_ORDERS_PLACED,
  TRIGGER_TIME_INTERVAL,
} from '../constants';
import { popup as popupsConfig } from '../config';

/**
 * Selects the pop up information.
 * @param {Object} state The current state.
 * @returns {Object} The popup information.
 */
export const getPopupsState = state => state.extensions[REDUX_NAMESPACE_POPUP];

/**
 * Selects a popup by id
 */
export const getPopupById = createSelector(
  getPopupsState,
  (_, { popup }) => popup,
  (popupsState, popup) => popupsState.byPopupId[popup.id]
);

/**
 * Checks if the popup reached the max rejection count
 * @returns {Function}
 */
export const isMaxRejectionCountReached = createSelector(
  getPopupById,
  (_, { popup }) => popup,
  (popupState, popupConfig) => (popupState ?
    popupState.rejectionCount >= popupConfig.maxRejectionCount : false)
);

/**
 * Checks if the popup reached the max occurrence count
 * @param {Object} popup the popup
 * @returns {Function}
 */
export const isMaxOccurrenceCountReached = createSelector(
  getPopupById,
  (_, { popup }) => popup,
  (popupState, popupConfig) => (popupState ?
    popupState.occurrenceCount >= popupConfig.maxOccurrenceCount : false)
);

/**
 * Checks if there are enough days elapsed since the last occurrence
 * @returns {bool} true/false
 */
export const isMinDaysBetweenPopupsElapsed = createSelector(
  getPopupsState,
  popupsState => (Date.now() - popupsState.lastPopupAt)
    >= (popupsConfig.minDaysBetweenPopups * TIMER_TIMESPAN)
);

/**
 * Checks if the modal should show up
 * @param {Object} popup the popup
 * @returns {Function}
 */
export const shouldShowModal = createSelector(
  getPopupsState,
  (_, { popup }) => popup,
  (popupsState, popup) => {
    // --- Condition for TRIGGER_TIME_INTERVAL ---
    if (popup.trigger.type === TRIGGER_TIME_INTERVAL) {
      const timeDiff = (Date.now() - popupsState.timerStartTimestamp);
      return Number(popup.trigger.value) > 0 &&
        Number(popupsState.timerStartTimestamp) > 0 &&
        timeDiff >= (popup.trigger.value * TIMER_TIMESPAN);
    }
    // --- Condition for TRIGGER_APP_STARTS ---
    if (popup.trigger.type === TRIGGER_APP_STARTS) {
      return Number(popup.trigger.value) > 0 &&
        (popupsState.appStartCount % popup.trigger.value === 0);
    }
    // --- Condition for TRIGGER_ORDERS_PLACED ---
    if (popup.trigger.type === TRIGGER_ORDERS_PLACED) {
      return popupsState.ordersPlacedCount % popup.trigger.value === 0;
    }
    return false;
  }
);
