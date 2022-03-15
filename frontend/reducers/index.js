import { persistedReducers } from '@shopgate/engage/core';
import {
  REDUX_NAMESPACE_POPUP,
  INCREASE_APP_START_COUNT_POPUP,
  INCREASE_ORDERS_PLACED_COUNT_POPUP,
  SET_TIMER_START_TIME_POPUP,
  SET_LAST_POPUP_TIMESTAMP_POPUP,
  INCREASE_REJECTION_COUNT_POPUP,
  INCREASE_OCCURRENCE_COUNT_POPUP,
  RESET_TIMER_START_TIME_POPUP,
} from '../constants';

persistedReducers.set(`extensions.${REDUX_NAMESPACE_POPUP}`);

const defaultState = {
  appStartCount: 0,
  ordersPlacedCount: 0,
  lastPopupAt: null,
  timerStartTimestamp: null,
  byPopupId: [],
};

/**
 * Stores all the popup states.
 * @param {Object} [state] The current state.
 * @param {Object} action The action object.
 * @return {Object} The new state.
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case INCREASE_APP_START_COUNT_POPUP: {
      return {
        ...state,
        appStartCount: state.appStartCount + 1,
      };
    }
    case INCREASE_ORDERS_PLACED_COUNT_POPUP: {
      return {
        ...state,
        ordersPlacedCount: state.ordersPlacedCount + 1,
      };
    }
    case SET_TIMER_START_TIME_POPUP: {
      return {
        ...state,
        timerStartTimestamp: state.timerStartTimestamp ? state.timerStartTimestamp : Date.now(),
      };
    }
    case RESET_TIMER_START_TIME_POPUP: {
      return {
        ...state,
        timerStartTimestamp: Date.now(),
      };
    }
    case SET_LAST_POPUP_TIMESTAMP_POPUP: {
      return {
        ...state,
        lastPopupAt: Date.now(),
      };
    }
    case INCREASE_REJECTION_COUNT_POPUP: {
      return {
        ...state,
        byPopupId: {
          ...state.byPopupId,
          [action.id]: {
            ...state.byPopupId[action.id],
            rejectionCount: (state.byPopupId[action.id] &&
              state.byPopupId[action.id].rejectionCount) ?
              state.byPopupId[action.id].rejectionCount + 1 : 1,
          },
        },
      };
    }
    case INCREASE_OCCURRENCE_COUNT_POPUP: {
      return {
        ...state,
        byPopupId: {
          ...state.byPopupId,
          [action.id]: {
            ...state.byPopupId[action.id],
            occurrenceCount: (state.byPopupId[action.id] &&
              state.byPopupId[action.id].occurrenceCount) ?
              state.byPopupId[action.id].occurrenceCount + 1 : 1,
          },
        },
      };
    }

    default:
      return state;
  }
};
