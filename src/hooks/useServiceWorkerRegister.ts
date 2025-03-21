import { useEffect } from 'react';

function useServiceWorkerRegister() {
  useEffect(() => {
    navigator.serviceWorker
      .register('/sw.js')
      .catch(err => console.error('Service Worker registration failed: ', err));
  }, []);
}

export default useServiceWorkerRegister;
