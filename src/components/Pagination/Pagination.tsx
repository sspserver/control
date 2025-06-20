import { pageSizeOptions } from '@components/Pagination/Pagination.const';
import Select from '@components/Select';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid';
import { button } from '@tailus/themer';
import classNames from 'classnames';
import React from 'react';
import { Pagination as HeadlessPagination } from 'react-headless-pagination';

type PaginationProps = {
  total?: number;
  current?: number;
  size?: string;
  onChange: (page: number) => void;
  onChangeSize: (size: number) => void;
};

const edgePageCount = 1;
const middlePagesSiblingCount = 2;

function Pagination({
  total = 0,
  current = 1,
  size = '20',
  onChange,
  onChangeSize,
}: PaginationProps) {
  const buttonClassName = button.ghost({ size: 'sm', intent: 'info', className: 'cursor-pointer' });
  const buttonActiveClassName = button.outlined({ size: 'sm', intent: 'info', className: 'cursor-pointer' });
  const changePageSizeHandler = (value: string) => onChangeSize(Number(value));

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1" />
      <HeadlessPagination
        currentPage={current - 1}
        totalPages={total}
        setCurrentPage={page => onChange(page + 1)}
        edgePageCount={edgePageCount}
        middlePagesSiblingCount={middlePagesSiblingCount}
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
      <div className="flex-1 flex justify-end">
        <Select
          name="size"
          value={size}
          items={pageSizeOptions}
          onChange={changePageSizeHandler}
        />
      </div>
    </div>
  );
}

export default Pagination;
