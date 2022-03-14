import showModalAction from '@shopgate/pwa-common/actions/modal/showModal';
import { historyPush } from '@shopgate/pwa-common/actions/router';
import { DIALOG_HTML_CONTENT } from '@shopgate/pwa-ui-shared/Dialog/constants';
import { track } from '@shopgate/pwa-tracking/helpers';
import {
  increaseOccurranceCount,
  increaseRejectionCount,
  setLastPopupTimestamp,
} from '../action-creators/popup';

/**
 * to handle the modal confirmation
 * @param {string} url the url to redirect to
 * @return {(function(*, *): void)|*}
 */
function redirectTo(url) {
  return (dispatch) => {
    if (!url) {
      return;
    }
    dispatch(historyPush({
      pathname: url,
      state: {
        target: '_blank',
      },
    }));
  };
}

/**
 * shows the actual modal
 * @param {any} popup the popup to extract the configs from
 * @return {(function(*, *): void)|*}
 */
export function showModal(popup) {
  return async (dispatch, state) => {
    dispatch(setLastPopupTimestamp());
    dispatch(increaseOccurranceCount(popup.id));

    const popupConfirmed = await dispatch(showModalAction({
      confirm: popup.button.confirmLabel,
      dismiss: popup.button.dismissLabel,
      title: popup.title,
      type: DIALOG_HTML_CONTENT,
      message: popup.content,
    }));

    track('customEvent', {
      eventCategory: 'extConfigurablePopup',
      eventAction: `popup.${popup.id}`,
      eventLabel: popupConfirmed ? 'confirmed' : 'dismissed',
    }, state);

    // user confirmed the popup
    if (popupConfirmed) {
      dispatch(redirectTo(popup.action.link));
      return;
    }

    // user dismissed the popup
    dispatch(increaseRejectionCount(popup.id));
  };
}
