'use client';

import { useState } from 'react';

const storeNamePageSize = 'paginationPageSize';
const defaultPageSize = 50;

function usePaginationControl() {
  const storedSize = Number.parseInt(localStorage.getItem(storeNamePageSize) || `${defaultPageSize}`, 10);
  const [pageSize, setPageSize] = useState<number>(storedSize);
  const changePageSizeStorageHandler = (size: number) => {
    setPageSize(size);
    localStorage.setItem(storeNamePageSize, `${size}`);
  };

  return {
    pageSize,
    changePageSizeStorageHandler,
  };
}

export default usePaginationControl;
