import {
  rtbCreateFormTab,
  tabBidsFieldNamesSet,
  tabMainFieldNamesSet,
} from '@components/pages/RtbPage/RtbCreateForm/RtbCreateForm.const';

export function getErrorFormTab(errorKeys: string[]) {
  for (const errorKey of errorKeys) {
    if (tabMainFieldNamesSet.has(errorKey)) {
      return rtbCreateFormTab.main;
    } else if (tabBidsFieldNamesSet.has(errorKey)) {
      return rtbCreateFormTab.bids;
    }
  }

  return null;
}
