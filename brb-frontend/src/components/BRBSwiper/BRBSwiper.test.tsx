import React from 'react';
import { render } from '@testing-library/react';
import BRBSwiper from '.';

describe('<POSSwiper />', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <BRBSwiper slides={[<div key={1}>test</div>]} />,
    );
    expect(container).toMatchSnapshot();
  });
});
