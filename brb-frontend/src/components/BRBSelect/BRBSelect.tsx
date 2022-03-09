import { Flag, FlagNameValues, List } from 'semantic-ui-react';

import {
  BRBCheckBoxButton,
  BRBCheckBoxButtonItem,
} from '../BRBCheckBoxButton/BRBCheckBoxButton';
import './BRBSelect.less';

export interface ListItem<T> {
  airports: T[];
  region: string;
  code?: FlagNameValues;
}
export interface Props<T> {
  items: ListItem<T>[];
  onChange: (item: ListItem<T>[]) => void;
}

export const BRBSelect = <T extends BRBCheckBoxButtonItem>({
  items,
  onChange,
}: Props<T>) => {
  const handleChange = (data: ListItem<T>, item: T) => {
    data.airports.forEach((element: T) => {
      if (element.label === item.label) {
        element.checked = item.checked; // eslint-disable-line no-param-reassign
      }
    });
    items.map((x) => {
      if (x.region === data.region) return data;
      return x;
    });
    onChange(items);
  };

  return (
    <List className="brb-select" relaxed>
      {items.map((item) => (
        <List.Item key={item.code}>
          <List.Content>
            <List.Header>
              {item.region}
              {' '}
              {item.code && <Flag name={item.code} />}
            </List.Header>
            <div className="brb-check-select">
              {item.airports.map((x) => (
                <BRBCheckBoxButton
                  key={x.label}
                  item={x}
                  secondary
                  onChange={(data: T) => {
                    handleChange(item, data);
                  }}
                />
              ))}
            </div>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};
