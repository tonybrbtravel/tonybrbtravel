import React, { useEffect } from 'react';
import { Range } from 'react-date-range';
import {
  Form, Grid, Icon, Input, Popup,
} from 'semantic-ui-react';
import { format } from 'date-fns';
import DateRangePicker from './components/DateRangePicker';
import { BrbFormFieldProps } from '../../interfaces/FormFieldProps';
import { DateRange } from '../../interfaces/DateRange';
import { BRBButton } from '../BRBButton/BRBButton';

export interface Props extends BrbFormFieldProps {
  value?: Range;
  dateFormat?: Intl.DateTimeFormatOptions;
  iconPosition?: 'left' | undefined;
  direction?: 'vertical' | 'horizontal';
  maxDate?: Date;
  minDate?: Date;
}

export const DateRangeInput = ({
  dateFormat,
  value,
  label,
  direction,
  isError,
  isMandatory,
  placeholder,
  disabled,
  iconPosition,
  maxDate,
  minDate,
  onChange,
} : Props) => {
  const options: Intl.DateTimeFormatOptions = dateFormat || {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  const [open, setOpen] = React.useState(false);
  const [selectionRange, setSelectionRange] = React.useState({
    key: 'selection',
  } as Range);

  const onCancel = () : void => {
    setOpen(false);
  };

  const handleRangeSelect = (rangeSelection: any) : void => {
    if (rangeSelection) {
      setSelectionRange(rangeSelection);
      if (typeof onChange === 'function') {
        onChange(rangeSelection);
      }
    }
  };

  const toggleOpen = () : void => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!value) {
      return;
    }
    // allow and process string object
    try {
      const date = {} as DateRange;
      date.startDate = typeof value.startDate === 'string'
        ? new Date(value.startDate)
        : value.startDate;
      date.endDate = typeof value.endDate === 'string'
        ? new Date(value.endDate)
        : value.endDate;

      setSelectionRange(date);
    } catch (error) {
      // ignore error when parse failed
    }

    /* eslint-disable-next-line */
  }, [value]);
  return (
    <div>
      <Form.Field
        error={isError}
        required={isMandatory}
        className="calenderFormField"
        placeholder={placeholder}
        disabled={disabled}
      >
        <label>{label}</label>
        <Input
          name="calenderInput"
          readOnly
          value={
            selectionRange.startDate && selectionRange.endDate
              ? `${format(new Date(selectionRange.startDate), 'dd/MM/yyyy')} - ${format(new Date(selectionRange.endDate), 'dd/MM/yyyy')}`
              : ''
          }
          onClick={toggleOpen}
          placeholder={placeholder}
          icon={<Icon name="calendar" onClick={toggleOpen} />}
          iconPosition={iconPosition}
        />
      </Form.Field>
      {open && (
        <div className="brb-dateRange">
          <DateRangePicker
            maxDate={maxDate}
            minDate={minDate}
            selectionRange={selectionRange}
            onChange={handleRangeSelect}
            direction={direction}
            disabledDates={
              [new Date(2022, 1, 21),
                new Date(2022, 1, 22),
                new Date(2022, 1, 23),
                new Date(2022, 1, 24),
                new Date(2022, 1, 25),
                new Date(2022, 3, 14),
                new Date(2022, 3, 14),
                new Date(2022, 3, 15),
                new Date(2022, 3, 16),
                new Date(2022, 3, 17),
                new Date(2022, 3, 18),
                new Date(2022, 3, 19),
                new Date(2022, 3, 29),
                new Date(2022, 3, 30),
                new Date(2022, 4, 1),
                new Date(2022, 4, 2),
                new Date(2022, 7, 26),
                new Date(2022, 7, 27),
                new Date(2022, 7, 28),
                new Date(2022, 7, 29),
                new Date(2021, 11, 20),
                new Date(2021, 11, 21),
                new Date(2021, 11, 22),
                new Date(2021, 11, 23),
                new Date(2021, 11, 24),
                new Date(2021, 11, 25),
                new Date(2021, 11, 26),
                new Date(2021, 11, 27),
                new Date(2021, 11, 28),
                new Date(2021, 11, 29),
                new Date(2021, 11, 30),
                new Date(2021, 11, 31),
                new Date(2022, 0, 1),
                new Date(2022, 0, 2),
                new Date(2022, 0, 3),
                new Date(2022, 0, 4),
                new Date(2022, 0, 5),
                new Date(2022, 0, 6),
                new Date(2022, 11, 20),
                new Date(2022, 11, 21),
                new Date(2022, 11, 22),
                new Date(2022, 11, 23),
                new Date(2022, 11, 24),
                new Date(2022, 11, 25),
                new Date(2022, 11, 26),
                new Date(2022, 11, 27),
                new Date(2022, 11, 28),
                new Date(2022, 11, 29),
                new Date(2022, 11, 30),
                new Date(2022, 11, 31),
                new Date(2023, 0, 1),
                new Date(2023, 0, 2),
                new Date(2023, 0, 3),
                new Date(2023, 0, 4),
                new Date(2023, 0, 5),
                new Date(2023, 0, 6),
              ]
            }
          />
          <div className="ok-button">
            <BRBButton t secondary onClick={onCancel}>
              OK
            </BRBButton>
          </div>
        </div>
      )}
    </div>
  );
};
