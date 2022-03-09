import clsx from 'clsx';
import { addDays } from 'date-fns';
import React from 'react';
import {
  DateRangePicker as ReactDateRangePicker,
  RangeWithKey,
  Range,
  RangeFocus,
} from 'react-date-range';
import './DateRangePicker.less';

interface Props {
  selectionRange: Range;
  onChange?: (range: RangeWithKey) => void;
  direction?: 'vertical' | 'horizontal';
  maxDate?: Date;
  minDate?: Date;
  disabledDates?: Date[];
}

export const DateRangePicker = ({
  selectionRange,
  onChange,
  minDate,
  maxDate,
  direction = 'vertical',
  disabledDates,
}: Props) => {
  const containerRef: any = React.createRef();
  const handleSelect = (ranges: any) : void => {
    if (typeof onChange === 'function') {
      onChange(
        ranges.range1
          || (
            ranges as {
              selection: RangeWithKey;
            }
          ).selection,
      );
    }
  };

  return (
    <div ref={containerRef}>
      <ReactDateRangePicker
        editableDateInputs={false}
        className={clsx('select-date', {
          'empty-range': !selectionRange.startDate || !selectionRange.endDate,
        })}
        months={2}
        maxDate={addDays(new Date(), 1000)}
        minDate={addDays(new Date(), 42)}
        direction={direction}
        showDateDisplay={false}
        moveRangeOnFirstSelection={false}
        showPreview={false}
        onChange={handleSelect}
        ranges={[selectionRange]}
        disabledDates={disabledDates}
      />
    </div>
  );
};
