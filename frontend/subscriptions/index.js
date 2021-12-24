import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import event from '@shopgate/pwa-core/classes/Event';
import { increaseAppStartCount } from '../action-creators/appStart';
import { increaseOrdersPlacedCount } from '../action-creators/ordersPlaced';
import {
  setTimerStartTime,
} from '../action-creators/timer';
import {
  TRIGGER_APP_STARTS,
  TRIGGER_TIME_INTERVAL,
  TIMER_TIMESPAN,
  TRIGGER_ORDERS_PLACED,
} from '../constants';
import { getPopupState } from '../selectors/popup';
import { showModal } from '../actions/showModal';
import { getConfig } from '../helpers';

/**
 * Popup subscriptions
 * @param {Function} subscribe The subscribe function
 */
export default function popup(subscribe) {
  const {
    popup: {
      popups,
      rejectionMaxCount,
    },
  } = getConfig();

  // indicators to reset the counters
  const maxValues = {
    appStarts: 0,
    timer: 0,
    ordersPlaced: 0,
  };

  // we calculate the maximum values for each type
  // used for popups.
  popups.forEach((p) => {
    switch (p.trigger.type) {
      case TRIGGER_APP_STARTS:
        maxValues.appStarts = Math.max(maxValues.appStarts, p.trigger.value);
        break;

      case TRIGGER_ORDERS_PLACED:
        maxValues.ordersPlaced = Math.max(maxValues.ordersPlaced, p.trigger.value);
        break;

      case TRIGGER_TIME_INTERVAL:
        maxValues.timer = Math.max(maxValues.timer, p.trigger.value);
        break;

      default:
        break;
    }
  });

  // event subscriber to handle app start popups
  // and also time interval ratings
  subscribe(appDidStart$, async ({ dispatch, getState }) => {
    // every time the app starts
    // we increase the start count
    dispatch(increaseAppStartCount());

    const state = getPopupState(getState());

    // cancel the process if user has
    // already rejected rating the app
    // many times before
    if (state.rejectionCount >= rejectionMaxCount) {
      return;
    }

    // initiate the first start time
    if (state.timerStartTimestamp === null) {
      dispatch(setTimerStartTime());
    }

    /**
     * @var {any[]}
     */
    const filteredPopups = popups.filter(
      p => [TRIGGER_APP_STARTS, TRIGGER_TIME_INTERVAL].includes(p.trigger.type)
    );

    filteredPopups.forEach((filteredPopup) => {
      let mustShowModal;

      const { trigger } = filteredPopup;

      // TODO: check if the popup is eligible for appearance
      // if (state[popup.id].occurrenceCount >= trigger.occurrenceCount) {
      //   return
      // }

      const timeDiff = (Date.now() - state.timerStartTimestamp);

      if (
        trigger.type === TRIGGER_TIME_INTERVAL &&
        Number(trigger.value) > 0 &&
        Number(state.timerStartTimestamp) > 0 &&
        timeDiff >= (trigger.value * TIMER_TIMESPAN)
      ) {
        // TODO: this might have an issue, since the calculation
        // is thought to be of an integer, meaning that the result
        // might differ if the max value and time diff are different
        // for a few milliseconds, which would cause the modulo not to
        // return 0
        mustShowModal = Number(trigger.value) > 0 && (timeDiff
          % (trigger.value * TIMER_TIMESPAN) === 0);
      } else if (trigger.type === TRIGGER_APP_STARTS) {
        mustShowModal = Number(trigger.value) > 0 && (state.appStartCount % trigger.value === 0);
      } else {
        // to eventually prevent the popping up
        mustShowModal = false;
      }

      // the actual show modal logic
      dispatch(showModal(
        mustShowModal,
        filteredPopup
      ));
    });
  });

  // event subscriber to handle order placed ratings
  subscribe(appDidStart$, ({ dispatch, getState }) => {
    event.addCallback('checkoutSuccess', () => {
      const state = getPopupState(getState());

      // cancel the process if user has
      // already rejected rating the app
      // many times before
      if (state.rejectionCount >= rejectionMaxCount) {
        return;
      }

      /**
       * @var {any[]}
       */
      const filteredPopups = popups.filter(p =>
        [TRIGGER_ORDERS_PLACED].includes(p.trigger.type));

      dispatch(increaseOrdersPlacedCount());

      filteredPopups.forEach((filteredPopup) => {
        const { trigger } = filteredPopup;

        // TODO: check if the popup is eligible for appearance
        // if (state[popup.id].occurrenceCount >= trigger.occurrenceCount) {
        //   return
        // }

        // orders placed count starts from 0
        const mustShowModal = state.ordersPlacedCount % trigger.value === 0;

        dispatch(showModal(
          mustShowModal,
          filteredPopup
        ));
      });
    });
  });
}
