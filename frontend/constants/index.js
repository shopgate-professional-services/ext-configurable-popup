export const REDUX_NAMESPACE_POPUP = '@shopgate-project/configurable-popup/popup';

export const INCREASE_APP_START_COUNT = 'INCREASE_APP_START_COUNT_POPUP';
export const RESET_APP_START_COUNT = 'RESET_APP_START_COUNT';
export const RESET_APP_START_STATE = 'RESET_APP_START_STATE';

export const INCREASE_ORDERS_PLACED_COUNT = 'INCREASE_ORDERS_PLACED_COUNT';
export const RESET_ORDERS_PLACED_COUNT = 'RESET_ORDERS_PLACED_COUNT';
export const RESET_ORDERS_PLACED_STATE = 'RESET_ORDERS_PLACED_STATE';

export const INCREASE_TIMER_REPEATS = 'INCREASE_TIMER_REPEATS';
export const SET_TIMER_START_TIME = 'SET_TIMER_START_TIME';
export const RESET_TIMER_START_TIME = 'RESET_TIMER_START_TIME';

export const SET_LAST_POPUP_TIMESTAMP = 'SET_LAST_POPUP_TIMESTAMP';

export const INCREASE_REJECTION_COUNT = 'INCREASE_REJECTION_COUNT';

export const INCREASE_OCCURRENCE_COUNT = 'INCREASE_OCCURRENCE_COUNT';

// trigger types, these values must also match
// those that are used for extension configs.
export const TRIGGER_APP_STARTS = 'appStarts';
export const TRIGGER_TIME_INTERVAL = 'timeInterval';
export const TRIGGER_ORDERS_PLACED = 'ordersPlaced';

// currently the timespan is set to a day in the configs
export const TIMER_TIMESPAN = 1000 * 60 * 60 * 24;
