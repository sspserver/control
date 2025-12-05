import { useQuery } from '@apollo/client';
import { gqlNetworkFormOptionsQuery } from '@lib/graphql/queries/networkFormOptions';
import { useCallback, useEffect, useRef, useState } from 'react';

const adUnitCode = '{{adunit-code}}';

function useAdUnitCodeDialog(code?: string) {
  const [tabState, setTabState] = useState<string>('banner');
  const {
    data: networkFormOptionsResponse,
    loading: isLoadingNetworkFormOptions,
    // error: networkFormOptionsError,
  } = useQuery(gqlNetworkFormOptionsQuery);
  const spanRef = useRef<HTMLSpanElement>(null);
  const tabsListRef = useRef<HTMLDivElement>(null);
  const tabsTriggerRef = useRef<HTMLButtonElement>(null);
  const changeTabsStateHandler = (value: string) => setTabState(value);
  const bannerCode = networkFormOptionsResponse?.templateCode?.data?.value?.replaceAll(adUnitCode, code);
  const directCode = networkFormOptionsResponse?.directCode?.data?.value?.replaceAll(adUnitCode, code);
  const directUrl = networkFormOptionsResponse?.directUrl?.data?.value?.replaceAll(adUnitCode, code);
  const activeTriggerHandler = useCallback(() => {
    const activeTrigger = document.getElementById(tabState) as HTMLElement;

    if (spanRef.current && activeTrigger) {
      spanRef.current.style.left = `${activeTrigger.offsetLeft}px`;
      spanRef.current.style.width = `${activeTrigger.offsetWidth}px`;
    }
  }, [tabState]);

  useEffect(() => {
    setTimeout(activeTriggerHandler, 10);
  }, [isLoadingNetworkFormOptions, activeTriggerHandler, tabState]);

  return {
    directUrl,
    directCode,
    bannerCode,
    tabState,
    spanRef,
    tabsListRef,
    tabsTriggerRef,
    isLoadingNetworkFormOptions,
    changeTabsStateHandler,
  };
}

export default useAdUnitCodeDialog;
