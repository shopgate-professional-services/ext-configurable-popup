import { popup as popupsConfig } from '../config';

/**
 * Gets all popups of specific trigger types
 * @param {Array<string>} triggerTypes an array of trigger types
 * @returns {Array<Object>}
 */
export const getPopupsOfTriggerType = triggerTypes =>
  popupsConfig.popups.filter(p => triggerTypes.includes(p.trigger.type));
