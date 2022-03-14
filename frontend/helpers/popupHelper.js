import {
  TIMER_TIMESPAN,
  TRIGGER_APP_STARTS,
  TRIGGER_ORDERS_PLACED,
  TRIGGER_TIME_INTERVAL,
} from '../constants';
import { getPopupState } from '../selectors/popup';
import getConfig from './getConfig';

/**
 * Popup helper functions
 */
class PopupHelper {
  // the popup config
  popupConfig = {};

  // the popup state
  popupState = {};

  // the current popup
  currentPopup = null;

  /**
   * contructor of the class
   * @param {Object} state the redux state of the application
   */
  constructor(state) {
    const { popup: popupConfig } = getConfig();
    this.popupConfig = popupConfig;
    this.popupState = getPopupState(state);
  }

  /**
   * Sets the current popup
   * @param {Object} popup the current popup
   */
  setCurrentPopup = (popup) => {
    this.currentPopup = popup;
  }

  /**
   * Gets all popups of specific trigger types
   * @param {Array} triggerTypes an array of trigger types
   * @returns {Array} filter
   */
  getPopupsOfTriggerType = triggerTypes => this.popupConfig.popups.filter(
    p => triggerTypes.includes(p.trigger.type)
  );

  /**
   * Checks if the popup is enabled
   * @param {Object} popup the popup to check
   * @returns {bool} true/false
   */
  isEnabled = () => this.currentPopup.enabled;

  /**
   * Checks if the current popup reached the max rejection count
   * @returns {bool} true/false
   */
  isMaxRejectionCountReached = () => {
    const { id } = this.currentPopup;
    return this.popupState.byPopupId[id] ?
      this.popupState.byPopupId[id].rejectionCount >= this.currentPopup.maxRejectionCount : false;
  }

  /**
   * Checks if the current popup reached the max occurrence count
   * @returns {bool} true/false
   */
  isMaxOccurrenceCountReached = () => {
    const { id } = this.currentPopup;
    return this.popupState.byPopupId[id] ?
      this.popupState.byPopupId[id].occurrenceCount >= this.currentPopup.maxOccurrenceCount : false;
  }

  /**
   * Checks if there are enough days elapsed since the last occurrence
   * @returns {bool} true/false
   */
  isMinDaysBetweenPopupsElapsed = () => (Date.now() - this.popupState.lastPopupAt)
    >= (this.popupConfig.minDaysBetweenPopups * TIMER_TIMESPAN);

  /**
   * Checks if the modal should show up
   * @returns {bool} true/false
   */
  shouldShowModal = () => {
    let shouldShow = false;
    // --- Condition for TRIGGER_TIME_INTERVAL ---
    if (this.currentPopup.trigger.type === TRIGGER_TIME_INTERVAL) {
      const timeDiff = (Date.now() - this.popupState.timerStartTimestamp);
      shouldShow = Number(this.currentPopup.trigger.value) > 0 &&
        Number(this.popupState.timerStartTimestamp) > 0 &&
        timeDiff >= (this.currentPopup.trigger.value * TIMER_TIMESPAN);
    }
    // --- Condition for TRIGGER_APP_STARTS ---
    if (this.currentPopup.trigger.type === TRIGGER_APP_STARTS) {
      shouldShow = Number(this.currentPopup.trigger.value) > 0 &&
        (this.popupState.appStartCount % this.currentPopup.trigger.value === 0);
    }
    // --- Condition for TRIGGER_ORDERS_PLACED ---
    if (this.currentPopup.trigger.type === TRIGGER_ORDERS_PLACED) {
      shouldShow = this.popupState.ordersPlacedCount % this.currentPopup.trigger.value === 0;
    }
    return shouldShow;
  }

  isPopupOfType = (type) => {
    return this.currentPopup.trigger.type === type;
  }
}

export default PopupHelper;
