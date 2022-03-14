import { REDUX_NAMESPACE_POPUP } from '../constants';

/**
 * Selects the pop up information.
 * @param {Object} state The current state.
 * @returns {Object} The popup information.
 */
export const getPopupState = state => state.extensions[REDUX_NAMESPACE_POPUP];
