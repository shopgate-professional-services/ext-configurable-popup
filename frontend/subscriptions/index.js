import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import event from '@shopgate/pwa-core/classes/Event';
import { increaseAppStartCount } from '../action-creators/appStart';
import { increaseOrdersPlacedCount } from '../action-creators/ordersPlaced';
import {
  resetTimerStartTime,
  setTimerStartTime,
} from '../action-creators/timer';
import {
  TRIGGER_APP_STARTS,
  TRIGGER_TIME_INTERVAL,
  TRIGGER_ORDERS_PLACED,
} from '../constants';
import { showModal } from '../actions/showModal';
import {
  isMaxOccurrenceCountReached,
  isMaxRejectionCountReached,
  isMinDaysBetweenPopupsElapsed,
  shouldShowModal,
} from '../selectors/popup';
import { getPopupsOfTriggerType } from '../helpers';

/**
 * Checks the conditions and shows the popup
 * @param {Array<string>} types an array of types
 * @returns {Function}
 */
function checkConditionsAndShowModal(types) {
  return async (dispatch, getState) => {
    const popups = getPopupsOfTriggerType(types);

    // loop over the popups
    popups.forEach((popup) => {
      if (!popup.enabled) return;
      const state = getState();

      if (isMaxRejectionCountReached(state, { popup })) return;
      if (isMaxOccurrenceCountReached(state, { popup })) return;
      if (!isMinDaysBetweenPopupsElapsed(state)) return;
      if (!shouldShowModal(state, { popup })) return;

      // if all conditions are met, then show the popup
      dispatch(showModal(popup));

      if (popup.trigger.type === TRIGGER_TIME_INTERVAL) {
        dispatch(resetTimerStartTime());
      }
    });
  };
}

/**
 * Popup subscriptions
 * @param {Function} subscribe The subscribe function
 */
export default function popupSubscriptions(subscribe) {
  // event subscriber to handle app start popups
  // and also time interval ratings
  subscribe(appDidStart$, async ({ dispatch }) => {
    // every time the app starts
    // we increase the start count
    dispatch(increaseAppStartCount());

    // set the first start time
    dispatch(setTimerStartTime());

    // Checks the conditions and shows the popup
    dispatch(checkConditionsAndShowModal([TRIGGER_APP_STARTS, TRIGGER_TIME_INTERVAL]));
  });

  // event subscriber to handle order placed ratings
  subscribe(appDidStart$, ({ dispatch }) => {
    event.addCallback('checkoutSuccess', () => {
      // increase the orders placed count
      dispatch(increaseOrdersPlacedCount());

      // Checks the conditions and shows the popup
      dispatch(checkConditionsAndShowModal([TRIGGER_ORDERS_PLACED]));
    });
  });
}
