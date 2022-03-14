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
import PopupHelper from '../helpers/popupHelper';

/**
 * Checks the conditions and shows the popup
 * @param {Array<string>} types an array of types
 * @param {Object} dispatch the dispatch object
 * @param {Function} getState the getState method
 */
function checkConditionsAndShowModal(types, dispatch, getState) {
  // initialize new popup helper
  const helper = new PopupHelper(getState());

  // get the correct popups
  const popups = helper.getPopupsOfTriggerType(types);

  // loop over the popups
  popups.forEach((popup) => {
    // set the popup as current popup in the helper class
    helper.setCurrentPopup(popup);

    // run some condition checks
    if (!helper.isEnabled()) return;
    if (helper.isMaxRejectionCountReached()) return;
    if (helper.isMaxOccurrenceCountReached()) return;
    if (!helper.isMinDaysBetweenPopupsElapsed()) return;
    if (!helper.shouldShowModal()) return;

    // if all conditions are met, then show the popup
    dispatch(showModal(popup));

    // popup type specific action
    if (helper.isPopupOfType(TRIGGER_TIME_INTERVAL)) {
      dispatch(resetTimerStartTime());
    }
  });
}

/**
 * Popup subscriptions
 * @param {Function} subscribe The subscribe function
 */
export default function popupSubscriptions(subscribe) {
  // event subscriber to handle app start popups
  // and also time interval ratings
  subscribe(appDidStart$, async ({ dispatch, getState }) => {
    // every time the app starts
    // we increase the start count
    dispatch(increaseAppStartCount());

    // set the first start time
    dispatch(setTimerStartTime());

    // Checks the conditions and shows the popup
    checkConditionsAndShowModal([TRIGGER_APP_STARTS, TRIGGER_TIME_INTERVAL], dispatch, getState);
  });

  // event subscriber to handle order placed ratings
  subscribe(appDidStart$, ({ dispatch, getState }) => {
    event.addCallback('checkoutSuccess', () => {
      // increase the orders placed count
      dispatch(increaseOrdersPlacedCount());

      // Checks the conditions and shows the popup
      checkConditionsAndShowModal([TRIGGER_ORDERS_PLACED], dispatch, getState);
    });
  });
}
