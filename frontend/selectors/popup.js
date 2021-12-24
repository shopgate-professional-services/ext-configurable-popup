/**
 * Selects the pop up information.
 * @param {Object} state The current state.
 * @returns {Object} The popup information.
 */
import { REDUX_NAMESPACE_POPUP } from '../reducers';

/**
 * @param {Object} state the state
 * @return {Object}
 */
export const getPopupState = state => state.extensions[REDUX_NAMESPACE_POPUP];
