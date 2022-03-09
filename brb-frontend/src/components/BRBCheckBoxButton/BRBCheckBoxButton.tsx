import clsx from 'clsx';
import { Segment, Checkbox } from 'semantic-ui-react';
import './BRBCheckBoxButton.less';

export interface Props<T> {
  item: T;
  onChange: (data: T) => void;
  primary?: boolean;
  secondary?: boolean;
}
export interface BRBCheckBoxButtonItem {
  label: string;
  checked?: boolean;
  disabled?: boolean;
}

export const BRBCheckBoxButton = <T extends BRBCheckBoxButtonItem>({
  item,
  primary,
  secondary,
  onChange,
}: Props<T>) => {
  const handleChange = (changedItem: T, checked: boolean) => {
    onChange({ ...changedItem, checked });
  };

  return (
    <Segment
      compact
      className={clsx('brb-checkBox-button', {
        primary,
        secondary,
        checked: item.checked,
      })}
    >
      <Checkbox
        checked={item.checked}
        disabled={item?.disabled}
        label={item.label}
        onChange={(event, data) => handleChange(item, data.checked ?? false)}
      />
    </Segment>
  );
};
