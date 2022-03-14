import { persistedReducers } from '@shopgate/engage/core';
import {
  REDUX_NAMESPACE_POPUP,
  INCREASE_APP_START_COUNT,
  INCREASE_ORDERS_PLACED_COUNT,
  INCREASE_TIMER_REPEATS,
  SET_TIMER_START_TIME,
  SET_LAST_POPUP_TIMESTAMP,
  INCREASE_REJECTION_COUNT,
  INCREASE_OCCURRENCE_COUNT,
  RESET_TIMER_START_TIME,
} from '../constants';

persistedReducers.set(`extensions.${REDUX_NAMESPACE_POPUP}`);

const defaultState = {
  appStartCount: 0,
  ordersPlacedCount: 0,
  timerRepeatsCount: 0,
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
        timerStartTimestamp: state.timerStartTimestamp ? state.timerStartTimestamp : Date.now(),
      };
    }
    case RESET_TIMER_START_TIME: {
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
    case INCREASE_OCCURRENCE_COUNT: {
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
