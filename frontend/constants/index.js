export const REDUX_NAMESPACE_POPUP = '@shopgate-project/configurable-popup/popup';

export const INCREASE_APP_START_COUNT_POPUP = 'INCREASE_APP_START_COUNT_POPUP';

export const INCREASE_ORDERS_PLACED_COUNT_POPUP = 'INCREASE_ORDERS_PLACED_COUNT_POPUP';

export const SET_TIMER_START_TIME_POPUP = 'SET_TIMER_START_TIME_POPUP';
export const RESET_TIMER_START_TIME_POPUP = 'RESET_TIMER_START_TIME_POPUP';

export const SET_LAST_POPUP_TIMESTAMP_POPUP = 'SET_LAST_POPUP_TIMESTAMP_POPUP';

export const INCREASE_REJECTION_COUNT_POPUP = 'INCREASE_REJECTION_COUNT_POPUP';

export const INCREASE_OCCURRENCE_COUNT_POPUP = 'INCREASE_OCCURRENCE_COUNT_POPUP';

// trigger types, these values must also match
// those that are used for extension configs.
export const TRIGGER_APP_STARTS = 'appStarts';
export const TRIGGER_TIME_INTERVAL = 'timeInterval';
export const TRIGGER_ORDERS_PLACED = 'ordersPlaced';

// currently the timespan is set to a day in the configs
export const TIMER_TIMESPAN = 1000 * 60 * 60 * 24;
