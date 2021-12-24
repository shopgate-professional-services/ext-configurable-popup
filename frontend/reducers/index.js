import { persistedReducers } from '@shopgate/engage/core';
import {
  INCREASE_APP_START_COUNT,
  INCREASE_ORDERS_PLACED_COUNT,
  INCREASE_TIMER_REPEATS,
  SET_TIMER_START_TIME,
  SET_LAST_POPUP_TIMESTAMP,
  INCREASE_REJECTION_COUNT,
} from '../constants';

export const REDUX_NAMESPACE_POPUP = '@shopgate/configurable-popup/popup';

persistedReducers.set(REDUX_NAMESPACE_POPUP);

const defaultState = {
  appStartCount: 0,
  ordersPlacedCount: 0,
  timerRepeatsCount: 0,
  lastPopupAt: null,
  rejectionCount: 0,
};

/**
 * Stores all the popup states.
 * @param {Object} [state] The current state.
 * @param {Object} action The action object.
 * @return {Object} The new state.
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case INCREASE_APP_START_COUNT: {
      return {
        ...state,
        appStartCount: state.appStartCount + 1,
      };
    }

    case INCREASE_ORDERS_PLACED_COUNT: {
      return {
        ...state,
        ordersPlacedCount: state.ordersPlacedCount + 1,
      };
    }

    case INCREASE_TIMER_REPEATS: {
      return {
        ...state,
        timerRepeatsCount: state.timerRepeatsCount + 1,
      };
    }
    case SET_TIMER_START_TIME: {
      return {
        ...state,
        timerStartTimestamp: Date.now(),
      };
    }

    case SET_LAST_POPUP_TIMESTAMP: {
      return {
        ...state,
        lastPopupAt: Date.now(),
      };
    }
    case INCREASE_REJECTION_COUNT: {
      return {
        ...state,
        rejectionCount: state.rejectionCount + 1,
      };
    }

    default:
      return state;
  }
};
