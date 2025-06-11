import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid';
import { button } from '@tailus/themer';
import classNames from 'classnames';
import React from 'react';
import { Pagination as HeadlessPagination } from 'react-headless-pagination';

type PaginationProps = {
  total?: number;
  current?: number;
  onChange: (page: number) => void;
};

function Pagination({
  total = 0,
  current = 1,
  onChange,
}: PaginationProps) {
  const buttonClassName = button.ghost({ size: 'sm', intent: 'info', className: 'cursor-pointer' });
  const buttonActiveClassName = button.outlined({ size: 'sm', intent: 'info', className: 'cursor-pointer' });

  return (
    <HeadlessPagination
      currentPage={current - 1}
      totalPages={total}
      setCurrentPage={page => onChange(page + 1)}
      edgePageCount={total}
      middlePagesSiblingCount={total}
      className="flex items-center justify-center"
    >
      <HeadlessPagination.PrevButton className={classNames(buttonClassName, 'mr-6')}>
        <ArrowLeftIcon
          width={16}
        />
      </HeadlessPagination.PrevButton>
      <ul className="flex items-center gap-1">
        <HeadlessPagination.PageButton
          className={buttonClassName}
          activeClassName={buttonActiveClassName}
        />
      </ul>
      <HeadlessPagination.NextButton className={classNames(buttonClassName, 'ml-6')}>
        <ArrowRightIcon
          width={16}
        />
      </HeadlessPagination.NextButton>
    </HeadlessPagination>
  );
}

export default Pagination;
