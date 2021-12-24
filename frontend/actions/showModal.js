import React from 'react';
import showModalAction from '@shopgate/pwa-common/actions/modal/showModal';
import { historyPush } from '@shopgate/pwa-common/actions/router';
import {
  setLastPopupTimestamp,
} from '../action-creators/popup';
import { TIMER_TIMESPAN } from '../constants';
import { getPopupState } from '../selectors/popup';
import { getConfig } from '../helpers';

const {
  popup: {
    minDaysBetweenPopups,
  },
} = getConfig();

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
 * @param {boolean} mustShow if the modal must be shown
 * @param {any} popup the popup to extract the configs from
 * @return {(function(*, *): void)|*}
 */
export function showModal(mustShow, popup) {
  return async (dispatch, getState) => {
    if (!popup.enabled) {
      return;
    }

    if (!mustShow) {
      return;
    }

    const state = getState();

    const popupState = getPopupState(state);

    const isMinDaysBetweenPopupsElapsed = (Date.now() - popupState.lastPopupAt) >=
      (minDaysBetweenPopups * TIMER_TIMESPAN);

    if (!isMinDaysBetweenPopupsElapsed) {
      return;
    }

    dispatch(setLastPopupTimestamp());
    // dispatch(increasePopupOccurranceCount(popup.id));

    const popupConfirmed = await dispatch(showModalAction({
      confirm: popup.action.label,
      title: popup.action.title,
      // eslint-disable-next-line react/jsx-filename-extension,react/no-danger
      content: <div dangerouslySetInnerHTML={{ __html: popup.content }} />,
    }));

    // user wants to give feedback
    if (popupConfirmed) {
      dispatch(redirectTo(popup.action.link));
    }
  };
}
