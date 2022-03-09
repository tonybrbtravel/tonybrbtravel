import clsx from 'clsx';
import { Card, Grid, Image } from 'semantic-ui-react';

import { BRBCheckBoxButton } from '../../../../components/BRBCheckBoxButton/BRBCheckBoxButton';
import { TripType } from '../../../../interfaces/tripType';

import './ImageCard.less';

export interface Props {
  types: TripType[];
  onSelect: (item: TripType) => void;
  from?: boolean;
}

export const ImageCard = ({ types, onSelect, from }: Props) => {
  const onChange = (item: TripType) => {
    onSelect({
      ...item,
      checked: !item.checked,
    });
  };

  return (
    <Grid doubling className="image-card">
      {types
        && types.map((item: TripType) => (
          <Grid.Column key={item.id}>
            <Card
              onClick={() => {
                onChange(item);
              }}
            >
              <Image
                src={item.image}
                wrapped
                ui={false}
                className={clsx('image-height', { 'selected-option': item.checked })}
              />
              {!from && item.content ? (
                <Card.Content>
                  <Card.Description>{item.content}</Card.Description>
                </Card.Content>
              ) : (
                <></>
              )}
              <BRBCheckBoxButton secondary item={item} onChange={onSelect} />
            </Card>
          </Grid.Column>
        ))}
    </Grid>
  );
};
