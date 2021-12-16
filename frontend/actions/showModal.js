import showModalAction from '@shopgate/pwa-common/actions/modal/showModal';
import { getPlatform } from '@shopgate/pwa-common/selectors/client';
import { historyPush } from '@shopgate/pwa-common/actions/router';
import appConfig from '@shopgate/pwa-common/helpers/config';
import { track } from '@shopgate/pwa-tracking/helpers';
import {
  increaseRejectionCount,
  setAlreadyRated,
  setLastPopupTimestamp,
} from '../action-creators/popup';
import { TIMER_TIMESPAN } from '../constants';
import { getPopupState } from '../selectors/popup';

const {
  popup: {
    minDaysBetweenPopups,
    popups,
  },
} = appConfig;

/**
 * to handle the modal confirmation
 * @param {string} url the url to redirect to
 * @param {boolean | null} setRated the url to redirect to
 * @return {(function(*, *): void)|*}
 */
function redirectTo(url, setRated = false) {
  return (dispatch) => {
    if (!url) {
      return;
    }

    if (setRated) {
      dispatch(setAlreadyRated(setRated));
    }

    dispatch(historyPush({
      pathname: url,
      // open appstore as external url and not in inAppBrowser
      ...setRated && {
        state: {
          target: '_blank',
        },
      },
    }));
  };
}

/**
 * shows the actual modal
 * @param {Function} resetAction the reset action function
 * @param {Function} increaseAction the function to increase the appropriate counter
 * @param {boolean} mustShow if the modal must be shown
 * @param {boolean} hasRepeats if the counters has repeats
 * @return {(function(*, *): void)|*}
 */
export function showModal(resetAction, increaseAction, mustShow, hasRepeats) {
  return async (dispatch, getState) => {
    const state = getState();

    // no review link for current platform found -> don't show modal
    if (!reviewLink) {
      return;
    }

    if (!mustShow && hasRepeats && increaseAction) {
      dispatch(increaseAction());
    }

    if (!(mustShow && hasRepeats)) {
      return;
    }

    const popupState = getPopupState(state);

    const isMinDaysBetweenPopupsElapsed = (Date.now() - popupState.lastPopupAt) >=
      (minDaysBetweenPopups * TIMER_TIMESPAN);

    if (!isMinDaysBetweenPopupsElapsed) {
      return;
    }

    dispatch(resetAction());
    dispatch(setLastPopupTimestamp());

    const firstModalConfirmed = await dispatch(showModalAction({
      confirm: 'popup.yes',
      dismiss: 'popup.no',
      title: 'popup.title',
      message: 'popup.message',
    }));

    track('customEvent', {
      eventCategory: 'appReviewPrompt',
      eventAction: 'decision',
      eventLabel: firstModalConfirmed ? 'yes' : 'no',
    }, state);

    // user touched yes and we
    // redirect to store
    if (firstModalConfirmed) {
      // dispatch(redirectTo(reviewLink, true));
      return;
    }

    // user doesn't want to rate
    dispatch(increaseRejectionCount());

    // we approve for rejection
    if (askForFeedback) {
      const userGivesFeedback = await dispatch(showModalAction({
        confirm: 'popup.yes',
        dismiss: 'popup.no',
        title: 'popup.title',
        message: 'popup.rejectionApprovalMessage',
      }));

      track('customEvent', {
        eventCategory: 'appReviewPrompt',
        eventAction: 'decision_feedback',
        eventLabel: userGivesFeedback ? 'yes' : 'no',
      }, state);

      // user wants to give feedback
      if (userGivesFeedback) {
        dispatch(redirectTo(feedbackLink));
      }

      return;
    }

    dispatch(redirectTo(feedbackLink));
  };
}
