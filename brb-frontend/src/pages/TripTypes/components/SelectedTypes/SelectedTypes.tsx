import { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { TripType } from '../../../../interfaces/tripType';
import './SelectedTypes.less';

export interface Props {
  types: TripType[];
  onRemove: (tripTypes: TripType) => void;
  totalTiles: number;
}

export const SelectedType = ({ onRemove, types, totalTiles }: Props) => {
  const [selectedTypes, setSelectedTypes] = useState<TripType[]>([]);
  const removeHandler = (item: TripType, checked: boolean) => {
    if (typeof onRemove === 'function') {
      onRemove({ ...item, checked });
    }
  };

  useEffect(() => {
    setSelectedTypes(types.filter((x) => x.checked));
  }, [types]);

  return (
    <div className="selected-type">
      {selectedTypes
        && selectedTypes.map((item: TripType) => (
          <Button
            key={item.label}
            basic
            color="red"
            icon="close"
            onClick={() => removeHandler(item, false)}
            content={item.label}
            labelPosition="right"
          />
        ))}

      {selectedTypes
        && types.length
        && [
          ...Array(
            selectedTypes.length > totalTiles
              ? 0
              : totalTiles - selectedTypes.length,
          ),
        ].map((e) => <Button disabled key={e} />)}
    </div>
  );
};
